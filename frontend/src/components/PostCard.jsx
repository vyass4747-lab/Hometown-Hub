import { useState } from "react";
import api from "../api/axios";

function PostCard({ post }) {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(post.like_count || 0);
    const [liking, setLiking] = useState(false);

    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");
    const [loadingComments, setLoadingComments] = useState(false);
    const [submittingComment, setSubmittingComment] = useState(false);

    const handleLike = async () => {
        if (liking) return;

        try {
            setLiking(true);

            const response = await api.post(`posts/${post.id}/like/`);

            setLiked(response.data.liked);
            setLikeCount(response.data.like_count);
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Could not update like."
            );
        } finally {
            setLiking(false);
        }
    };

    const loadComments = async () => {
        try {
            setLoadingComments(true);

            const response = await api.get(
                `posts/${post.id}/comments/`
            );

            setComments(response.data);
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Could not load comments."
            );
        } finally {
            setLoadingComments(false);
        }
    };

    const handleCommentsClick = () => {
        const newState = !showComments;

        setShowComments(newState);

        if (newState) {
            loadComments();
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        if (!commentText.trim() || submittingComment) {
            return;
        }

        try {
            setSubmittingComment(true);

            const response = await api.post(
                `posts/${post.id}/comments/`,
                {
                    content: commentText.trim(),
                }
            );

            setComments((prev) => [...prev, response.data]);
            setCommentText("");
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Could not add comment."
            );
        } finally {
            setSubmittingComment(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";

        return new Date(dateString).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    return (
        <article className="bg-white border border-gray-200 rounded-xl p-5">

            {/* Header */}
            <div className="flex items-start justify-between gap-4">

                <div>
                    <p className="font-medium text-[#24303A]">
                        {post.author_name}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                        {formatDate(post.created_at)}
                    </p>
                </div>

                {post.post_type === "announcement" && (
                    <span className="text-xs font-medium text-[#2F6F73] bg-[#E8F1F0] px-2.5 py-1 rounded-full">
                        Announcement
                    </span>
                )}

            </div>

            {/* Content */}
            <p className="text-sm text-gray-700 leading-relaxed mt-4 whitespace-pre-wrap">
                {post.content}
            </p>

            {/* Image */}
            {post.image && (
                <img
                    src={post.image}
                    alt="Post"
                    className="w-full max-h-96 object-cover rounded-lg mt-4"
                />
            )}

            {/* Actions */}
            <div className="flex items-center gap-5 mt-5 pt-4 border-t border-gray-100">

                <button
                    onClick={handleLike}
                    disabled={liking}
                    className={`text-sm font-medium transition ${
                        liked
                            ? "text-[#2F6F73]"
                            : "text-gray-500 hover:text-[#2F6F73]"
                    }`}
                >
                    {liked ? "Liked" : "Like"} · {likeCount}
                </button>

                <button
                    onClick={handleCommentsClick}
                    className="text-sm font-medium text-gray-500 hover:text-[#2F6F73]"
                >
                    Comments · {showComments ? comments.length : post.comment_count || 0}
                </button>

            </div>

            {/* Comments Section */}
            {showComments && (
                <div className="mt-5 pt-4 border-t border-gray-100">

                    <h3 className="text-sm font-medium text-[#24303A] mb-4">
                        Comments
                    </h3>

                    {/* Loading */}
                    {loadingComments && (
                        <p className="text-sm text-gray-400">
                            Loading comments...
                        </p>
                    )}

                    {/* Existing comments */}
                    {!loadingComments && comments.length === 0 && (
                        <p className="text-sm text-gray-400 mb-4">
                            No comments yet. Be the first to comment.
                        </p>
                    )}

                    {!loadingComments && comments.length > 0 && (
                        <div className="space-y-3 mb-4">

                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    className="bg-[#F7F8F6] rounded-lg px-4 py-3"
                                >

                                    <p className="text-sm font-medium text-[#24303A]">
                                        {comment.user_name}
                                    </p>

                                    <p className="text-sm text-gray-700 mt-1">
                                        {comment.content}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {formatDate(comment.created_at)}
                                    </p>

                                </div>
                            ))}

                        </div>
                    )}

                    {/* Add comment */}
                    <form
                        onSubmit={handleCommentSubmit}
                        className="flex gap-2"
                    >

                        <input
                            type="text"
                            value={commentText}
                            onChange={(e) =>
                                setCommentText(e.target.value)
                            }
                            placeholder="Write a comment..."
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#2F6F73]"
                        />

                        <button
                            type="submit"
                            disabled={
                                submittingComment ||
                                !commentText.trim()
                            }
                            className="bg-[#2F6F73] text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                            {submittingComment
                                ? "..."
                                : "Comment"}
                        </button>

                    </form>

                </div>
            )}

        </article>
    );
}

export default PostCard;