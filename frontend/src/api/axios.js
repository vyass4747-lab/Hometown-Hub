import axios from "axios";

const api = axios.create({
    baseURL: "https://hometown-hub-523u.onrender.com/api/",
});

api.interceptors.request.use((config) => {

    const token = localStorage.getItem("access");

    const publicRoutes = [
        "account/login/",
        "account/register/"
    ];

    const isPublicRoute = publicRoutes.some(
        route => config.url.includes(route)
    );

    if (token && !isPublicRoute) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export default api;