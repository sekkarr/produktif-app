import { useState, useEffect } from "react";

export default function EisenhowerPage() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("urgent-important");

  useEffect(() => {
    const saved = localStorage.getItem("notes");
    if (saved) {
      setNotes(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (!title) return;

    const newNote = {
      id: Date.now(),
      title,
      priority,
    };

    setNotes((prev) => [newNote, ...prev]);
    setTitle("");
  };

  //delete
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // kuadran
  const grouped = {
    "urgent-important": notes.filter((n) => n.priority === "urgent-important"),
    "not-urgent-important": notes.filter(
      (n) => n.priority === "not-urgent-important",
    ),
    "urgent-not-important": notes.filter(
      (n) => n.priority === "urgent-not-important",
    ),
    "not-urgent-not-important": notes.filter(
      (n) => n.priority === "not-urgent-not-important",
    ),
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Eisenhower Matrix</h1>

      {/* inputan */}
      <div
        style={{
          marginBottom: "20px",
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tuliskan catatan ... "
          style={{
            padding: "8px 10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            flex: "1",
            minWidth: "200px",
          }}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          <option value="urgent-important">Urgent & Important</option>
          <option value="not-urgent-important">Not Urgent & Important</option>
          <option value="urgent-not-important">Urgent & Not Important</option>
          <option value="not-urgent-not-important">
            Not Urgent & Not Important
          </option>
        </select>

        <button
          onClick={handleAdd}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Tambah
        </button>
      </div>

      {/* grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <Box
          title="Do Now"
          items={grouped["urgent-important"]}
          deleteNote={deleteNote}
        />
        <Box
          title="Schedule"
          items={grouped["not-urgent-important"]}
          deleteNote={deleteNote}
        />
        <Box
          title="Delegate"
          items={grouped["urgent-not-important"]}
          deleteNote={deleteNote}
        />
        <Box
          title="Delete"
          items={grouped["not-urgent-not-important"]}
          deleteNote={deleteNote}
        />
      </div>
    </div>
  );
}

// COMPONENT BOX
function Box({ title, items, deleteNote }) {
  const getColor = () => {
    if (title === "Do Now") return "#ffdddd"; // merah muda
    if (title === "Schedule") return "#ddeaff"; // biru
    if (title === "Delegate") return "#fff4cc"; // kuning
    if (title === "Delete") return "#eeeeee"; // abu
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "10px",
        minHeight: "150px",
        backgroundColor: getColor(),
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ marginBottom: "10px" }}>{title}</h3>

      {items.length === 0 ? (
        <p style={{ color: "#777" }}>Kosong</p>
      ) : (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>- {item.title}</span>
            <button
              onClick={() => deleteNote(item.id)}
              style={{
                border: "none",
                background: "red",
                color: "white",
                borderRadius: "5px",
                cursor: "pointer",
                padding: "4px 8px",
              }}
            >
              Hapus
            </button>
          </div>
        ))
      )}
    </div>
  );
}
