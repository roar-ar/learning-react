import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import StatusBar from "./StatusBar";

export default function Modal({ item, onClose }) {

  // プログレスバーの最大値を算出
  const maxRef = Math.max(
    item.base.HP,
    item.base.Attack,
    item.base.Defense,
    item.base["Sp. Attack"],
    item.base["Sp. Defense"],
    100
  );

  // モーダルを閉じる系の処理
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
            <div><strong>Name:</strong> {item.name.japanese}</div>
            <div><strong>タイプ:</strong> {item.type.join('・')}</div>
            <div><strong>HP:</strong> {item.base.HP}</div>
            <div><strong>こうげき:</strong> {item.base.Attack}</div>
            <div><strong>ぼうぎょ:</strong> {item.base.Defense}</div>
            <div><strong>とくこう:</strong> {item.base["Sp. Attack"]}</div>
            <div><strong>とくぼう:</strong> {item.base["Sp. Defense"]}</div>
            <div><strong>すばやさ:</strong> {item.base.Speed}</div>
            <div><strong>説明:</strong> {item.description}</div>
          </div>
          <div className="stats">
            <h4>ステータス</h4>
            <StatusBar label="HP" value={item.base.HP ?? 0} maxRef={maxRef} />
            <StatusBar label="こうげき" value={item.base.Attack ?? 0} maxRef={maxRef} />
            <StatusBar label="ぼうぎょ" value={item.base.Defense ?? 0} maxRef={maxRef} />
            <StatusBar label="とくこう" value={item.base["Sp. Attack"] ?? 0} maxRef={maxRef} />
            <StatusBar label="とくぼう" value={item.base["Sp. Defense"] ?? 0} maxRef={maxRef} />
            <StatusBar label="すばやさ" value={item.base.Speed ?? 0} maxRef={maxRef} />
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
