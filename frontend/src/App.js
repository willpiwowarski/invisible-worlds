import { useEffect, useState } from "react";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
    padding: "3rem 1rem",
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    fontFamily: "'Inter', system-ui, sans-serif",
    color: "#0f172a",
  },
  header: {
    marginBottom: "2.5rem",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "0.5rem",
  },
  subtitle: {
    color: "#475569",
    maxWidth: "600px",
    lineHeight: 1.6,
  },
  badge: {
    display: "inline-block",
    background: "#6366f1",
    color: "white",
    padding: "0.35rem 0.85rem",
    borderRadius: "999px",
    fontSize: "0.8rem",
    fontWeight: 500,
    marginBottom: "1rem",
  },
  sliderWrapper: {
    marginBottom: "2rem",
  },
  sliderLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.95rem",
    color: "#475569",
    marginBottom: "0.5rem",
  },
  slider: {
    width: "100%",
    appearance: "none",
    height: "6px",
    borderRadius: "999px",
    background: "#c7d2fe",
    outline: "none",
    cursor: "pointer",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "2.25rem",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.08)",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  },
  sectionTitle: {
    marginTop: "1.75rem",
    marginBottom: "0.5rem",
    color: "#4338ca",
  },
};

function App() {
  const [weeks, setWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [error, setError] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/weeks")
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setWeeks(data);
        setCurrentWeek(data[0].week_number);
      })
      .catch(() => setError("Could not load development timeline"));
  }, []);

  const selectedWeek = weeks.find(
    (week) => week.week_number === currentWeek
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <span style={styles.badge}>Educational Visualization</span>
          <h1 style={styles.title}>Human Development Within the Womb</h1>
          <p style={styles.subtitle}>
            Explore the earliest stages of human development through time,
            week by week, using clear explanations and biological milestones.
          </p>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weeks.length > 0 && (
          <>
            {/* Timeline Slider */}
            <div style={styles.sliderWrapper}>
              <div style={styles.sliderLabel}>
                <span>Week {weeks[0].week_number}</span>
                <strong>Week {currentWeek}</strong>
                <span>Week {weeks[weeks.length - 1].week_number}</span>
              </div>

              <input
                type="range"
                min={weeks[0].week_number}
                max={weeks[weeks.length - 1].week_number}
                value={currentWeek}
                onChange={(e) => {
                  setIsSliding(true);
                  setCurrentWeek(Number(e.target.value));
                }}
                onMouseUp={() => setIsSliding(false)}
                onTouchEnd={() => setIsSliding(false)}
                style={styles.slider}
              />
            </div>

            {/* Content Card */}
            {selectedWeek && (
              <div
                style={{
                  ...styles.card,
                  opacity: isSliding ? 0.5 : 1,
                  transform: isSliding ? "scale(0.98)" : "scale(1)",
                }}
              >
                <h2>
                  Week {selectedWeek.week_number}: {selectedWeek.title}
                </h2>

                <p>{selectedWeek.summary}</p>

                <h4 style={styles.sectionTitle}>Key Developments</h4>
                <ul>
                  {selectedWeek.key_developments.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                {selectedWeek.systems_developing?.length > 0 && (
                  <>
                    <h4 style={styles.sectionTitle}>Systems Developing</h4>
                    <p>{selectedWeek.systems_developing.join(", ")}</p>
                  </>
                )}

                {selectedWeek.size_comparison && (
                  <>
                    <h4 style={styles.sectionTitle}>Size Comparison</h4>
                    <p>{selectedWeek.size_comparison}</p>
                  </>
                )}

                {selectedWeek.clinical_notes && (
                  <>
                    <h4 style={styles.sectionTitle}>Clinical Notes</h4>
                    <p>{selectedWeek.clinical_notes}</p>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
