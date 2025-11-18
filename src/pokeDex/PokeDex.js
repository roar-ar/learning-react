import "../css/pokeDex.css";

import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Modal from "./components/Modal";
import usePagination from "./hooks/usePagination";

export default function PokeDex() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  // pagination states
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  useEffect(() => {
    fetch("/data/pokedex.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load pokedex.json");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const pageList = usePagination(total, pageSize, page, 1);

  return (
    <>
      <Header />
      <main className="container">
        {error && <p style={{ color: "#fca5a5" }}>読み込みエラー: {error}</p>}

        <div className="controls" aria-label="pagination controls">
          <label>
            <span className="muted" style={{ marginRight: 8 }}>
              表示件数
            </span>
            <select
              className="select"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPage(1);
              }}
            >
              {[4, 8, 12, 24].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div style={{ flex: 1 }} />
          <div className="pager">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              aria-label="Previous page"
            >
              ‹
            </button>
            {pageList.map((p, idx) =>
              p === "…" ? (
                <span key={idx} className="muted" aria-hidden="true">
                  …
                </span>
              ) : (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  aria-current={p === page ? "page" : undefined}
                >
                  {p}
                </button>
              )
            )}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        </div>

        <section className="grid" aria-label="card grid">
          {pageItems.map((item) => (
            <Card key={item.id} item={item} onClick={setSelected} />
          ))}
        </section>

        {selected && (
          <Modal item={selected} onClose={() => setSelected(null)} />
        )}
      </main>
    </>
  );
}
