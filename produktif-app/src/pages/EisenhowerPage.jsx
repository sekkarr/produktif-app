import { useState, useEffect } from "react";
import AddNote from "../components/AddNotes";

export default function EisenhowerPage() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // LOAD LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("notes");

    if (saved) {
      setNotes(JSON.parse(saved));
    }

    setIsLoaded(true);
  }, []);

  // SAVE LOCAL STORAGE
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, isLoaded]);

  // ADD NOTE
  const handleAdd = (newNote) => {
    setNotes((prev) => [newNote, ...prev]);
  };

  // DELETE NOTE
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // GROUP QUADRANTS
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
    <div className="min-h-screen px-6 py-10 text-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <h1 className="text-4xl font-bold mb-2">Eisenhower Matrix</h1>

            <p className="text-gray-300">
              Organize tasks based on urgency and importance
            </p>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="
              bg-indigo-600 hover:bg-indigo-700
              transition
              px-5 py-3
              rounded-xl
              font-medium
              shadow-lg
            "
          >
            + Add Note
          </button>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <AddNote
          onClose={() => setIsModalOpen(false)}
          onSave={(note) => {
            handleAdd(note);
            setIsModalOpen(false);
          }}
        />
      )}

      {/* GRID */}
      <div
        className="
        max-w-7xl mx-auto
        grid grid-cols-1 md:grid-cols-2
        gap-6
      "
      >
        <Box
          title="Do Now"
          subtitle="Urgent & Important"
          items={grouped["urgent-important"]}
          deleteNote={deleteNote}
          color="from-red-500/20 to-pink-500/20"
        />

        <Box
          title="Schedule"
          subtitle="Not Urgent & Important"
          items={grouped["not-urgent-important"]}
          deleteNote={deleteNote}
          color="from-blue-500/20 to-cyan-500/20"
        />

        <Box
          title="Delegate"
          subtitle="Urgent & Not Important"
          items={grouped["urgent-not-important"]}
          deleteNote={deleteNote}
          color="from-yellow-500/20 to-orange-500/20"
        />

        <Box
          title="Delete"
          subtitle="Not Urgent & Not Important"
          items={grouped["not-urgent-not-important"]}
          deleteNote={deleteNote}
          color="from-gray-500/20 to-slate-500/20"
        />
      </div>
    </div>
  );
}

/* ========================= */
/* BOX COMPONENT */
/* ========================= */

function Box({ title, subtitle, items, deleteNote, color }) {
  return (
    <div
      className={`
        bg-gradient-to-br ${color}
        backdrop-blur-md
        border border-white/10
        rounded-2xl
        p-5
        shadow-xl
        min-h-[300px]
      `}
    >
      {/* HEADER */}
      <div className="mb-5">
        <h2 className="text-2xl font-semibold mb-1">{title}</h2>

        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>

      {/* EMPTY */}
      {items.length === 0 ? (
        <div
          className="
          border border-dashed border-white/10
          rounded-xl
          py-10
          text-center
          text-gray-400
        "
        >
          No notes yet
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="
                bg-white/10
                border border-white/10
                backdrop-blur-md
                rounded-xl
                p-4
                shadow-lg
              "
            >
              {/* TITLE */}
              <div className="flex justify-between items-start gap-3">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <h3 className="text-sm  text-lg">{item.content}</h3>

                  {/* DEADLINE */}
                  <p className="text-sm text-gray-300 mt-1">
                    Deadline: {item.deadline}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-gray-400">{item.date}</p>
    
                <button
                  onClick={() => deleteNote(item.id)}
                  className="
                    bg-red-500/80 hover:bg-red-600
                    transition
                    px-3 py-1
                    rounded-lg
                    text-sm
                  "
                >
                  Delete
                </button>
                </div>

                
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
