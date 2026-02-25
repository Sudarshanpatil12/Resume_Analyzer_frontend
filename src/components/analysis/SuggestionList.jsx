function SuggestionList({ strengths = [], improvements = [], verdict = '' }) {
  return (
    <div className="grid-2">
      <section className="card">
        <h3>Strengths</h3>
        <ul>
          {strengths.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="card">
        <h3>Improvements</h3>
        <ul>
          {improvements.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>
      <section className="card full-width">
        <h3>Final Verdict</h3>
        <p>{verdict}</p>
      </section>
    </div>
  );
}

export default SuggestionList;
