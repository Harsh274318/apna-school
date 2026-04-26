import React, { useState } from "react";
import CreatePost from "./CreatePost.jsx";
import Posts from "./Posts.jsx";
import { BiDownArrowAlt, BiUpArrowAlt } from "react-icons/bi";
const SocialPage = () => {
    const [flag, setFlag] = useState(false)
    return (
        <div className="social-page">
            <div>

                <div style={flag ? { display: "none" } : { display: "flex" }}>
                    <CreatePost />
                </div>
                <button className="show_CreatePost" onClick={() => setFlag(!flag)}>{flag ? "Create Post" : "Hide card"}{flag ? < BiDownArrowAlt /> : <BiUpArrowAlt />}</button>
            </div>
            <div className="all_posts">
                <Posts />
            </div>
        </div>
    );
};

export default SocialPage;
