// frontend/src/components/Common/Navbar.js

import React, { useState, useEffect, useRef } from 'react'; // Import useState, useEffect, useRef
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import '../../assets/styles/Navbar.css'; // Link to Navbar specific CSS

function Navbar({ onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown container

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    // Add event listener when component mounts
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]); // Re-run effect if dropdownRef changes (unlikely)

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown state
  };

  const handleLogoutClick = () => {
    onLogout(); // Call the logout function passed from App.js
    setIsDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">Call Analytics</span>
      </div>
      <div className="navbar-right">
        {/* User Profile Icon and Dropdown Container */}
        <div className="navbar-profile-dropdown" ref={dropdownRef}> {/* Attach ref here */}
          <div className="navbar-profile" onClick={toggleDropdown}> {/* Make profile clickable */}
            <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
            <span className="profile-name">Admin User</span>
            {/* Optional: Add a caret icon to indicate dropdown */}
            <FontAwesomeIcon icon={faSignOutAlt} className={`dropdown-caret ${isDropdownOpen ? 'open' : ''}`} />
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogoutClick} className="dropdown-item logout-button">
                <FontAwesomeIcon icon={faSignOutAlt} className="logout-icon" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
