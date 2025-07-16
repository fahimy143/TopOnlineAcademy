import React, { useEffect, useState } from "react";
import styles from "../style/Library.module.css";

const Library = () => {
  const [resources, setResources] = useState([]);
  const [level, setLevel] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResources = () => {
    setLoading(true);
    let url = "http://localhost:5000/api/library?";
    if (level) url += `level=${level}&`;
    if (topic) url += `topic=${topic}&`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setResources(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch resources", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResources();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Library</h2>

      <div className={styles.filterBar}>
        <label className={styles.label}>
          Level:
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
          </select>
        </label>

        <label className={styles.label}>
          Topic:
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className={styles.select}
          >
            <option value="">All</option>
            <option value="grammar">Grammar</option>
            <option value="listening">Listening</option>
            <option value="vocabulary">Vocabulary</option>
            <option value="quiz">Quiz</option>
          </select>
        </label>

        <button onClick={fetchResources} className={styles.filterButton}>
          Filter
        </button>
      </div>

      {loading ? (
        <p>Loading resources...</p>
      ) : resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        <ul className={styles.resourceList}>
          {resources.map((res) => (
            <li key={res.id} className={styles.resourceItem}>
              <h4 className={styles.resourceTitle}>{res.title}</h4>
              <p className={styles.resourceDesc}>{res.description}</p>
              <p className={styles.resourceMeta}>
                <strong>Level:</strong> {res.level} | <strong>Topic:</strong>{" "}
                {res.topic} | <strong>Type:</strong> {res.type}
              </p>
              <a
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.resourceLink}
              >
                {res.type === "pdf"
                  ? "Download PDF"
                  : res.type === "audio"
                  ? "Listen Audio"
                  : res.type === "video"
                  ? "Watch Video"
                  : "View Resource"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Library;
