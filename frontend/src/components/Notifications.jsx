import { useEffect, useState } from "react";
import api from "../api/axios";

function Notifications() {

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchNotifications = async () => {

        try {

            const response = await api.get(
                "notifications/"
            );

            setNotifications(response.data);

        } catch (error) {

            console.log(error.response?.data);

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    const markAsRead = async (id) => {

        try {

            await api.patch(
                `notifications/${id}/read/`,
                {
                    is_read: true,
                }
            );

            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.id === id
                        ? {
                            ...notification,
                            is_read: true,
                        }
                        : notification
                )
            );

        } catch (error) {

            console.log(error.response?.data);

        }
    };

    return (
        <div className="min-h-screen bg-[#F7F8F6]">

            <main className="max-w-3xl mx-auto px-5 py-8">

                <h1 className="text-2xl font-semibold text-[#24303A]">
                    Notifications
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                    Stay updated with activity from your communities.
                </p>

                <div className="mt-6 space-y-3">

                    {loading && (
                        <p className="text-sm text-gray-500 text-center py-10">
                            Loading notifications...
                        </p>
                    )}

                    {!loading && notifications.length === 0 && (
                        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center">

                            <h3 className="font-medium text-[#24303A]">
                                You're all caught up
                            </h3>

                            <p className="text-sm text-gray-500 mt-2">
                                New notifications will appear here.
                            </p>

                        </div>
                    )}

                    {!loading &&
                        notifications.map((notification) => (

                            <div
                                key={notification.id}
                                className={`bg-white border rounded-xl p-4 ${
                                    notification.is_read
                                        ? "border-gray-200"
                                        : "border-[#BFD9D7]"
                                }`}
                            >

                                <div className="flex items-start justify-between gap-4">

                                    <div>

                                        <p className="text-sm text-[#24303A]">
                                            {notification.message}
                                        </p>

                                        <p className="text-xs text-gray-400 mt-2">
                                            {new Date(
                                                notification.created_at
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                    {!notification.is_read && (
                                        <button
                                            onClick={() =>
                                                markAsRead(notification.id)
                                            }
                                            className="text-xs text-[#2F6F73] whitespace-nowrap"
                                        >
                                            Mark read
                                        </button>
                                    )}

                                </div>

                            </div>

                        ))}

                </div>

            </main>

        </div>
    );
}

export default Notifications;