import { useState } from "react";
import api from "../api/axios";

function EventCard({ event }) {

    const [joined, setJoined] = useState(false);
    const [attendeeCount, setAttendeeCount] = useState(
        event.attendee_count
    );

    const handleJoin = async () => {

        try {

            const response = await api.post(
                `events/${event.id}/join/`
            );

            setJoined(response.data.joined);
            setAttendeeCount(response.data.attendee_count);

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">

            <h3 className="text-lg font-semibold text-[#24303A]">
                {event.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
                {event.location}
            </p>

            <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                {event.description}
            </p>

            <div className="mt-4 text-sm text-gray-500 space-y-1">

                <p>
                    Starts:{" "}
                    {new Date(event.start_time).toLocaleString()}
                </p>

                <p>
                    Ends:{" "}
                    {new Date(event.end_time).toLocaleString()}
                </p>

            </div>

            <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-100">

                <span className="text-sm text-gray-500">
                    {attendeeCount} attending
                </span>

                <button
                    onClick={handleJoin}
                    className={`px-4 py-2 text-sm rounded-lg ${
                        joined
                            ? "bg-gray-100 text-gray-700"
                            : "bg-[#2F6F73] text-white"
                    }`}
                >
                    {joined ? "Leave event" : "Join event"}
                </button>

            </div>

        </div>
    );
}

export default EventCard;