import React, { useContext, useEffect, useState } from "react";
import api from "../api.js"
import { toast } from "react-toastify";
import PostCard from "./PostCard.jsx";
import Loading from "../components/forms/Loading.jsx";
import Context from "../components/context/Context.jsx";

const categories = ["all", "study", "announcement", "news", "student", "general"];

const Posts = () => {
    const { apiData, setApiData } = useContext(Context);
    const [active, setActive] = useState("all");

    useEffect(() => {
        setApiData(prev => ({ ...prev, loading: true }));
        api.get("/social/posts")
            .then(res => {
                setApiData(prev => ({
                    ...prev,
                    loading: false,
                    data: res.data.data.reverse()
                }));
            })
            .catch(err => {
                setApiData(prev => ({ ...prev, loading: false }));
                toast.error(err?.message || "Something is wrong");
            });
    }, []);

    const filtered = active === "all"
        ? apiData.data
        : apiData.data?.filter(p => p.category === active);

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