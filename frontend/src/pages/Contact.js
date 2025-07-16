import React, { useState } from "react";
import styles from "../style/Contact.module.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus(data.message);
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Failed to send message");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contact Us</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Your Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
          className={styles.input}
        />
        <textarea
          placeholder="Your Message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          required
          rows={6}
          className={styles.textarea}
        />
        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>

      {status && <p className={styles.statusMessage}>{status}</p>}

      <div className={styles.contactInfo}>
        <h3>Contact Information</h3>
        <p>Email: info@toponlineacademy.com</p>
        <p>Phone: +43 123 456 7890</p>
        <p>WhatsApp: +43 987 654 3210</p>
        <h3>Location</h3>
        <div className={styles.mapContainer}>
          <iframe
            title="Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2530.123456789012!2d16.373818315678!3d48.20817417922969!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d07de7e8d0b61%3A0x2f4b7c6c6b1f75cf!2sVienna%2C%20Austria!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
            width="600"
            height="450"
            style={{ border: 0, maxWidth: "100%" }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
