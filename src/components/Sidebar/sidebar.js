import '../Sidebar/sidebar.css';
import { NavLink } from "react-router-dom";
import { useState } from 'react';
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransContext';

export default function Sidebar()
{
    //
    const { account } = useContext(TransactionsContext);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const toggleSidebar = () => {setIsCollapsed(!isCollapsed);};

    return (
        <div>
          
          <div className="sidebar">
            <div className='content'>
              {/* TODO Display user's profile */}
              <div className='user'>
                <p>My Wallet:</p>
                <p style={{ fontSize: '50%', fontStretch: 'condensed' }}> {account}</p>
              </div>
              <nav className="links">
                <ul>
                  <li>
                    <NavLink exact to="/dashboard"><span>Dashboard</span></NavLink>
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