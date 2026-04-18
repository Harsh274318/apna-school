import React from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


function LogOut() {
    const navigate = useNavigate()
    function handelLogOut(e) {
        e.preventDefault();
        localStorage.removeItem("user");
        localStorage.removeItem("token")
        navigate("/")
        return toast.success("Log out ")
    }

    return (
        <>
            <button type='button' className="logout-btn" onClick={handelLogOut}>
                Log out
            </button>
        </>
    )
}

export default LogOut