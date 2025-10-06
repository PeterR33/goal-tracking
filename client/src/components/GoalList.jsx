import GoalCard from "./GoalCard.jsx";

export default function GoalList({ goals, onToggle, onDelete }) {
  if (!Array.isArray(goals)) {
    return <p style={{ marginTop: 16 }}>No goals to show.</p>;
  }
  return (
    <div className="pinboard">
      {goals.map((g) => (
        <GoalCard
          key={g._id}
          goal={g}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
