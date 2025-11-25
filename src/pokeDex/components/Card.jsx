export default function Card({ item, onClick }) {
  return (
    <article
      className="card"
      onClick={() => onClick(item)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick(item);
      }}
      aria-label={`Open details for ${item.name.japanese}`}
    >
      <img src={item.image.sprite} alt={item.name.japanese} />
      <div className="meta">
        <div className="name">{item.name.japanese}</div>
        <div className="id">ID: {item.id}</div>
      </div>
    </article>
  );
}
