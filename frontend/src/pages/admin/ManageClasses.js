import React, { useEffect, useState } from "react";

const ManageClasses = () => {
  const [classes, setClasses] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    level: "",
    teacher: "",
    class_date: "",
    class_time: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchClasses = () => {
    fetch("http://localhost:5000/api/classes")
      .then((res) => res.json())
      .then((data) => setClasses(data));
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editId
      ? `http://localhost:5000/api/classes/${editId}`
      : "http://localhost:5000/api/classes";
    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      title: "",
      description: "",
      level: "",
      teacher: "",
      class_date: "",
      class_time: "",
    });
    setEditId(null);
    fetchClasses();
  };

  const handleEdit = (cls) => {
    setForm(cls);
    setEditId(cls.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this class?")) {
      await fetch(`http://localhost:5000/api/classes/${id}`, {
        method: "DELETE",
      });
      fetchClasses();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Manage Classes</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <br />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Level (A1, A2, etc)"
          value={form.level}
          onChange={(e) => setForm({ ...form, level: e.target.value })}
          required
        />
        <br />
        <input
          type="text"
          placeholder="Teacher"
          value={form.teacher}
          onChange={(e) => setForm({ ...form, teacher: e.target.value })}
          required
        />
        <br />
        <input
          type="date"
          value={form.class_date}
          onChange={(e) => setForm({ ...form, class_date: e.target.value })}
          required
        />
        <input
          type="time"
          value={form.class_time}
          onChange={(e) => setForm({ ...form, class_time: e.target.value })}
          required
        />
        <br />
        <button type="submit" style={{ marginTop: 10 }}>
          {editId ? "Update Class" : "Add Class"}
        </button>
      </form>

      <ul>
        {classes.map((cls) => (
          <li key={cls.id} style={{ marginBottom: 20 }}>
            <strong>{cls.title}</strong> — {cls.level} — {cls.class_date}{" "}
            {cls.class_time} <br />
            Teacher: {cls.teacher}
            <br />
            <button onClick={() => handleEdit(cls)}>Edit</button>{" "}
            <button onClick={() => handleDelete(cls.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageClasses;
