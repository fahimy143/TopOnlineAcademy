import React, { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch(console.error);
  }, []);

  return (
    <div className="App" style={{ textAlign: "center", marginTop: 50 }}>
      <h1>Top Online Academy</h1>
      <p>Backend says: {message}</p>
    </div>
  );
}

export default App;
