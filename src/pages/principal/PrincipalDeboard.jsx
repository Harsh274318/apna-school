// src/pages/principal/PrincipalDeboard.jsx

import React, { useContext, useState } from "react";
import Context from "../../components/context/Context.jsx";
import { Outlet, useNavigate } from "react-router-dom";
import { FaBars, FaPlus } from "react-icons/fa";
import LogOut from "../../layout/LogOut.jsx";

const PrincipalDesboard = () => {
    const data = useContext(Context);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [localData] = useState(() => JSON.parse(localStorage.getItem("user")));

    return (
        <div className="main_layout">
            <div className="desboards">
                <img
                    src={localData?.url}
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

            {/* ── Navigation Buttons ── */}
            <div className={`comman-nav-btns ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
                <button onClick={() => { navigate("/"); setOpen(!open) }}>Home</button>
                <button onClick={() => { navigate("/principal"); setOpen(!open) }}>My Teacher</button>
                <button onClick={() => { navigate("/principal/create-teacher"); setOpen(!open) }}>
                    Add Teacher
                </button>
                <button onClick={() => { navigate("/principal/view-student"); setOpen(!open) }}>
                    View Students
                </button>
                <button onClick={() => { navigate("/principal/view-homework"); setOpen(!open) }}>
                    Homework/Session
                </button>
                <button onClick={() => { navigate("/principal/view-post"); setOpen(!open) }}>
                    Posts
                </button>
                <button onClick={() => { navigate("/principal/update-password"); setOpen(!open) }}>
                    Update Password
                </button>
                <LogOut />
            </div>

            <Outlet />
        </div>
    );
};

export default PrincipalDesboard;