const StatsCard = ({ label, value }) => (
  <div className="card stat-card">
    <h5>{label}</h5>
    <p>{value}</p>
  </div>
);

export default StatsCard;
