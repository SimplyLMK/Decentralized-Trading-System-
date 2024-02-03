import '../NavBar/navbar.css'
import { Link } from 'react-router-dom';
import { TransactionsContext } from '../../context/TransContext';
import { useContext } from 'react';

import Placeholder from '../../images/yoimi.png'

export default function NavBar()
{

    const { account, connectAccount } = useContext(TransactionsContext);

    return (
        <div className = "navbar">
            <ul>
            <li className="logo">
                <img src={Placeholder}  />
                <span>Coinmiya</span>
            </li>

                <li>
                    <Link to="/create"><span>Create new product</span></Link>
                  </li>
                  
                  <li>
                    <Link to="/history"><span>Transaction History</span></Link>
                  </li>

                  <li>
                  {!account && <button className="button-77" onClick={connectAccount}>Connect Wallet</button>}
                  </li>

                {/* <li> <Link to = "/Login">Log in</Link></li>
                <li> <Link to = "/Signup">Sign up</Link></li> */}
                {/* <button> Log out </button> */}
            </ul>
        </div>
    )
}