import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import Mainlayout from "./components/Mainlayout";
import UserProfile from "./components/UserProfile";

import Dashboard from "./components/Dashboard";
import CommunityDetails from "./components/CommunityDetails";
import CreateCommunity from "./components/CreateCommunity";
import CreatePost from "./components/CreatePost";
import CreateEvent from "./components/CreateEvent";
import Notifications from "./components/Notifications";

function App() {

    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route element={<Mainlayout />}>

                    <Route
                        path="/dashboard"
                        element={<Dashboard />}
                    />

                    <Route
                        path="/community/:communityId"
                        element={<CommunityDetails />}
                    />

                    <Route
                        path="/create-community"
                        element={<CreateCommunity />}
                    />

                    <Route
                        path="/community/:communityId/create-post"
                        element={<CreatePost />}
                    />

                    <Route
                        path="/community/:communityId/create-event"
                        element={<CreateEvent />}
                    />

                    <Route
                        path="/notifications"
                        element={<Notifications />}
                    />

                    <Route
                        path="/profile"
                        element={<UserProfile />}
                    />

                </Route>

            </Routes>

        </BrowserRouter>
    );
}

export default App;