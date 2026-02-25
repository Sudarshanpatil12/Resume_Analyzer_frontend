function StatCard({ label, value, accent = 'var(--brand)', helper = '' }) {
  return (
    <article className="stat-card" style={{ borderColor: accent }}>
      <p>{label}</p>
      <h3>{value}</h3>
      {helper ? <small>{helper}</small> : null}
    </article>
  );
}

export default StatCard;
