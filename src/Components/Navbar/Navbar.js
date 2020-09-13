import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';
import './Navbar.css';



const Navbar = props => {
    const { user, setUser, isAuthenticated, setIsAuthenticated } = useContext(AuthContext); // így érjük el a globálisan beadott stateket

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        })
    }

    const unauthenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li>
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li>
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li>
                        Register
                    </li>
                </Link>
            </>
        )
    }

    const authenticatedNavbar = () => {
        return (
            <>
                <Link to="/">
                    <li>
                        Home
                    </li>
                </Link>
                <Link to="/user">
                    <li>
                        User
                    </li>
                </Link>
                <Link to="/menus">
                    <li>
                        Menu
                    </li>
                </Link>
                {
                    user.is_staff ?
                        <Link to="/admin">
                            <li>
                                Admin
                            </li>
                        </Link> : null
                }
                <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }


    return (
        <nav>
            <Link to="/">
                <div className="EatLap">EatLap</div>
            </Link>
            <div id="navbarText">
                <ul>
                    {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
