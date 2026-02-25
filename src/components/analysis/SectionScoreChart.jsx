import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function SectionScoreChart({ sectionScores = {} }) {
  const data = Object.entries(sectionScores).map(([name, score]) => ({ name, score }));

  return (
    <div className="card chart-card">
      <h3>Section-wise Score</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="score" fill="#1b9aaa" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SectionScoreChart;
