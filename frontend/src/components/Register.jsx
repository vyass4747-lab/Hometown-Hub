import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(
                "https://hometown-hub-523u.onrender.com/account/register/",
                {
                    email,
                    firstName,
                    lastName,
                    username,
                    password,
                }
            );

            localStorage.setItem("access", response.data.access);
            localStorage.setItem("refresh", response.data.refresh);

            navigate("/dashboard");
        } catch (error) {
            console.log(error.response?.data);

            const errorData = error.response?.data;

            alert(
                errorData?.detail ||
                errorData?.email?.[0] ||
                errorData?.username?.[0] ||
                "Could not create account."
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
                        Create your community account
                    </p>
                </div>

                <form
                    onSubmit={handleRegister}
                    className="flex flex-col gap-4"
                >

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <div>
                            <label className="block text-sm font-medium text-[#24303A] mb-2">
                                First name
                            </label>

                            <input
                                type="text"
                                placeholder="First name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#24303A] mb-2">
                                Last name
                            </label>

                            <input
                                type="text"
                                placeholder="Last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                                className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-[#24303A] mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Choose a username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                        />
                    </div>

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
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:border-[#2F6F73]"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#2F6F73] text-white p-3 rounded-lg font-medium hover:bg-[#285F63] transition disabled:opacity-50 mt-2"
                    >
                        {loading ? "Creating account..." : "Create account"}
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="text-[#2F6F73] font-semibold hover:underline"
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
}

export default Register;