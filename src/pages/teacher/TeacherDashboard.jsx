// src/pages/teacher/TeacherDashboard.jsx

import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { Outlet, useNavigate } from "react-router-dom";
import LogOut from "../../layout/LogOut";
import capitalize from "../../components/utils/capitalize";

const TeacherDashboard = () => {
    const navigate = useNavigate();
    const [localData] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [open, setOpen] = useState(false);
    return (
        <div className="main_layout" >
            <div className="inner-layout">

                <div className="desboards">
                    <img
                        src={localData?.url || "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775665639/j4sdltuncr8gavw741mb.png"}
                        alt={localData.public_id}
                        title="Teacher's image"
                    />
                    {console.log(JSON.stringify(localData?.url))}
                    <h1>Welcome Back, {capitalize(localData?.name) || "Loading..."}</h1>
                    <p>Role: {localData?.role || "Loading..."}</p>
                    <div className="top-bar">
                        <button className="hamburger" onClick={() => setOpen(!open)}>
                            <FaBars />
                        </button>

                    </div>
                </div>

                <div className={`comman-nav-btns ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
                    <button onClick={() => { navigate("/"); setOpen(!open) }}>Home</button>
                    <button onClick={() => { navigate("/teacher"); setOpen(!open) }}>My Students</button>
                    <button onClick={() => { navigate("create-student"); setOpen(!open) }}>Create Student</button>
                    <button onClick={() => { navigate("mark-attendance"); setOpen(!open) }}>Mark Attendance</button>
                    <button onClick={() => { navigate("/teacher/add-homework"); setOpen(!open) }}>Add Homework</button>
                    <button onClick={() => { navigate("/teacher/view-homework"); setOpen(!open) }}>View Homework</button>
                    <button onClick={() => { navigate("/teacher/view-post"); setOpen(!open) }} >Social</button>
                    <button onClick={() => { navigate("/teacher/update-password"); setOpen(!open) }}>Update Password</button>
                    <LogOut />
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default TeacherDashboard;