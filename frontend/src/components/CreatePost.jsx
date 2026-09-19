import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function CreatePost() {

    const { communityId } = useParams();
    const navigate = useNavigate();

    const [content, setContent] = useState("");
    const [postType, setPostType] = useState("post");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const formData = new FormData();

            formData.append("content", content);
            formData.append("post_type", postType);

            if (image) {
                formData.append("image", image);
            }

            await api.post(
                `communities/${communityId}/posts/`,
                formData
            );

            navigate(`/community/${communityId}`);

        } catch (error) {

            console.log(error.response?.data);

            setError(
                error.response?.data?.detail ||
                "Could not create post."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8F6]">

            <main className="max-w-2xl mx-auto px-5 py-8">

                <button
                    onClick={() =>
                        navigate(`/community/${communityId}`)
                    }
                    className="text-sm text-gray-500 hover:text-[#2F6F73] mb-6"
                >
                    ← Back to community
                </button>

                <div className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8">

                    <h1 className="text-2xl font-semibold text-[#24303A]">
                        Create a post
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Post type
                            </label>

                            <select
                                value={postType}
                                onChange={(e) =>
                                    setPostType(e.target.value)
                                }
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 bg-white"
                            >
                                <option value="post">
                                    Post
                                </option>

                                <option value="announcement">
                                    Announcement
                                </option>
                            </select>
                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                What's on your mind?
                            </label>

                            <textarea
                                value={content}
                                onChange={(e) =>
                                    setContent(e.target.value)
                                }
                                rows="7"
                                required
                                placeholder="Share something with your community..."
                                className="w-full border border-gray-300 rounded-lg px-3 py-3 resize-none outline-none focus:border-[#2F6F73]"
                            />

                        </div>

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Image <span className="text-gray-400">(optional)</span>
                            </label>

                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setImage(e.target.files[0])
                                }
                                className="w-full text-sm text-gray-500"
                            />

                        </div>

                        {error && (
                            <p className="text-sm text-red-500">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#2F6F73] text-white py-2.5 rounded-lg text-sm font-medium disabled:opacity-50"
                        >
                            {loading
                                ? "Posting..."
                                : "Publish post"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreatePost;