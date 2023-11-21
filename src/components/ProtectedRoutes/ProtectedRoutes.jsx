import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Swal from 'sweetalert2';

const ProtectedRoutes = ({ }) => {
    if (!localStorage.getItem('token')) {
        Swal.fire({
            title: 'Debes Inciar sesion',
            icon: 'error'
        })
        return <Navigate to={'/'} />;
    }
    return <div><Outlet /></div>;
};

export default ProtectedRoutes

