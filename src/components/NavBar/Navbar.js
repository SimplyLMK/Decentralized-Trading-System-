import '../NavBar/navbar.css'
import { Link } from 'react-router-dom';
import { TransactionsContext } from '../../context/TransContext';
import { useContext } from 'react';

import Placeholder from '../../images/yoimi.png'


//__writen by 104179506__Le Minh Kha
// IS a navbar,it is straightfoward so i believe no explanation is needed
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
                    <Link className="nav-elements" to="/"><span>Home</span></Link>
                </li>
                <li>
                    <Link className="nav-elements" to="/dashboard"><span>Dashboard</span></Link>
                </li>
                <li>
                    <Link className="nav-elements" to="/create"><span>Create</span></Link>
                </li>
                
                <li>
                    <Link className="nav-elements" to="/history"><span>History</span></Link>
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