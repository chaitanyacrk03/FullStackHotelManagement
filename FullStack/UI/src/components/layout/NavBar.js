import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from '../auth/Logout'
import { AuthContext } from '../auth/AuthProvider'
const NavBar = () => {
    const [showAccount,setShowAccount]=useState(false)
    function handleAccountClick(){
        setShowAccount((prevValue)=>!prevValue)
    }
    const {user}= useContext(AuthContext)
    const isLoggedIn= user!=null
    const userRole = localStorage.getItem("userRole")
  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
        <div className='container-fluid'>
            <Link to={"/"}>
            <i>
            <h3 className='hotel-color'>
                Infinity Hotel
            </h3>
                </i>
            </Link>
            <button className='navbar-toggler'
            type='button'
            data-bs-toggle="collapse"
            data-bs-target="#navbarScroll"
            aria-controls='navbarScroll'
            aria-expanded="false"
            aria-label='Toggle navigation'>
                <span className='navbar-toggler-icon'>
                </span>
            </button>
            <div className='collapse navbar-collapse' id='navbarScroll'>
                <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll'>
                    <li className='nav-item'>
                        <NavLink className="nav-link" aria-current="page" to={"/browse-all-rooms"}>
                        Book-Room
                        </NavLink>
                    </li>
                    {isLoggedIn && userRole.includes("ROLE_ADMIN") && (<li className='nav-item'>
                        <NavLink className="nav-link" aria-current="page" to={"/admin"}>
                        Admin
                        </NavLink>
                    </li>)}
                </ul>
                <ul className='d-flex navbar-nav'>
                    <li className='nav-item'>
                        <NavLink className='nav-link' to={"/find-booking"}>
                            Find My Booking
                        </NavLink>
                    </li>
                    {/* <div className="dropdown">
                    <a 
                    className={`btn btn-secondary dropdown-toggle ${showAccount ? "show" : ""}`}
                    href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"
                    onClick={handleAccountClick}>Account
                    </a>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li>
                                <Link to={"/login"} className={`dropdown-item ${showAccount ? "show" : ""}`}> Login
                                </Link>
                            </li>
                            <li>
                                <Link to={"/profile"} className={`dropdown-item ${showAccount ? "show" : ""}`}> Profile
                                </Link>
                            </li>
                            <li>
                                <Link to={"/logout"} className={`dropdown-item ${showAccount ? "show" : ""}`}> Logout
                                </Link>
                            </li>
                        </ul>
                    </div> */}
                    {/* //------------------------------------------------------------------------------------ */}
                    <li className='nav-item dropdown'>
                        <a 
                        className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                        href='#'
                        role='button'
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        onClick={handleAccountClick}>
                            {" "} Account
                        </a>
                        <ul className={`dropdown-menu ${showAccount ? "show" : ""}`} aria-labelledby='navbarDropdown'>
                            {!isLoggedIn && (<li>
                                <Link to={"/login"} className={`dropdown-item ${showAccount ? "show" : ""}`}> Login
                                </Link>
                            </li>)}
                            {
                                isLoggedIn && (
                            <li>
                                <Logout />
                            </li>
                                )
                            }
                            
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default NavBar