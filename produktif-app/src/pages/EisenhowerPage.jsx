import { useState, useEffect } from "react";
import AddNote from "../components/AddNotes";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
  onSnapshot,
  query,
  where
} from "firebase/firestore";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function EisenhowerPage() {
  const [notes, setNotes] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");


  const [user, setUser] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const unsub = onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  });

  return () => unsub();
}, []);



  // LOAD data
useEffect(() => {
  if (!user) return;

  const q = query(
    collection(db, "notes"),
    where("uid", "==", user.uid)
  );

  const unsub = onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setNotes(data);
    setIsLoaded(true);
  });

  return () => unsub();
}, [user]);


  // TOAST AUTO HIDE
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast]);

  // ADD / EDIT NOTE
const handleAdd = async (newNote) => {
  try {

    if (!user) return;

    if (isEditing && editingNote) {
      const noteRef = doc(db, "notes", editingNote.id);

      await updateDoc(noteRef, {
        title: newNote.title,
        content: newNote.content,
        priority: newNote.priority,
        deadline: newNote.deadline,
        isCompleted: newNote.isCompleted,
        date: newNote.date,
        uid: user.uid, 
      });

      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNote.id
            ? { ...note, ...newNote }
            : note
        )
      );

      setToast("Note updated successfully!");

      setIsEditing(false);
      setEditingNote(null);
    } else {
      const docRef = await addDoc(collection(db, "notes"), {
        title: newNote.title,
        content: newNote.content,
        priority: newNote.priority,
        deadline: newNote.deadline,
        isCompleted: false,
        date: newNote.date,
        uid: user.uid, 
      });

      setNotes((prev) => [
        {
          ...newNote,
          id: docRef.id,
          uid: user.uid,
        },
        ...prev,
      ]);

      setToast("Note saved successfully!");
    }
  } catch (error) {
    console.error(error);
  }
};

  // DELETE NOTE
const deleteNote = (id) => {
  setConfirmDelete(id);
};

const confirmDeleteNote = async () => {
  if (!confirmDelete) return;

  if (!user) return;

  try {
    await deleteDoc(doc(db, "notes", confirmDelete));

    setNotes((prev) =>
      prev.filter((note) => note.id !== confirmDelete)
    );

    setToast("Note deleted!");
    setConfirmDelete(null);
  } catch (error) {
    console.error(error);
  }
};

  // COMPLETE TASK
const toggleComplete = async (id) => {

  if (!user) return;
  const targetNote = notes.find((note) => note.id === id);

  if (!targetNote) return;

  try {
    await updateDoc(doc(db, "notes", id), {
      isCompleted: !targetNote.isCompleted,
    });

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isCompleted: !note.isCompleted,
            }
          : note
      )
    );
  } catch (error) {
    console.error(error);
  }
};

  // EDIT
const handleEdit = (note) => {
  setEditingNote(note); 
  setIsEditing(true);
  setIsModalOpen(true);
};

  // SEARCH
  const filteredNotes = notes.filter((note) => {
    const keyword = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(keyword) ||
      note.content.toLowerCase().includes(keyword)
    );
  });

  // GROUP MATRIX
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

  // DEADLINE STATUS
