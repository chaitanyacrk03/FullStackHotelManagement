import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth= useContext(AuthContext)
    const navigate= useNavigate()
    const handleLogout=()=>{
        auth.handleLogout()
        navigate("/",{state:{message: "You have been logged out"}})
    }
    const isLogin = auth.user !=null
  return isLogin? (
    <>
    <li>
    <button className='dropdown-item' onClick={handleLogout}>
        Logout
    </button>
    </li>
    <li>
        <Link to={"/profile"} className={`dropdown-item ${isLogin ? "show" : ""}`}> Profile
        </Link>
    </li>
    </>
  ):null
}

export default Logout