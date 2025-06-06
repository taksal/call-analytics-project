import React from 'react';

import CallTable from './CallTable';


function CallDetailsPage({ callData }) {
  return (
    <div className="dashboard-grid">
      <CallTable callData={callData} />
    </div>
  );
}

export default CallDetailsPage;