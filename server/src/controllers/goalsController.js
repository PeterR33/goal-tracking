import Goal from "../models/Goal.js";

export async function listGoals(req, res) {
  const goals = await Goal.find().sort({
    completed: 1,
    dueDate: 1,
    createdAt: -1,
  });
  res.json(goals);
}

export async function createGoal(req, res) {
  const { title, priority, dueDate } = req.body;
  const goal = await Goal.create({ title, priority, dueDate });
  res.status(201).json(goal);
}

export async function updateGoal(req, res) {
  const { id } = req.params;
  const goal = await Goal.findByIdAndUpdate(id, req.body, { new: true });
  if (!goal) return res.status(404).json({ error: "Not found" });
  res.json(goal);
}

export async function deleteGoal(req, res) {
  const { id } = req.params;
  const deleted = await Goal.findByIdAndDelete(id);
  if (!deleted) return res.status(404).json({ error: "Not found" });
  res.json({ ok: true });
}
