import "../css/pokeDex.css";

import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import Card from "./components/Card";
import Modal from "./components/Modal";
import usePagination from "./hooks/usePagination";

// URLパラメータ読み込み
function readParams() {
  // クエリ文字列を操作するオブジェクトを生成
  const searchParams = new URLSearchParams(window.location.search);
  // クエリ文字列の値を取得
  const query = searchParams.get('query') ?? '';
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const size = parseInt(searchParams.get('size') || '8');
  const pageSize = [4,8,12,24].includes(size) ? size : 8;

  return { query, page, pageSize };
}

// URLパラメータ書き込み
function writeParams({ query, page, pageSize }) {
  // クエリ文字列を操作するオブジェクトを生成
  const searchParams = new URLSearchParams(window.location.search);
  // 値があればクエリ文字列にセット、なければ削除する
  query ? searchParams.set('query', query) : searchParams.delete('query');
  page > 1 ? searchParams.set('page', String(page)) : searchParams.delete('page');
  pageSize !== 8 ? searchParams.set('size', String(pageSize)) : searchParams.delete('size');

  // 新しいURLを作成しセット
  const newUrl = window.location.pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
  window.history.replaceState(null, '', newUrl);
}

export default function PokeDex() {
  const params = readParams();
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);

  // pagination states
  const [page, setPage] = useState(params.page);
  const [pageSize, setPageSize] = useState(params.pageSize);

  useEffect(() => {
    fetch("/data/pokedex.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load pokedex.json");
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);

  // 検索
  const [query, setQuery] = useState(params.query);
  const filtered = useMemo(() => {

    // 検索文字列を取得
    const q = query.trim().toLowerCase();
    // 検索文字列がない場合はすべて返却
    if (!q) return items;

    // 数値の場合
    const isNumeric = /^\d+$/.test(q);
    if (isNumeric) {
      const id = Number(q);
      return items.filter(item => Number(item.id) === id);
    }
    // 文字列の場合
    return items.filter((item) =>
      (item.name.japanese ?? "").toLowerCase().includes(q)
    );

  }, [items, query]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages, page]);

  const pageItems = useMemo(
    () =>
      filtered.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize),
    [filtered, page, pageSize]
  );
  const pageList = usePagination(total, pageSize, page, 1);

  // URLと同期する
  useEffect(()=>{
    writeParams({ query, page, pageSize });
  }, [query, page, pageSize]);

  return (
    <>
      <Header query={query} onQueryChange={setQuery} />
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
