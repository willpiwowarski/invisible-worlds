import { useEffect, useState } from "react";

function App() {
  const [weeks, setWeeks] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/weeks")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch weeks");
        }
        return res.json();
      })
      .then((data) => {
        setWeeks(data);
        setCurrentWeek(data[0].week_number); // default to first week
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load development timeline");
      });
  }, []);

  const selectedWeek = weeks.find(
    (week) => week.week_number === currentWeek
  );

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif", maxWidth: "800px", margin: "0 auto" }}>
      <h1>Invisible Worlds</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weeks.length > 0 && (
        <>
          {/* Timeline Slider */}
          <label>
            <strong>Week {currentWeek}</strong>
          </label>
          <input
            type="range"
            min={weeks[0].week_number}
            max={weeks[weeks.length - 1].week_number}
            value={currentWeek}
            onChange={(e) => setCurrentWeek(Number(e.target.value))}
            style={{ width: "100%", margin: "1rem 0" }}
          />

          {/* Week Content */}
          {selectedWeek && (
            <div
              style={{
                border: "1px solid #ccc",
                padding: "1.5rem",
                borderRadius: "8px",
                backgroundColor: "#fafafa",
              }}
            >
              <h2>
                Week {selectedWeek.week_number}: {selectedWeek.title}
              </h2>

              <p>{selectedWeek.summary}</p>

              <h4>Key Developments</h4>
              <ul>
                {selectedWeek.key_developments.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>

              {selectedWeek.size_comparison && (
                <p>
                  <strong>Size comparison:</strong> {selectedWeek.size_comparison}
                </p>
              )}

              {selectedWeek.systems_developing && (
                <p>
                  <strong>Systems developing:</strong>{" "}
                  {selectedWeek.systems_developing.join(", ")}
                </p>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
