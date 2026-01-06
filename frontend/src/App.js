import { useEffect, useState } from "react";

function App() {
  const [status, setStatus] = useState("Loading backend...");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/")
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
      })
      .catch((err) => {
        console.error(err);
        setStatus("Backend not reachable");
      });
  }, []);

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Invisible Worlds</h1>
      <p>{status}</p>
    </div>
  );
}

export default App;
