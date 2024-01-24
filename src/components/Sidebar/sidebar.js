import '../Sidebar/sidebar.css';
import { NavLink } from "react-router-dom";
import { useState } from 'react';

export default function Sidebar()
{
    //
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {setIsCollapsed(!isCollapsed);};

    return (
        <div>
          <button onClick={toggleSidebar} className="toggle-button">Some icon</button>
          <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
            <div className='content'>
              {/* TODO Display user's profile */}
              <div className='user'>
                <p>Username</p>
              </div>
              <nav className="links">
                <ul>
                  <li>
                    <NavLink exact to="/"><span>Dashboard</span></NavLink>
                  </li>
                  {/* TODO create new product */}
                  <li>
                    <NavLink to="/create"><span>Create new product</span></NavLink>
                  </li>
                  {/* TODO view history */}
                  <li>
                    <NavLink to="/history"><span>Transaction History</span></NavLink>
                  </li>

                </ul>
              </nav>
            </div>
          </div>
        </div>
      );
}