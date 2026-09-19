import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import PostCard from "./PostCard";

function CommunityDetails() {
    const { communityId } = useParams();
    const navigate = useNavigate();

    const [community, setCommunity] = useState(null);
    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);

    const [loading, setLoading] = useState(true);
    const [postsLoading, setPostsLoading] = useState(false);
    const [eventsLoading, setEventsLoading] = useState(false);

    const [message, setMessage] = useState("");

    const fetchCommunity = async () => {
        try {
            const response = await api.get(
                `communities/${communityId}/`
            );

            setCommunity(response.data);
        } catch (error) {
            console.log(error.response?.data);
            setMessage("Could not load this community.");
        }
    };

    const fetchPosts = async () => {
        try {
            setPostsLoading(true);

            const response = await api.get(
                `communities/${communityId}/posts/`
            );

            setPosts(response.data);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setPostsLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            setEventsLoading(true);

            const response = await api.get(
                `communities/${communityId}/events/`
            );

            setEvents(response.data);
        } catch (error) {
            console.log(error.response?.data);
        } finally {
            setEventsLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);

            await fetchCommunity();
            await fetchPosts();
            await fetchEvents();

            setLoading(false);
        };

        loadData();
    }, [communityId]);

    const handleJoin = async () => {
        try {
            setMessage("");

            await api.post(
                `communities/${communityId}/join/`
            );

            setMessage(
                "Your request has been sent to the community admin."
            );
        } catch (error) {
            console.log(error.response?.data);

            setMessage(
                error.response?.data?.detail ||
                "Could not send join request."
            );
        }
    };

    const handleJoinEvent = async (eventId) => {
        try {
            const response = await api.post(
                `events/${eventId}/join/`
            );

            setEvents((prevEvents) =>
                prevEvents.map((event) =>
                    event.id === eventId
                        ? {
                              ...event,
                              attendee_count:
                                  response.data.attendee_count,
                              joined: response.data.joined,
                          }
                        : event
                )
            );
        } catch (error) {
            console.log(error.response?.data);

            alert(
                error.response?.data?.detail ||
                "Could not update event attendance."
            );
        }
    };

    const formatEventDate = (dateString) => {
        if (!dateString) return "";

        return new Date(dateString).toLocaleString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F7F8F6] flex items-center justify-center">
                <p className="text-sm text-gray-500">
                    Loading community...
                </p>
            </div>
        );
    }

    if (!community) {
        return (
            <div className="min-h-screen bg-[#F7F8F6] px-5 py-10">

                <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-8 text-center">

                    <h2 className="text-xl font-semibold text-[#24303A]">
                        Community not found
                    </h2>

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="mt-4 text-sm text-[#2F6F73]"
                    >
                        ← Back to communities
                    </button>

                </div>

            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F8F6]">

            <main className="max-w-5xl mx-auto px-5 py-8">

                {/* Back */}

                <button
                    onClick={() => navigate("/dashboard")}
                    className="text-sm text-gray-500 hover:text-[#2F6F73] mb-6"
                >
                    ← Back to communities
                </button>


                {/* Community Header */}

                <section className="bg-white border border-gray-200 rounded-xl p-6">

                    <div className="flex flex-col sm:flex-row sm:justify-between gap-5">

                        <div>

                            <div className="flex items-center gap-3 flex-wrap">

                                <h1 className="text-2xl font-semibold text-[#24303A]">
                                    {community.name}
                                </h1>

                                <span className="text-xs text-[#2F6F73] bg-[#E8F1F0] px-2.5 py-1 rounded-full capitalize">
                                    {community.category}
                                </span>

                            </div>

                            <p className="text-sm text-gray-500 mt-2">
                                {community.location}
                            </p>

                        </div>

                        <button
                            onClick={handleJoin}
                            className="h-fit px-5 py-2.5 bg-[#2F6F73] text-white text-sm rounded-lg hover:bg-[#285F63]"
                        >
                            Request to join
                        </button>

                    </div>


                    <div className="border-t border-gray-100 mt-6 pt-5">

                        <h2 className="font-semibold text-[#24303A]">
                            About
                        </h2>

                        <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                            {community.description ||
                                "No description available."}
                        </p>

                    </div>


                    <div className="mt-5 text-sm text-gray-500">
                        {community.member_count} members
                    </div>


                    {message && (
                        <div className="mt-5 bg-[#E8F1F0] text-[#285F63] text-sm px-4 py-3 rounded-lg">
                            {message}
                        </div>
                    )}

                </section>


                {/* Community Feed */}

                <section className="mt-7">

                    <div className="flex items-center justify-between mb-4">

                        <div>

                            <h2 className="text-xl font-semibold text-[#24303A]">
                                Community feed
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Updates and discussions from the community.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    `/community/${communityId}/create-post`
                                )
                            }
                            className="px-4 py-2 bg-[#2F6F73] text-white text-sm rounded-lg"
                        >
                            + Post
                        </button>

                    </div>


                    {postsLoading && (
                        <p className="text-sm text-gray-500 py-8 text-center">
                            Loading posts...
                        </p>
                    )}


                    {!postsLoading && posts.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">

                            <h3 className="font-medium text-[#24303A]">
                                No posts yet
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Start the first discussion in this community.
                            </p>

                        </div>
                    )}


                    {!postsLoading && posts.length > 0 && (
                        <div className="space-y-4">

                            {posts.map((post) => (
                                <PostCard
                                    key={post.id}
                                    post={post}
                                />
                            ))}

                        </div>
                    )}

                </section>


                {/* Events */}

                <section className="mt-10">

                    <div className="flex items-center justify-between mb-4">

                        <div>

                            <h2 className="text-xl font-semibold text-[#24303A]">
                                Community events
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Discover and join events happening in this community.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate(
                                    `/community/${communityId}/create-event`
                                )
                            }
                            className="px-4 py-2 bg-[#2F6F73] text-white text-sm rounded-lg"
                        >
                            + Event
                        </button>

                    </div>


                    {eventsLoading && (
                        <p className="text-sm text-gray-500 py-8 text-center">
                            Loading events...
                        </p>
                    )}


                    {!eventsLoading && events.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">

                            <h3 className="font-medium text-[#24303A]">
                                No events yet
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                Create an event and bring your community together.
                            </p>

                            <button
                                onClick={() =>
                                    navigate(
                                        `/community/${communityId}/create-event`
                                    )
                                }
                                className="mt-4 text-sm text-[#2F6F73] font-medium"
                            >
                                Create the first event →
                            </button>

                        </div>
                    )}


                    {!eventsLoading && events.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                            {events.map((event) => (
                                <article
                                    key={event.id}
                                    className="bg-white border border-gray-200 rounded-xl p-5"
                                >

                                    <div className="flex items-start justify-between gap-3">

                                        <h3 className="text-lg font-semibold text-[#24303A]">
                                            {event.title}
                                        </h3>

                                    </div>


                                    <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                                        {event.description}
                                    </p>


                                    <div className="mt-4 space-y-2 text-sm text-gray-500">

                                        <p>
                                            <span className="font-medium text-[#24303A]">
                                                When:
                                            </span>{" "}
                                            {formatEventDate(event.start_time)}
                                        </p>

                                        <p>
                                            <span className="font-medium text-[#24303A]">
                                                Ends:
                                            </span>{" "}
                                            {formatEventDate(event.end_time)}
                                        </p>

                                        <p>
                                            <span className="font-medium text-[#24303A]">
                                                Location:
                                            </span>{" "}
                                            {event.location}
                                        </p>

                                    </div>


                                    <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                                        <p className="text-sm text-gray-500">
                                            {event.attendee_count || 0} attending
                                        </p>

                                        <button
                                            onClick={() =>
                                                handleJoinEvent(event.id)
                                            }
                                            className={`px-4 py-2 text-sm rounded-lg ${
                                                event.joined
                                                    ? "border border-gray-300 text-gray-600 hover:bg-gray-50"
                                                    : "bg-[#2F6F73] text-white hover:bg-[#285F63]"
                                            }`}
                                        >
                                            {event.joined
                                                ? "Leave event"
                                                : "Join event"}
                                        </button>

                                    </div>

                                </article>
                            ))}

                        </div>
                    )}

                </section>

            </main>

        </div>
    );
}

export default CommunityDetails;