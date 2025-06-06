import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Popup from '../Common/Popup';


function CallTable({ callData, isDashboard=false }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const dataToProcess = isDashboard ? callData.slice(0, 10) : callData;

  const navigate = useNavigate();

  const handleRowClick = (call) => {
    setSelectedCall(call);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedCall(null);
  };

  const handleShowMoreCallDetails = () => {
    navigate('/call-details', { state: { callData } });
  };

  return (
    <div className="call-table-section">
      <h3>Incoming Call IDs</h3>
      <div className="call-table-container">
        <table>
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Status</th>
              <th>Cost</th>
              <th>Duration (s)</th>
            </tr>
          </thead>
          <tbody>
            {dataToProcess.map((call) => (
              <tr key={call.call_id} onClick={() => handleRowClick(call)} className="call-table-row-clickable">
                <td>{call.call_id}</td>
                <td className={call.status === 'answered' ? 'status-answered' : 'status-failed'}>
                  {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                </td>
                <td>${call.cost.toFixed(2)}</td>
                <td>{call.duration_seconds}</td>
              </tr>
            ))}
            {dataToProcess.length === 0 && (
              <tr>
                <td colSpan="4">No call data available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {isDashboard && (
        <div className="call-table-button-container">
          <button type="submit" className="call-table-button" onClick={handleShowMoreCallDetails}>
            Show All Calls
          </button>
        </div>
      )}

      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} title={`Details for Call ID: ${selectedCall?.call_id}`}>
        {selectedCall && (
          <div className="call-details-popup-content">
            <p><strong>Call ID:</strong> {selectedCall.call_id}</p>
            <p><strong>Call Start Time:</strong> {new Date(selectedCall.call_time).toLocaleString()}</p>
            <p><strong>Call End Time:</strong> {new Date(selectedCall.call_end_time).toLocaleString()}</p>
            <p><strong>Duration:</strong> {selectedCall.duration_seconds} seconds</p>
            <p><strong>Cost:</strong> ${selectedCall.cost.toFixed(2)}</p>
            <p><strong>Status:</strong> <span className={selectedCall.status === 'answered' ? 'status-answered' : 'status-failed'}>{selectedCall.status.charAt(0).toUpperCase() + selectedCall.status.slice(1)}</span></p>
            <p><strong>Summary:</strong> {selectedCall.summary || 'N/A'}</p>
          </div>
        )}
      </Popup>
    </div>
  );
}

export default CallTable;