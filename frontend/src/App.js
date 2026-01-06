import { useEffect, useState } from "react";

function App() {
  const [weeks, setWeeks] = useState([]);
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
      })
      .catch((err) => {
        console.error(err);
        setError("Could not load development timeline");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Invisible Worlds</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weeks.map((week) => (
        <div
          key={week.week_number}
          style={{
            border: "1px solid #ccc",
            padding: "1rem",
            marginBottom: "1rem",
            borderRadius: "6px",
          }}
        >
          <h2>
            Week {week.week_number}: {week.title}
          </h2>
          <p>{week.summary}</p>

          <ul>
            {week.key_developments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          {week.size_comparison && (
            <p>
              <strong>Size:</strong> {week.size_comparison}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
