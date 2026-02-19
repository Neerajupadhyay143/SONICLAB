import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from "../Pages/Dashboard/Navbar.jsx"
function DashboardLayout() {
    return (
        <div className='bg-black h-lvh'>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default DashboardLayout
