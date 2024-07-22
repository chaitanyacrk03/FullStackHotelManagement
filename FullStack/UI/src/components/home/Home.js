import React from 'react'
import AddRoom from '../room/AddRoom'
import NavBar from '../layout/NavBar'
import { Outlet } from 'react-router-dom'
const Home = () => {
  return (
    <>
    <NavBar />
    <Outlet />
    </>
  )
}

export default Home