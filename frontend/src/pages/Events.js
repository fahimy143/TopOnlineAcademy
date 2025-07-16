import React, { useEffect, useState } from "react";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form, setForm] = useState({ studentName: "", studentEmail: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/events")
      .then((res) => res.json())
      .then(setEvents)
      .catch(console.error);
  }, []);

  const handleRSVP = async (e) => {
    e.preventDefault();
    if (!selectedEvent) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/events/${selectedEvent.id}/rsvp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (res.ok) {
        setStatus("RSVP successful! Thank you.");
        setForm({ studentName: "", studentEmail: "" });
      } else {
        setStatus(data.error || "Failed to RSVP.");
      }
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upcoming Events</h2>

      {events.length === 0 ? (
        <p>No upcoming events</p>
      ) : (
        events.map((event) => (
          <div
            key={event.id}
            style={{ border: "1px solid #ccc", margin: "10px 0", padding: 15 }}
          >
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>
              Date: {event.event_date} | Time: {event.event_time} | Location:{" "}
              {event.location}
            </p>
            <button onClick={() => setSelectedEvent(event)}>
              Attend Event
            </button>
          </div>
        ))
      )}

      {selectedEvent && (
        <div
          style={{
            marginTop: 40,
            padding: 20,
            border: "1px solid #007bff",
            borderRadius: 10,
          }}
        >
          <h3>Attend: {selectedEvent.title}</h3>
          <form onSubmit={handleRSVP}>
            <input
              type="text"
              placeholder="Your Name"
              value={form.studentName}
              onChange={(e) =>
                setForm({ ...form, studentName: e.target.value })
              }
              required
            />
            <br />
            <input
              type="email"
              placeholder="Your Email"
              value={form.studentEmail}
              onChange={(e) =>
                setForm({ ...form, studentEmail: e.target.value })
              }
              required
            />
            <br />
            <button type="submit" style={{ marginTop: 10 }}>
              Submit RSVP
            </button>
          </form>
          {status && <p style={{ marginTop: 10 }}>{status}</p>}
          <button
            onClick={() => setSelectedEvent(null)}
            style={{ marginTop: 10 }}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Events;
