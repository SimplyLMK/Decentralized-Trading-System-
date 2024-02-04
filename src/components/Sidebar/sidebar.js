import '../Sidebar/sidebar.css';
import { NavLink } from "react-router-dom";
import { useContext } from 'react';
import { TransactionsContext } from '../../context/TransContext';


//__writen by 104179506__Le Minh Kha
// essentially just a vertical nav bar
export default function Sidebar()
{
    // prop from transContext to show the wallet address
    const { account } = useContext(TransactionsContext);

    return (
        <div>
          
          <div className="sidebar">
            <div className='content'>
              
              <div className='user'>
                <p>My Wallet:</p>
                <p style={{ fontSize: '50%', fontStretch: 'condensed' }}> {account}</p>
              </div>
              <nav className="links">
                <ul>
                  <li>
                    <NavLink exact to="/"><span>Home page</span></NavLink>
                  </li>

                  <li>
                    <NavLink exact to="/dashboard"><span>Dashboard</span></NavLink>
                  </li>
                  
                  <li>
                    <NavLink to="/create"><span>Create new product</span></NavLink>
                  </li>
                  
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