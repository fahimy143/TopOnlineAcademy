import React, { useEffect, useState } from "react";
import styles from "../style/Dashboard.module.css";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/api/enroll/${user.email}`)
        .then((res) => res.json())
        .then((data) => setEnrollments(data))
        .catch((err) => console.error("Failed to fetch enrollments:", err));
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Welcome to your Dashboard</h2>

      {user ? (
        <div>
          <p className={styles.info}>
            <strong>Name:</strong> {user.name}
          </p>
          <p className={styles.info}>
            <strong>Email:</strong> {user.email}
          </p>
          <p className={styles.info}>
            <strong>Level:</strong> {user.language_level}
          </p>

          <button onClick={handleLogout} className={styles.logoutBtn}>
            Logout
          </button>

          <hr className={styles.hr} />

          <h3>Your Enrolled Classes</h3>
          {enrollments.length === 0 ? (
            <p>You have not enrolled in any classes yet.</p>
          ) : (
            enrollments.map((item) => (
              <div key={item.id} className={styles.enrollmentCard}>
                <p>
                  <strong>Title:</strong> {item.title}
                </p>
                <p>
                  <strong>Teacher:</strong> {item.teacher}
                </p>
                <p>
                  <strong>Date:</strong> {item.class_date} |{" "}
                  <strong>Time:</strong> {item.class_time}
                </p>
              </div>
            ))
          )}
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </div>
  );
};

export default Dashboard;
