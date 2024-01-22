import '../NavBar/navbar.css'
import { Link } from 'react-router-dom';

export default function NavBar()
{

    return (
        <div className = "navbar">
            <ul>
                <li> <Link to = "/Login">Log in</Link></li>
                <li> <Link to = "/Signup">Sign up</Link></li>
                <button> Log out </button>
            </ul>
        </div>
    )
}