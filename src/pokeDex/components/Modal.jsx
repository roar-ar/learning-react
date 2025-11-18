import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ item, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previouslyFocused = document.activeElement;
    ref.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      previouslyFocused && previouslyFocused.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label={`Details for ${item.name.japanese}`} onClick={onClose}>
      <div className="modal" onClick={(e)=>e.stopPropagation()}>
        <header>
          <h3>{item.name.japanese}</h3>
          <button className="close-btn" onClick={onClose} ref={ref} aria-label="Close">閉じる</button>
        </header>
        <div className="body">
          <img src={item.image.hires} alt={item.name.japanese} />
          <div>
            <div><strong>ID:</strong> {item.id}</div>
            <div><strong>Path:</strong> <code>{item.image.hires}</code></div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