const getDeadlineStatus = (deadline) => {
  if (!deadline) return null;

  const now = new Date();
  const dueDate = new Date(deadline);

  const diffMs = dueDate - now;
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffMs < 0) {
    return {
      text: "Overdue",
      color: "bg-red-500/20 text-red-300 border border-red-500/30",
    };
  }

  if (diffHours <= 24) {
    return {
      text: `${diffHours} hours left`,
      color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    };
  }

  const diffDays = Math.floor(diffHours / 24);

  return {
    text: `${diffDays} days left`,
    color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
  };
};


  if (loading) {
    return (
      <div className="text-white flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }
  return (
    <div className="min-h-screen px-6 py-10 text-white">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Eisenhower Matrix</h1>

              <img
                src="/icon/matrix.png"
                alt="Matrix Icon"
                className="w-10 h-10 mb-2"
              />
            </div>

            <p className="text-gray-300">
              Organize tasks based on urgency and importance
            </p>
          </div>

          {/* BUTTON */}
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
w-full
sm:flex-1
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

            {/* ADD NOTE */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="
w-full sm:w-auto
bg-indigo-600 hover:bg-indigo-700
transition
px-5 py-3
rounded-xl
font-medium
shadow-lg
whitespace-nowrap
"
            >
              + Add Note
            </button>
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

      {/* DELETE MODAL */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-sm mx-4 text-white shadow-2xl">
            <h2 className="text-xl font-semibold mb-3">Delete Note?</h2>

            <p className="text-gray-300 text-sm mb-6">
              This action cannot be undone.
            </p>

            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
              <button
                onClick={() => setConfirmDelete(null)}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
              >
                Cancel
              </button>

              <button
                onClick={confirmDeleteNote}
                className="
px-4 py-2
rounded-lg
bg-red-600
hover:bg-red-700
text-white
transition
"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && (
        <div
          className="
            fixed top-5 right-2 left-2 sm:left-auto sm:right-5
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
          toggleComplete={toggleComplete}
          getDeadlineStatus={getDeadlineStatus}
          color="from-red-500/20 to-pink-500/20"
        />

        <Box
          title="Schedule"
          subtitle="Not Urgent & Important"
          items={grouped["not-urgent-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          toggleComplete={toggleComplete}
          getDeadlineStatus={getDeadlineStatus}
          color="from-blue-500/20 to-cyan-500/20"
        />

        <Box
          title="Delegate"
          subtitle="Urgent & Not Important"
          items={grouped["urgent-not-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          toggleComplete={toggleComplete}
          getDeadlineStatus={getDeadlineStatus}
          color="from-yellow-500/20 to-orange-500/20"
        />

        <Box
          title="Eliminate"
          subtitle="Not Urgent & Not Important"
          items={grouped["not-urgent-not-important"]}
          deleteNote={deleteNote}
          handleEdit={handleEdit}
          toggleComplete={toggleComplete}
          getDeadlineStatus={getDeadlineStatus}
          color="from-gray-500/20 to-slate-500/20"
        />
      </div>
    </div>
  );
}

function Box({
  title,
  subtitle,
  items,
  deleteNote,
  handleEdit,
  getDeadlineStatus,
  toggleComplete,
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
              className={`
                bg-white/10
                border border-white/10
                backdrop-blur-md
                rounded-xl
                p-4
                shadow-lg
                transition
                ${item.isCompleted ? "opacity-60" : "opacity-100"}
              `}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                {/* CONTENT */}
                <div>
                  <h3
                    className={`
                      font-semibold text-lg
                      ${item.isCompleted ? "line-through text-gray-400" : ""}
                    `}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`
                      text-sm mt-1
                      ${
                        item.isCompleted
                          ? "line-through text-gray-500"
                          : "text-gray-200"
                      }
                    `}
                  >
                    {item.content}
                  </p>

                  {/* DEADLINE */}
                 <p className="text-sm text-gray-300 mt-2">
  Deadline:
</p>

<p className="text-sm text-white">
  {item.deadline?.split("T")[0]}
</p>

{item.deadline?.includes("T") && (
  <p className="text-xs text-gray-400">
    {item.deadline.split("T")[1]}
  </p>
)}
                  {item.deadline && (
                    <div
                      className={`
                        mt-2 inline-block px-3 py-1 rounded-lg
                        text-xs font-medium
                        ${getDeadlineStatus(item.deadline).color}
                      `}
                    >
                      {getDeadlineStatus(item.deadline).text}
                    </div>
                  )}
                </div>

                {/* ACTION BUTTONS */}
<div className="flex flex-col items-start sm:items-end gap-3 w-full sm:w-auto">                
                  <p className="text-xs text-gray-400">{item.date}</p>


                         {/* MARK DONE */}
                  <button
  onClick={() => toggleComplete(item.id)}
  className={`
    w-full sm:w-auto
    px-3 py-2
    rounded-lg
    text-sm
    transition duration-200
    hover:scale-105
    ${
      item.isCompleted
        ? "bg-green-600 hover:bg-green-700"
        : "bg-white/10 hover:bg-white/20"
    }
  `}
>
                    {item.isCompleted ? "Completed" : "Mark as Done"}
                  </button>

                  {/* EDIT + DELETE */}
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleEdit(item)}
                      className="
p-2 sm:p-2.5
min-w-[40px]
min-h-[40px]
rounded-lg
bg-white/10
hover:bg-blue-500/30
transition duration-200
flex items-center justify-center
shrink-0
"
                    >
                      <img
                        src="/icon/edit.png"
                        alt="Edit"
                        className="w-5 h-5 object-contain shrink-0"
                      />
                    </button>

                    <button
                      onClick={() => deleteNote(item.id)}
                      className="
                      p-2 rounded-lg
                      bg-white/10
                      hover:bg-red-500/30
                      hover:scale-110
                      transition duration-200
                    "
                    >
                      <img
                        src="/icon/delete.png"
                        alt="Delete"
                        className="w-5 h-5 object-contain shrink-0"
                      />
                    </button>
                  </div>

           
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
