import React from 'react';

function Settings() {
  return (
    <div className="settings-container">
      <h2>Settings Page</h2>
      <p>This is a placeholder for your application settings.</p>
      <p>In a real application, you'd have options to configure user preferences, API keys, etc.</p>
      <div style={{marginTop: '20px', padding: '15px', backgroundColor: '#e0f7fa', borderRadius: '8px'}}>
        <p>Example Setting:</p>
        <label htmlFor="theme-select">Theme:</label>
        <select id="theme-select" style={{marginLeft: '10px', padding: '5px'}}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
        <p style={{marginTop: '10px'}}> (Currently, this doesn't change anything visually, but shows the concept.)</p>
      </div>
    </div>
  );
}

export default Settings;