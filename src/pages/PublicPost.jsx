import React, { useContext, useEffect, useRef, useState } from "react";
import api from "../api.js"
import { toast } from "react-toastify";
import Context from "../components/context/Context.jsx";
import capitalize from "../components/utils/capitalize.js"
import Loading from "../components/forms/Loading.jsx";
import Navbar from "../layout/Navbar.jsx";
const categoryColors = {
    background: "#FAEEDA", color: "#633806",
};

const PublicPost = () => {
    const commentRef = useRef();
    const [openCommentId, setOpenCommentId] = useState(null);
    // const [item, setItem] = useState(null)
    // const [liked, setLiked] = useState(item?.likes?.includes(user.id));
    // const [likesCount, setLikesCount] = useState(item?.likes?.length);
    // const [comments, setComments] = useState(item?.comments || []);
    const badge = categoryColors
    const { apiData, setApiData } = useContext(Context)
    // const 


    const formatText = (text) => {
        return text.replace(
            /(https?:\/\/[^\s]+)/g,
            '<a class="ancer" href="$1" target="_blank">$1</a>'
        );
    };
    useEffect(() => {
        setApiData(prev => ({
            ...prev, loading: true
        }))
        api.get("/social/publicPost")
            .then(res => {
                setApiData(prev => ({
                    ...prev,
                    posts: res.data.data.reverse(),
                    loading: false
                }))
                console.log(res.data.data)
                // setItem(res.data.data.reverse())
                if (apiData.posts.length !== 0) {
                    return toast.success("All post Found")
                }
                else {
                    return toast.success("No public post found")
                }
            })
            .catch(err => {
                setApiData(prev => ({
                    prev, loading: false
                }))
                toast.error(err?.response?.data?.err||"Post not Found")
            })


    }, [])
    function handleLike(e) {
        e.preventDefault();
        return toast.warning("Login First")
    }

    function handleComment(e) {
        e.preventDefault();
        return toast.warning("Login First")
    }

    return (
        <>
            <Navbar />
            {apiData.loading && <Loading />}
            <div className="posts-container public-post" >


                {!apiData.loading && apiData.posts && apiData?.posts.map(item => (<div key={item._id} className="post-card" >
                    <div className="post-header">
                        <div className="post-author">
                            <div className="post-avatar">
                                <img src={item?.userUrl || "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775638071/zgvl1ydotjed2eamz7ig.png"} alt={item.name} />
                            </div>
                            <div>
                                <p className="post-author-name">{capitalize(item.name)}</p>
                                <p className="post-date">{item.email}</p>
                                <p className="post-date">
                                    {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                        day: "2-digit", month: "short", year: "numeric"
                                    })}
                                </p>
                            </div>
                        </div>
                        <div style={{ display: "flex" }}>

                            <span className="post-badge"
                                style={categoryColors}>
                                {item.category}
                            </span>

                        </div>
                    </div>

                    <div className="post-body">
                        <p className="post-title">{item.title}</p>
                        <p className="post-desc" dangerouslySetInnerHTML={{ __html: formatText(item.description) }} />
                        {item.imageurl && (
                            <div className="post-image">
                                <img src={item.imageurl} alt="post" />
                            </div>
                        )}
                    </div>

                    <div className="post-actions">
                        <button className={`action-btn ${item.likes ? "" : "liked"}`} onClick={handleLike}>
                            <svg width="16" height="16" viewBox="0 0 24 24"
                                fill={item?.likes ? "none" : ""}
                                stroke={item?.likes ? "currentColor" : ""}
                                strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            {item?.likes.length} likes
                        </button>
                        <button className="action-btn" onClick={() => setOpenCommentId(openCommentId === item._id ? null : item._id)}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {item?.comments?.length} comments
                        </button>
                    </div>

                    {
                        openCommentId === item._id && (
                            <div className="comments-section">
                                {item?.comments.length === 0 && (
                                    <p className="no-comments">No comments yet — be the first!</p>
                                )}
                                {item?.comments.map(c => (

                                    <div key={c._id} className="comment-item">
                                        <div className="comment-avatar">
                                            <img src={c.url || "https://i.pravatar.cc/100"} alt={c.user} />
                                        </div>
                                        <div className="comment-bubble">
                                            <p className="comment-user">{capitalize(c.user)}</p>
                                            <p className="comment-msg">{c.message}</p>
                                        </div>

                                    </div>
                                ))}

                            </div>
                        )
                    }
                </div >)) || <p>No Public post found !</p>}
            </div>
        </>
    );
};

export default PublicPost;