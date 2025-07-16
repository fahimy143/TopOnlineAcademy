import React, { useEffect, useState } from "react";
import styles from "../style/UpcomingClasses.module.css";

const UpcomingClasses = () => {
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/classes")
      .then((res) => res.json())
      .then((data) => {
        setClasses(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching classes:", err);
        setLoading(false);
      });
  }, []);

  const filteredClasses = classes.filter((cls) =>
    filter ? cls.level.toLowerCase() === filter.toLowerCase() : true
  );

  const handleEnroll = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          class_id: selectedClass.id,
          student_name: formData.name,
          student_email: formData.email,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSuccessMessage(data.message);
        setFormData({ name: "", email: "" });
        setShowForm(false);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Failed to enroll.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Upcoming Classes</h2>

      {successMessage && (
        <p className={styles.successMessage}>{successMessage}</p>
      )}

      <label className={styles.filterGroup}>
        Filter by Level:
        <select
          className={styles.select}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="">All Levels</option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
          <option value="B1">B1</option>
          <option value="B2">B2</option>
          <option value="C1">C1</option>
        </select>
      </label>

      {loading ? (
        <p>Loading classes...</p>
      ) : (
        filteredClasses.map((cls) => (
          <div key={cls.id} className={styles.classCard}>
            <h3 className={styles.classTitle}>{cls.title}</h3>
            <p>{cls.description}</p>
            <p>
              <strong>Level:</strong> {cls.level}
            </p>
            <p>
              <strong>Teacher:</strong> {cls.teacher}
            </p>
            <p>
              <strong>Date:</strong> {cls.class_date} | <strong>Time:</strong>{" "}
              {cls.class_time}
            </p>
            <button
              className={styles.reserveButton}
              onClick={() => {
                setSelectedClass(cls);
                setShowForm(true);
                setSuccessMessage("");
              }}
            >
              Reserve Spot
            </button>
          </div>
        ))
      )}

      {showForm && selectedClass && (
        <div className={styles.formContainer}>
          <h3 className={styles.formTitle}>
            Reserve Spot for: {selectedClass.title}
          </h3>
          <form onSubmit={handleEnroll}>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className={styles.input}
            />
            <div className={styles.buttonsGroup}>
              <button type="submit" className={styles.confirmButton}>
                Confirm Reservation
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpcomingClasses;
