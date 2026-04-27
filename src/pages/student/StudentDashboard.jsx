// src/pages/student/StudentDashboard.jsx

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import LogOut from "../../layout/LogOut.jsx";

const StudentDashboard = () => {
    const navigate = useNavigate();
    const [localData] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [open, setOpen] = useState(false);
    return (
        <div className="main_layout">
            <div className="desboards">
                <img
                    src={localData?.url || "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775665639/j4sdltuncr8gavw741mb.png"}
                    alt={localData.public_id}
                />
                <h1>Welcome Back, {localData?.name || "Loading..."}</h1>
                <p>Role: {localData?.role || "Loading..."}</p>
                <div className="top-bar">
                    <button className="hamburger" onClick={() => setOpen(!open)}>
                        <FaBars />
                    </button>

                </div>

            </div>

            <div className={`comman-nav-btns ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
                <button onClick={() => { navigate("/"); setOpen(!open) }}>Home</button>
                <button onClick={() => { navigate("/student"); setOpen(!open) }}>Attendance</button>
                <button onClick={() => { navigate("homework"); setOpen(!open) }}>View Homework</button>
                <button onClick={() => { navigate("social"); setOpen(!open) }}>posts</button>

                <button onClick={() => { navigate("update-password"); setOpen(!open) }}>Update Password</button>
                <LogOut />
            </div>
            <Outlet />
        </div>
    );
};

export default StudentDashboard;