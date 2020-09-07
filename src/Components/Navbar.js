import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';



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
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/login">
                    <li className="nav-item nav-link">
                        Login
                    </li>
                </Link>
                <Link to="/register">
                    <li className="nav-item nav-link">
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
                    <li className="nav-item nav-link">
                        Home
                    </li>
                </Link>
                <Link to="/menus">
                    <li className="nav-item nav-link">
                        Menu
                    </li>
                </Link>
                {
                    user.is_staff  ?
                        <Link to="/admin">
                            <li className="nav-item nav-link">
                                Admin
                        </li>
                        </Link> : null
                }
                <button type="button" className="btn btn-link nav-item nav-link" onClick={onClickLogoutHandler}>Logout</button>
            </>
        )
    }


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/">
                <div className="navbar-brand">EatLap</div>
            </Link>
            <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                    {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
