import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "https://hometown-hub-523u.onrender.com/account/login/",
                {
                    email,
                    password,
                }
            );

            console.log("LOGIN RESPONSE:", response.data);

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/dashboard");

        } catch (error) {
            console.log("LOGIN ERROR:", error.response?.data);

            alert(
                error.response?.data?.detail ||
                error.response?.data?.error ||
                "Invalid email or password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F7F8F6] px-4">

            <div className="bg-white w-full max-w-md p-8 rounded-xl border border-gray-200 shadow-sm">

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-semibold text-[#24303A]">
                        Hometown Hub
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Connect with your community
                    </p>

                </div>

                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-5"
                >

                    <div>

                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#2F6F73] text-white p-3 rounded-lg font-medium hover:bg-[#285F63] transition disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">

                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-[#2F6F73] font-semibold hover:underline"
                    >
                        Register
                    </button>

                </p>

            </div>

        </div>
    );
}

export default Login;