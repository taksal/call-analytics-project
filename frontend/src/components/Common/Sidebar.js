import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPhone, faBars } from '@fortawesome/free-solid-svg-icons';


function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="hamburger-icon" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} size="lg" />
      </div>
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>Call Analytics</h3>
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/" onClick={toggleSidebar}>
              <FontAwesomeIcon icon={faHome} /> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/call-details" onClick={toggleSidebar}>   
            <FontAwesomeIcon icon={faPhone} /> Call Details
             </Link>
          </li>
        </ul>
      </div>
      {isOpen && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
}

export default Sidebar;