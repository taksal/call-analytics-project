import React from 'react';

import CallStatusPieChart from './CallStatusPieChart';
import CallTable from './CallTable';
import CallTrendGraph from './CallTrendGraph';
import ScoreCards from './ScoreCards';

function Dashboard({ summaryData, callData }) {
  if (!summaryData || !callData) {
    return <div>Error: Data not available.</div>;
  }

  return (
    <div className="dashboard-grid">
      <ScoreCards data={summaryData} />

      <div className="charts-row">
        <CallStatusPieChart data={summaryData} />
        <CallTrendGraph data={summaryData?.call_trend || []} />
      </div>

      <CallTable callData={callData} isDashboard={true} />
    </div>
  );
}

export default Dashboard;