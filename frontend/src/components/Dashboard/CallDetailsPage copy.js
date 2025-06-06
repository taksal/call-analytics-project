// frontend/src/components/CallDetailsPage/CallDetailsPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/CallTable.css'; // Assuming you have a CallTable.css for styling
import '../../assets/styles/Dashboard.css'; // For common styles like .dashboard-content

function CallDetailsPage() {
  const [callData, setCallData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/api/calls/');
        setCallData(response.data);
      } catch (err) {
        console.error("Error fetching call details:", err);
        setError("Failed to load call details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCallDetails();
  }, []);

  if (loading) {
    return <div className="dashboard-content">Loading call details...</div>;
  }

  if (error) {
    return <div className="dashboard-content" style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <div className="dashboard-content">
      <h2>All Call Details</h2>
      <div className="call-table-container">
        {callData.length > 0 ? (
          <table className="call-table">
            <thead>
              <tr>
                <th>Call ID</th>
                <th>Call Time</th>
                <th>Duration</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {callData.map((call) => (
                <tr key={call.call_id}>
                  <td>{call.call_id}</td>
                  <td>{new Date(call.call_time).toLocaleString()}</td>
                  <td>{call.duration_seconds} sec</td>
                  <td>${call.cost}</td>
                  <td>{call.status}</td>
                  <td>{call.summary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No call data available.</p>
        )}
      </div>
    </div>
  );
}

export default CallDetailsPage;