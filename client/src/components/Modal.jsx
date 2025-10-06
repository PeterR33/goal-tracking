export default function Modal({ open, title, onClose, children }) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="modal-overlay"
      onClick={onClose}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
