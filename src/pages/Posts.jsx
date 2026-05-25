import React, { useContext, useEffect, useState } from "react";
import api from "../api.js"
import { toast } from "react-toastify";
import PostCard from "./PostCard.jsx";
import Loading from "../components/forms/Loading.jsx";
import Context from "../components/context/Context.jsx";
import { useNavigate } from "react-router-dom";

const categories = ["all", "study", "announcement", "news", "student", "general"];

const Posts = () => {
    const { apiData, setApiData } = useContext(Context);
    const [active, setActive] = useState("all");
    const navigate = useNavigate()
    useEffect(() => {
        setApiData(prev => ({ ...prev, loading: true }));
        api.get("/social/posts")
            .then(res => {
                setApiData(prev => ({
                    ...prev,
                    loading: false,
                    posts: res.data.data.reverse()
                }));
            })
            .catch(err => {
                setApiData(prev => ({ ...prev, loading: false }));
                if (err?.response?.status === 401) {
                    localStorage.removeItem("token");

                    toast.error("login again");
                    navigate("/login");
                    return;
                }
                toast.error(err?.response?.data?.err || "Something is wrong");
            });
    }, []);

    const filtered = active === "all"
        ? apiData.posts
        : apiData.posts?.filter(p => p.category === active);

    return (
        <>
            {apiData.loading && <Loading />}

            <div className="filter-pills">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-pill ${active === cat ? "filter-pill-active" : ""}`}
                        onClick={() => setActive(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="posts-container">
                {filtered?.length > 0
                    ? filtered.map(item => (
                        <PostCard key={item._id} item={item} />
                    ))
                    : <p className="no-posts">No posts in this category</p>
                }
            </div>
        </>
    );
};

export default Posts;