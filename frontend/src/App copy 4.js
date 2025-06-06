import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './assets/styles/App.css';
import './assets/styles/CallTable.css';
import './assets/styles/Charts.css';
import './assets/styles/Dashboard.css';
import './assets/styles/Header.css';
import './assets/styles/LoadingSpinner.css';
import './assets/styles/LoginPage.css';
import './assets/styles/Navbar.css';
import './assets/styles/Popup.css';
import './assets/styles/ScoreCards.css';
import './assets/styles/Sidebar.css';

import CallDetailsPage from './components/Dashboard/CallDetailsPage';
import Dashboard from './components/Dashboard/Dashboard';
import LoadingSpinner from './components/Common/LoadingSpinner';
import LoginPage from './components/Auth/LoginPage';
import Navbar from './components/Common/Navbar';
import Sidebar from './components/Common/Sidebar';
import { fetchAllCalls } from './api/fetchAPI';


const generateDummyCallData = (num_records = 100) => {
  let data = fetchAllCalls();
  console.log(data);
  data = [];
  const baseTime = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000); // 30 days ago
  for (let i = 0; i < num_records; i++) {
    const call_id = `CALL-${String(i + 1).padStart(5, '0')}`;
    const call_time = new Date(baseTime.getTime() + i * 10 * 60 * 1000 + Math.random() * 60 * 60 * 1000);
    const duration_seconds = Math.floor(Math.random() * (600 - 30 + 1)) + 30; // 30s to 10 mins
    const call_end_time = new Date(call_time.getTime() + duration_seconds * 1000);
    const cost = parseFloat((Math.random() * (5.00 - 0.05) + 0.05).toFixed(2));
    const status = Math.random() < 0.5 ? 'answered' : 'failed';// 70% answered, 30% failed
    const summary = `Summary for call ${call_id}: This was a ${status} call lasting ${duration_seconds} seconds.`;

    data.push({
      call_id,
      call_time: call_time.toISOString(),
      call_end_time: call_end_time.toISOString(),
      duration_seconds,
      cost,
      status,
      summary,
    });
  }
  return data;
};

const getSummaryData = (calls) => {
  const total_calls = calls.length;
  const total_cost = calls.reduce((sum, call) => sum + call.cost, 0);
  const answered_calls = calls.filter(call => call.status === 'answered').length;
  const failed_calls = calls.filter(call => call.status === 'failed').length;
  const Transferd_Calls = calls.filter(call => call.status === 'transfered').length;


  const average_cost_per_call = total_calls > 0 ? total_cost / total_calls : 0;

  // Calculate call trend (daily counts)
  const callTrendMap = new Map();
  calls.forEach(call => {
    const date = new Date(call.call_time).toISOString().split('T')[0]; //YYYY-MM-DD
    callTrendMap.set(date, (callTrendMap.get(date) || 0) + 1);
  });

  const call_trend = Array.from(callTrendMap.entries()).map(([date, count]) => ({
    date,
    count,
  }));

  return {
    total_calls,
    total_cost: parseFloat(total_cost.toFixed(2)),
    average_cost_per_call: parseFloat(average_cost_per_call.toFixed(2)),
    answered_calls,
    failed_calls,
    call_trend,
    Transferd_Calls,
  };
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [callData, setCallData] = useState([]);
  const [summaryData, setSummaryData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      setTimeout(() => {
        const dummyCalls = generateDummyCallData(200);
        setCallData(dummyCalls);
        setSummaryData(getSummaryData(dummyCalls));
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  if (loading && isLoggedIn) {
    return (
      <Router>
        <div className="app-container">
          <div className="main-content">
            <LoadingSpinner />
          </div>
        </div>
      </Router>
    );
  }

  return (
    <Router>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="App">
          <Sidebar />
          <div className={`main-content ${isLoggedIn ? 'main-content-shifted' : ''}`}>
            <Navbar onLogout={handleLogout} />
            <Routes>
              <Route path="/" element={<Dashboard summaryData={summaryData} callData={callData} />} />
              <Route path="/dashboard" element={<Dashboard summaryData={summaryData} callData={callData} />} />
              <Route path="/call-details" element={<CallDetailsPage callData={callData} />} />
              {/* Catch-all route to redirect to dashboard if logged in but path is unknown */}
              <Route path="*" element={<Dashboard summaryData={summaryData} callData={callData} />} />
            </Routes>
          </div>
        </div>
      )}
    </Router>
  );




  
}

export default App;
