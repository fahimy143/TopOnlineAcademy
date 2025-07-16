import React, { useState } from "react";
import styles from "../style/Signup.module.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    language_level: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! You can now log in.");
        setForm({ name: "", email: "", password: "", language_level: "" });
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Server error. Try again later.");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Sign Up</h2>
      {message && <p className={styles.message}>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="language_level"
            placeholder="Language Level (e.g., A1, B2)"
            value={form.language_level}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Signup;
