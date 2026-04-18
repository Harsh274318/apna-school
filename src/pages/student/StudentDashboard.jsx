// src/pages/student/StudentDashboard.jsx

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import LogOut from "../../layout/LogOut.jsx";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [localData] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [open, setOpen] = useState(false);
    return (
        <>
            <div className="desboards">
                <h1>Welcome Back, {localData?.name || "Loading..."}</h1>
                <p>Role: {localData?.role || "Loading..."}</p>
                <div className="top-bar">
                    <button className="hamburger" onClick={() => setOpen(!open)}>
                        <FaBars />
                    </button>
                    <LogOut />
                </div>

            </div>

            <div className={`comman-nav-btns ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
                <button onClick={() => { navigate("/student/homework"); setOpen(!open) }}>View Homework</button>
                <button onClick={() => { navigate("/student/post"); setOpen(!open) }}>posts</button>
                <button onClick={() => { navigate("/student/Create-post"); setOpen(!open) }}>Create</button>
                <button onClick={() => { navigate("/student/update-password"); setOpen(!open) }}>Update Password</button>
            </div>
        </>
    );
};

export default StudentDashboard;