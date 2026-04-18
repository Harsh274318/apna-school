// src/routes/ProtectedRoute.jsx

import React, { useContext } from 'react'
import Context from '../components/context/context'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ allowRole, children }) => {
    const { token } = useContext(Context)
    const user = JSON.parse(localStorage.getItem("user"))

    if (!token) return <Navigate to="/login" />;
    if (user?.role !== allowRole) return <Navigate to="/" />;

    return children;
}

export default ProtectedRoute