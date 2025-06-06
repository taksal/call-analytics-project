import React from 'react';

function ScoreCards({ data }) {
  if (!data) return null;

  return (
    <div className="scorecards-container">
      <div className="scorecard">
        <h3>Total Calls</h3>
        <p className="score">{data.total_calls}</p>
      </div>
      <div className="scorecard">
        <h3>Total Cost</h3>
        <p className="score">${data.total_cost.toFixed(2)}</p>
      </div>
      <div className="scorecard">
        <h3>Average Cost / Call</h3>
        <p className="score">${data.average_cost_per_call.toFixed(2)}</p>
      </div>
    </div>
  );
}

export default ScoreCards;