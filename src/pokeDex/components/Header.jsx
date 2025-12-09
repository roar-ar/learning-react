export default function Header({ query, onQueryChange }) {
  return (
    <header className="app-header" role="banner">
      <div className="header-inner">
        <div className="brand">
          <span className="dot" aria-hidden="true"></span>
          <span>PokeDex</span>
        </div>
        {/* ↓ここから追加する↓ */}
        <div>
          <input
            type="text"
            placeholder="名前で検索…"
            value={query}
            onChange={(e)=>onQueryChange(e.target.value)}
            aria-label="名前で検索"
            className="search-input"
          />
        </div>
        {/* ↑ここまで追加する↑ */}
      </div>
    </header>
  );
}
