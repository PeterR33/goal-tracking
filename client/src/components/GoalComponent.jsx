import { useState } from "react";

export default function GoalForm({ onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState(3);
  const [dueDate, setDueDate] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!title || !dueDate) return;
    onCreate({ title, priority: Number(priority), dueDate });
    setTitle("");
    setPriority(3);
    setDueDate("");
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="field">
        <label>Title</label>
        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Finish Assignment 6"
        />
      </div>

      <div className="field">
        <label>Priority</label>
        <select
          className="select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value={1}>1 (red)</option>
          <option value={2}>2 (yellow)</option>
          <option value={3}>3 (green)</option>
        </select>
      </div>

      <div className="field">
        <label>Due date</label>
        <input
          type="date"
          className="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <button className="btn" type="submit">
        Add
      </button>
    </form>
  );
}
