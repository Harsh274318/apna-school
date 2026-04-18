import React, { useContext, useRef, useState } from "react";
import api from "../api.js"
import { toast } from "react-toastify";
import Context from "../components/context/Context.jsx";

const categoryColors = {
    announcement: { bg: "#EEEDFE", color: "#3C3489" },
    study: { bg: "#E1F5EE", color: "#085041" },
    news: { bg: "#FAEEDA", color: "#633806" },
    general: { bg: "#F1EFE8", color: "#444441" },
    student: { bg: "#E6F1FB", color: "#0C447C" },
};

const PostCard = ({ item }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const commentRef = useRef();
    const [showComments, setShowComments] = useState(false);
    const [liked, setLiked] = useState(item.likes.includes(user.id));
    const [likesCount, setLikesCount] = useState(item.likes.length);
    const [comments, setComments] = useState(item.comments || []);
    const badge = categoryColors[item.category] || categoryColors.general;
    const { apiData, setApiData } = useContext(Context)

    function handleLike() {
        api.patch(`/social/post/${item._id}/like`)
            .then(() => {
                setLiked(prev => !prev);
                setLikesCount(prev => liked ? prev - 1 : prev + 1);
            })
            .catch(err => toast.error(err?.message || "Something is wrong"));
    }

    function handleComment(e) {
        e.preventDefault();
        if (!commentRef.current.value.trim()) return toast.error("Write a comment");
        api.post(`/social/post/${item._id}/comment`, {
            message: commentRef.current.value.trim(),
            userUrl: user.url
        })
            .then(res => {
                const updated = res.data.data;
                if (Array.isArray(updated)) setComments(updated);
                commentRef.current.value = "";
                toast.success("Comment added");
            })
            .catch(err => toast.error(err?.message || "Something is wrong"));
    }
    function handleDeletePost() {
        api.delete(`/social/post/${item._id}`)
            .then(() => {
                toast.success("Post deleted");
                // posts list se remove karo
                setApiData(prev => ({
                    ...prev,
                    posts: prev.posts.filter(p => p._id !== item._id)
                }))
            })
            .catch(err => toast.error(err?.message || "Something is wrong"));
    }
    function handleDeleteComment(commentId) {
        api.delete(`/social/post/${item._id}/${commentId}/comment`)
            .then(() => {
                setComments(prev => prev.filter(c => c._id.toString() !== commentId.toString()));
                toast.success("Comment deleted");
            })
            .catch(err => toast.error(err?.message || "Something is wrong"));
    }
    return (
        <div className="post-card">
            <div className="post-header">
                <div className="post-author">
                    <div className="post-avatar">
                        <img src={item?.userUrl || "https://res.cloudinary.com/harsh-vardhan-pal/image/upload/v1775638071/zgvl1ydotjed2eamz7ig.png"} alt={item.name} />
                    </div>
                    <div>
                        <p className="post-author-name">{item.name}</p>
                        <p className="post-date">{item.email}</p>
                        <p className="post-date">
                            {new Date(item.createdAt).toLocaleDateString("en-IN", {
                                day: "2-digit", month: "short", year: "numeric"
                            })}
                        </p>
                    </div>
                </div>
                <div style={{ display: "flex" }}>

                    <span className="post-badge" style={{ background: badge.bg, color: badge.color }}>
                        {item.category}
                    </span>
                    {item.userId?.toString() === user.id?.toString() && (
                        <button className="post-delete-btn" onClick={handleDeletePost}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14H6L5 6" />
                                <path d="M10 11v6M14 11v6" />
                                <path d="M9 6V4h6v2" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="post-body">
                <p className="post-title">{item.title}</p>
                <p className="post-desc">{item.description}</p>
                {item.url && (
                    <div className="post-image">
                        <img src={item.url} alt="post" />
                    </div>
                )}
            </div>

            <div className="post-actions">
                <button className={`action-btn ${liked ? "liked" : ""}`} onClick={handleLike}>
                    <svg width="16" height="16" viewBox="0 0 24 24"
                        fill={liked ? "#E24B4A" : "none"}
                        stroke={liked ? "#E24B4A" : "currentColor"}
                        strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    {likesCount} likes
                </button>
                <button className="action-btn" onClick={() => setShowComments(!showComments)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    {comments?.length} comments
                </button>
            </div>

            {showComments && (
                <div className="comments-section">
                    {comments.length === 0 && (
                        <p className="no-comments">No comments yet — be the first!</p>
                    )}
                    {comments.map(c => (

                        <div key={c._id} className="comment-item">
                            <div className="comment-avatar">
                                <img src={c.url || "https://i.pravatar.cc/100"} alt={c.user} />
                            </div>
                            <div className="comment-bubble">
                                <p className="comment-user">{c.user}</p>
                                <p className="comment-msg">{c.message}</p>
                            </div>
                            {c.userId?.toString() === user.id?.toString() && <div>
                                <button className="comment-delete-btn" onClick={() => handleDeleteComment(c._id)}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="3 6 5 6 21 6" />
                                        <path d="M19 6l-1 14H6L5 6" />
                                        <path d="M10 11v6M14 11v6" />
                                        <path d="M9 6V4h6v2" />
                                    </svg>
                                </button>
                            </div>}
                        </div>
                    ))}
                    <div className="comment-input-row">
                        <input
                            type="text"
                            ref={commentRef}
                            placeholder="Write a comment..."
                        />
                        <button onClick={handleComment}>Send</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostCard;