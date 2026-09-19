import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();
    const location = useLocation();

    const logout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        navigate("/");
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="bg-white border-b border-gray-200">

            <div className="max-w-6xl mx-auto px-5">

                <div className="h-16 flex items-center justify-between">

                    <button
                        onClick={() => navigate("/dashboard")}
                        className="text-lg font-semibold text-[#24303A]"
                    >
                        Hometown Hub
                    </button>

                    <div className="flex items-center gap-5">

                        <button
                            onClick={() => navigate("/dashboard")}
                            className={`text-sm ${
                                isActive("/dashboard")
                                    ? "text-[#2F6F73] font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            Communities
                        </button>

                        <button
                            onClick={() => navigate("/notifications")}
                            className={`text-sm ${
                                isActive("/notifications")
                                    ? "text-[#2F6F73] font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            Notifications
                        </button>

                        <button
                            onClick={() => navigate("/profile")}
                            className={`text-sm ${
                                isActive("/profile")
                                    ? "text-[#2F6F73] font-medium"
                                    : "text-gray-500"
                            }`}
                        >
                            Profile
                        </button>

                        <button
                            onClick={logout}
                            className="text-sm text-gray-500 hover:text-red-500"
                        >
                            Logout
                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;