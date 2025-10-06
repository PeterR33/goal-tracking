import { useEffect, useState } from "react";
import { GoalsAPI } from "./api.js";
import GoalForm from "./components/GoalForm.jsx";
import GoalList from "./components/GoalList.jsx";
import Modal from "./components/Modal.jsx";

export default function App() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  async function refresh() {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await GoalsAPI.list();
      setGoals(Array.isArray(data) ? data : []);
      if (!Array.isArray(data)) setErrorMsg("Unexpected server response.");
    } catch {
      setErrorMsg("Failed to load goals.");
      setGoals([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  async function create(goal) {
    try {
      await GoalsAPI.create(goal);
      setModalOpen(false);
      refresh();
    } catch {
      setErrorMsg("Create failed");
    }
  }

  async function toggle(g) {
    try {
      await GoalsAPI.update(g._id, { completed: !g.completed });
      refresh();
    } catch {
      setErrorMsg("Update failed");
    }
  }

  async function remove(id) {
    try {
      await GoalsAPI.remove(id);
      refresh();
    } catch {
      setErrorMsg("Delete failed");
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <div className="brand">
            <span className="brand__dot" />
            <span className="brand__name">Goal Tracker</span>
          </div>
          <nav className="nav">
            <button
              className="btn btn-primary"
              onClick={() => setModalOpen(true)}
            >
              + Add goal
            </button>
          </nav>
        </div>
      </header>

      <main className="container">
        <p className="lede">
          Create goals, set priority and due dates, and track them on a
          pinboard.
        </p>

        {loading && <p style={{ marginTop: 16 }}>Loading…</p>}
        {!loading && errorMsg && (
          <p style={{ marginTop: 16, color: "#b91c1c" }}>{errorMsg}</p>
        )}
        {!loading && !errorMsg && (
          <GoalList goals={goals} onToggle={toggle} onDelete={remove} />
        )}
      </main>

      <Modal
        open={modalOpen}
        title="Add a goal"
        onClose={() => setModalOpen(false)}
      >
        {/* Reuse your existing GoalForm inside the modal (no code change needed) */}
        <GoalForm onCreate={create} />
      </Modal>
    </>
  );
}
