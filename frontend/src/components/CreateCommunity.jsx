import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function CreateCommunity() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        location: "",
        category: "city",
        description: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await api.post("communities/", formData);

            alert(
                "Community created successfully. It will appear after admin approval."
            );

            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Could not create community."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8F6]">
            <main className="max-w-2xl mx-auto px-5 py-8">
                <div className="mb-7">
                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-sm text-gray-500 hover:text-[#2F6F73]"
                    >
                        ← Back to communities
                    </button>

                    <h1 className="text-3xl font-semibold text-[#24303A] mt-5">
                        Create a community
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Create a space for people from your city or village.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white border border-gray-200 rounded-xl p-6 space-y-5"
                >
                    <div>
                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Community name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Indore Community"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#2F6F73]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Location
                        </label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="e.g. Indore, Madhya Pradesh"
                            required
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#2F6F73]"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Community type
                        </label>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg p-3 bg-white outline-none focus:border-[#2F6F73]"
                        >
                            <option value="city">City</option>
                            <option value="village">Village</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Tell people what this community is about..."
                            rows="5"
                            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-[#2F6F73] resize-none"
                        />
                    </div>

                    <div className="bg-[#F7F8F6] border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-600">
                            Your community will require platform admin approval
                            before it becomes visible to other users.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#2F6F73] text-white py-3 rounded-lg text-sm font-medium hover:bg-[#285F63] transition disabled:opacity-50"
                    >
                        {loading ? "Creating..." : "Create community"}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default CreateCommunity;