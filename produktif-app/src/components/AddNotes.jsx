import { useState, useEffect } from "react";

export default function AddNote({ onClose, onSave, editData }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState("urgent-important");

  const [deadlineDate, setDeadlineDate] = useState("");
  const [deadlineTime, setDeadlineTime] = useState("");

  const currentDate = new Date().toLocaleDateString();

  // SYNC DATA SAAT EDIT
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setContent(editData.content || "");
      setPriority(editData.priority || "urgent-important");

      if (editData.deadline) {
        const [date, time] = editData.deadline.split("T");

        setDeadlineDate(date || "");
        setDeadlineTime(time || "");
      } else {
        setDeadlineDate("");
        setDeadlineTime("");
      }
    } else {
      setTitle("");
      setContent("");
      setPriority("urgent-important");
      setDeadlineDate("");
      setDeadlineTime("");
    }
  }, [editData]);

  const handleSave = () => {
    if (!title || !content) return;

    const deadline =
      deadlineDate && deadlineTime
        ? `${deadlineDate}T${deadlineTime}`
        : deadlineDate;

    const newNote = {
      id: editData?.id || Date.now(),
      title,
      deadline,
      content,
      priority,
      date: editData?.date || currentDate,
      isCompleted: editData?.isCompleted || false,
    };

    onSave(newNote);

    // reset setelah save
    setTitle("");
    setContent("");
    setPriority("urgent-important");
    setDeadlineDate("");
    setDeadlineTime("");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
      {/* MODAL */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 w-full max-w-md shadow-2xl text-white">
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">
            {editData ? "Edit Note" : "Add Note"}
          </h2>

          <button onClick={onClose} className="text-gray-300 hover:text-white">
            ✕
          </button>
        </div>

        {/* DATE */}
        <p className="text-sm text-gray-300 mb-4">Date: {currentDate}</p>

        {/* TITLE */}
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none"
        />

        {/* DEADLINE */}
        <p className="text-sm text-gray-300 mb-2">Deadline</p>
        <input
          type="date"
          value={deadlineDate}
          onChange={(e) => setDeadlineDate(e.target.value)}
          className="w-full mb-4 p-3 rounded-lg bg-white/10 border border-white/20 text-gray-300 focus:outline-none"
        />

        {/* DEADLINE TIME */}
        <p className="text-sm text-gray-300 mb-2">Deadline Time</p>
        <input
          type="time"
          value={deadlineTime}
          onChange={(e) => setDeadlineTime(e.target.value)}
          className="w-full mb-3 p-3 rounded-lg bg-white/10"
        />

        {/* PRIORITY */}
        <div className="mb-4 text-left">
          <p className="text-sm text-gray-300 mb-2">Category</p>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-gray-300 focus:outline-none"
          >
            <option value="urgent-important">Important & Urgent</option>

            <option value="not-urgent-important">Important & Not Urgent</option>

            <option value="urgent-not-important">Not Important & Urgent</option>

            <option value="not-urgent-not-important">
              Not Important & Not Urgent
            </option>
          </select>
        </div>

        {/* CONTENT */}
        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="w-full mb-6 p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none resize-none"
        />

        {/* BUTTONS */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
