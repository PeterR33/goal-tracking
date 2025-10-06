function priorityClass(p) {
  if (p === 1) return "priority-1";
  if (p === 2) return "priority-2";
  return "priority-3";
}

export default function GoalCard({ goal, onToggle, onDelete }) {
  const due = new Date(goal.dueDate).toLocaleDateString();
  return (
    <div className={`card ${priorityClass(goal.priority)}`}>
      <div className="row">
        <span className="due">Due: {due}</span>
        <input
          type="checkbox"
          checked={goal.completed}
          onChange={() => onToggle(goal)}
          title="Mark complete"
        />
      </div>
      <h3 className={goal.completed ? "strike" : ""}>{goal.title}</h3>
      <div className="actions">
        <button className="link" onClick={() => onDelete(goal._id)}>
          Delete
        </button>
      </div>
    </div>
  );
}
