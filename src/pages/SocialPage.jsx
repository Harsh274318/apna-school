import React, { useState } from "react";
import CreatePost from "./CreatePost.jsx";
import Posts from "./Posts.jsx";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
const SocialPage = () => {
    const [flag, setFlag] = useState(true)
    return (
        <div className="social-page">
            <div style={flag ? { display: "none" } : { display: "flex" }}>
                <CreatePost />
            </div>
            <button style={btnStyle} onClick={() => setFlag(!flag)}>{flag ? "Create Post" : "Hide card"}{flag ? < BiDownArrowAlt /> : <BiUpArrowAlt />}</button>
            <Posts />
        </div>
    );
};

export default SocialPage;

const btnStyle = {
    maxWidth: "420px",
    width: "100%",
    background: "linear-gradient(135deg, #4f46e5, #6366f1)",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "10px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
    fontWeight: "500",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.25s ease",
    marginBottom: " 10px"
};