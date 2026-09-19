import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import CommunityCard from "./CommunityCard";

function Dashboard() {

    const navigate = useNavigate();

    const [communities, setCommunities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCommunities = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("communities/");

            setCommunities(response.data);

        } catch (error) {

            console.log(error.response?.data);

            setError("Could not load communities.");

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchCommunities();
    }, []);

    return (

        <div className="min-h-screen bg-[#F7F8F6]">

            <main className="max-w-6xl mx-auto px-5 py-8">


                <section className="mb-9">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">

                        <div>

                            <p className="text-sm font-medium text-[#2F6F73] mb-2">
                                Welcome to Hometown Hub
                            </p>

                            <h1 className="text-3xl sm:text-4xl font-semibold text-[#24303A] tracking-tight">
                                Find your community.
                            </h1>

                            <p className="text-gray-500 mt-2 max-w-xl leading-relaxed">
                                Connect with people from your city or village,
                                discover local updates and stay involved.
                            </p>

                        </div>

                        <button
                            onClick={() => navigate("/create-community")}
                            className="w-fit px-4 py-2.5 bg-[#2F6F73] text-white text-sm font-medium rounded-lg hover:bg-[#285F63] transition"
                        >
                            + Create community
                        </button>

                    </div>

                </section>


       

                <section className="bg-white border border-gray-200 rounded-xl p-5 mb-8">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>

                            <h2 className="text-lg font-semibold text-[#24303A]">
                                Discover communities
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Explore communities and find one that feels like home.
                            </p>

                        </div>

                        <div className="text-sm text-gray-500">
                            {communities.length} communities
                        </div>

                    </div>

                </section>


        

                {loading && (

                    <div className="py-16 text-center">

                        <p className="text-sm text-gray-500">
                            Loading communities...
                        </p>

                    </div>

                )}



                {!loading && error && (

                    <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">

                        <p className="text-gray-600 text-sm">
                            {error}
                        </p>

                        <button
                            onClick={fetchCommunities}
                            className="mt-4 px-4 py-2 bg-[#24303A] text-white text-sm rounded-lg hover:bg-gray-800 transition"
                        >
                            Try again
                        </button>

                    </div>

                )}




                {!loading &&
                    !error &&
                    communities.length === 0 && (

                        <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">

                            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-[#E8F1F0] text-[#2F6F73] text-xl mb-4">
                                +
                            </div>

                            <h3 className="text-lg font-semibold text-[#24303A]">
                                No communities yet
                            </h3>

                            <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                                There aren't any communities available right now.
                                Create one for your hometown and get people connected.
                            </p>

                            <button
                                onClick={() => navigate("/create-community")}
                                className="mt-5 px-4 py-2.5 bg-[#2F6F73] text-white text-sm font-medium rounded-lg hover:bg-[#285F63] transition"
                            >
                                Create a community
                            </button>

                        </div>

                    )}



                {!loading &&
                    !error &&
                    communities.length > 0 && (

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                            {communities.map((community) => (

                                <CommunityCard
                                    key={community.id}
                                    community={community}
                                />

                            ))}

                        </div>

                    )}

            </main>

        </div>

    );
}

export default Dashboard;