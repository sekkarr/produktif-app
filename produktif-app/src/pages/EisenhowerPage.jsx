import { useState, useEffect } from "react";
import AddNote from "../components/AddNotes";

export default function EisenhowerPage() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

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

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ADD NOTE
  const handleAdd = (newNote) => {
    if (isEditing) {
      const updatedNotes = notes.map((note) =>
        note.id === editingNote.id ? { ...note, ...newNote } : note,
      );

      setNotes(updatedNotes);
      setToast("Note updated successfully!");

      setIsEditing(false);
      setEditingNote(null);
    } else {
      setNotes((prev) => [newNote, ...prev]);
      setToast("Note saved successfully!");
    }
  };
  // DELETE NOTE
  const deleteNote = (id) => {
    setConfirmDelete(id);
  };

  const confirmDeleteNote = () => {
    setNotes(notes.filter((note) => note.id !== confirmDelete));
    setToast("Note deleted!");
    setConfirmDelete(null);
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const filteredNotes = notes.filter((note) => {
    const keyword = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword)
    );
  });
  // GROUP QUADRANTS
  const grouped = {
    "urgent-important": filteredNotes.filter(
      (n) => n.priority === "urgent-important",
    ),

    "not-urgent-important": filteredNotes.filter(
      (n) => n.priority === "not-urgent-important",
    ),

    "urgent-not-important": filteredNotes.filter(
      (n) => n.priority === "urgent-not-important",
    ),

    "not-urgent-not-important": filteredNotes.filter(
      (n) => n.priority === "not-urgent-not-important",
    ),
  };

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return null;

    const today = new Date();
    const dueDate = new Date(deadline);

    // reset jam
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      return {
        text: "Overdue",
        color: "bg-red-500/20 text-red-300 border border-red-500/30",
      };
    }

    if (diffDays === 0) {
      return {
        text: "Due Today",
        color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
      };
    }

    return {
      text: `${diffDays} day${diffDays > 1 ? "s" : ""} left`,
      color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    };
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

          <div className="mt-6">
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
      w-full
      p-3
      rounded-xl
      bg-white/10
      border border-white/10
      backdrop-blur-md
      text-white
      placeholder-gray-400
      focus:outline-none
    "
            />
          </div>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <AddNote
          onClose={() => {
            setIsModalOpen(false);
            setIsEditing(false);
            setEditingNote(null);
          }}
          onSave={(note) => {
            handleAdd(note);
            setIsModalOpen(false);
          }}
          editData={editingNote}
          isEditing={isEditing}
        />
      )}

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-sm text-white shadow-2xl">
            <h2 className="text-xl font-semibold mb-3">Delete Note?</h2>

            <p className="text-gray-300 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteNote}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {toast && (
        <div
          className="
      fixed top-5 right-5
      bg-white/10 backdrop-blur-md
      border border-white/20
      text-white
      px-5 py-3
      rounded-xl
      shadow-2xl
      z-50
      animate-pulse
    "
        >
          {toast}
        </div>
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
          handleEdit={handleEdit}
          getDeadlineStatus={getDeadlineStatus}
          color="from-red-500/20 to-pink-500/20"
        />

        <Box
          title="Schedule"
          subtitle="Not Urgent & Important"
          items={grouped["not-urgent-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          getDeadlineStatus={getDeadlineStatus}
          color="from-blue-500/20 to-cyan-500/20"
        />

        <Box
          title="Delegate"
          subtitle="Urgent & Not Important"
          items={grouped["urgent-not-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          getDeadlineStatus={getDeadlineStatus}
          color="from-yellow-500/20 to-orange-500/20"
        />

        <Box
          title="Delete"
          subtitle="Not Urgent & Not Important"
          items={grouped["not-urgent-not-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          getDeadlineStatus={getDeadlineStatus}
          color="from-gray-500/20 to-slate-500/20"
        />
      </div>
    </div>
  );
}

/* ========================= */
/* BOX COMPONENT */
/* ========================= */

function Box({
  title,
  subtitle,
  items,
  deleteNote,
  handleEdit,
  getDeadlineStatus,
  color,
}) {
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

                  {item.deadline && (
                    <div
                      className={`
      mt-2 inline-block px-3 py-1 rounded-lg text-xs font-medium
      ${getDeadlineStatus(item.deadline).color}
    `}
                    >
                      {getDeadlineStatus(item.deadline).text}
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <p className="text-xs text-gray-400">{item.date}</p>
                  <button
                    onClick={() => handleEdit(item)}
                    className="
      bg-blue-500/80 hover:bg-blue-600
      transition
      px-3 py-1
      rounded-lg
      text-sm
    "
                  >
                    Edit
                  </button>

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
