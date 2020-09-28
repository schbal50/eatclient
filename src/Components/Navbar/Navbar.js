import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';
import leves from '../../pics/leves.jpg';
import logo from '../../pics/logo.png';
import './Navbar.css'


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

    function navBarActivate() {
        const burger = document.querySelector(".burger");
        const nav = document.querySelector(".nav-links");
        const navLinks = document.querySelectorAll('.nav-links li');

        nav.classList.toggle('nav-active')

        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            }
            else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`
            }
        })
        // Burger animation
        burger.classList.toggle('toogle');
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
                <Link to="/login">
                    <li onClick={onClickLogoutHandler}>
                        Logout
                    </li>
                </Link>
            </>
        )
    }


    return (
        <nav>
            <div className="logo">
                <img src={logo} className="logoImg" alt="Responsive image"/>
            </div>
            <ul className="nav-links nav-active">
                {!isAuthenticated ? unauthenticatedNavbar() : authenticatedNavbar()}
            </ul>
            <div className="burger" onClick={() => navBarActivate()}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
            </div>
        </nav>
    )
}

export default Navbar
