function AtsGauge({ score, label = 'ATS Score', tone = 'default' }) {
  return (
    <div className="card">
      <div className="row-between">
        <h3>{label}</h3>
        <span className={`count-badge ${tone}`}>{score}</span>
      </div>
      <div className="gauge-wrap">
        <div className={`gauge-ring ${tone}`} style={{ '--score': score }}>
          <span>{score}</span>
        </div>
      </div>
    </div>
  );
}

export default AtsGauge;
