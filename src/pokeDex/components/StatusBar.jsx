export default function StatusBar({ label, value, maxRef }){
  const maxBase = Math.max(100, maxRef);
  const pct = Math.max(0, Math.min(100, Math.round((value / maxBase) * 100)));
  return (
    <div className="stat-row">
      <div className="stat-label">{label}</div>
      <div className="progress" role="progressbar" aria-valuenow={pct} aria-valuemin="0" aria-valuemax="100">
        <div className="progress-fill" style={{width: pct + '%'}} />
      </div>
      <div className="stat-val">{value}</div>
    </div>
  );
}