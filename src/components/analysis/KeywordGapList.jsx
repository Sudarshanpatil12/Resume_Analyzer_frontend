function KeywordChips({ title, items = [], type }) {
  return (
    <section className="card">
      <div className="row-between">
        <h3>{title}</h3>
        <span className={`count-badge ${type}`}>{items.length}</span>
      </div>

      {items.length ? (
        <div className="chip-wrap">
          {items.map((item) => (
            <span key={item} className={`keyword-chip ${type}`}>
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="muted-text">No keywords in this section yet.</p>
      )}
    </section>
  );
}

function KeywordGapList({ matched = [], missing = [] }) {
  return (
    <div className="grid-2">
      <KeywordChips title="Matched Keywords" items={matched} type="match" />
      <KeywordChips title="Missing Keywords" items={missing} type="miss" />
    </div>
  );
}

export default KeywordGapList;
