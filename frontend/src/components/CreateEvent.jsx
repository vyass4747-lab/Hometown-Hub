import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

function CreateEvent() {

    const { communityId } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        title: "",
        description: "",
        location: "",
        start_time: "",
        end_time: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await api.post(
                `communities/${communityId}/events/`,
                form
            );

            navigate(`/community/${communityId}`);

        }catch (error) {

            console.log("EVENT ERROR:", error.response?.data);   
            setError(
                JSON.stringify(error.response?.data) ||
                "Could not create event."
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
                        Create an event
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Organise something for your community.
                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="mt-7 space-y-5"
                    >

                        <input
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="Event title"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                        />

                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe the event..."
                            rows="5"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 resize-none"
                        />

                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            placeholder="Event location"
                            required
                            className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                        />

                        <div>

                            <label className="block text-sm text-gray-600 mb-2">
                                Start time
                            </label>

                            <input
                                type="datetime-local"
                                name="start_time"
                                value={form.start_time}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-600 mb-2">
                                End time
                            </label>

                            <input
                                type="datetime-local"
                                name="end_time"
                                value={form.end_time}
                                onChange={handleChange}
                                required
                                className="w-full border border-gray-300 rounded-lg px-3 py-2.5"
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
                                ? "Creating..."
                                : "Create event"}
                        </button>

                    </form>

                </div>

            </main>

        </div>
    );
}

export default CreateEvent;