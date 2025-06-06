import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import '../../assets/styles/Navbar.css';


function Navbar({ onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="\logo.png" alt="Company Logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
        <div className="navbar-profile-dropdown" ref={dropdownRef}>
          <div className="navbar-profile" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faUserCircle} className="profile-icon" />
            <span className="profile-name">Admin User</span>
            <FontAwesomeIcon icon={faSignOutAlt} className={`dropdown-caret ${isDropdownOpen ? 'open' : ''}`} />
          </div>

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
