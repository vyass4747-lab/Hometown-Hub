import React, { useEffect, useState } from "react";
import api from "../api/axios";

const UserProfile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await api.get("/account/profile/");
      setUser(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-100">
        <h1 className="text-xl font-semibold">
          Loading Profile...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      <div className="max-w-5xl mx-auto">

        {/* Top Card */}

        <div className="bg-white rounded-3xl shadow-sm p-8">

          <div className="flex flex-col md:flex-row items-center gap-8">

            <div
              className="
                w-32
                h-32
                rounded-full
                bg-gradient-to-r
                from-blue-600
                to-purple-600
                flex
                items-center
                justify-center
                text-white
                text-5xl
                font-bold
              "
            >
              {user.username[0].toUpperCase()}
            </div>

            <div>

              <h1 className="text-4xl font-bold text-slate-800">
                {user.first_name} {user.last_name}
              </h1>

              <p className="text-slate-500 mt-2">
                @{user.username}
              </p>

              <p className="text-slate-500">
                {user.email}
              </p>

              <div className="mt-4">

                {user.is_verified ? (
                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm">
                    ✅ Verified Account
                  </span>
                ) : (
                  <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm">
                    ⚠️ Email Not Verified
                  </span>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Info Cards */}

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-sm text-slate-500">
              Username
            </h3>

            <p className="text-xl font-semibold mt-2">
              {user.username}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-sm text-slate-500">
              Email Address
            </h3>

            <p className="text-xl font-semibold mt-2 break-all">
              {user.email}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-sm text-slate-500">
              Account Created
            </h3>

            <p className="text-xl font-semibold mt-2">
              {new Date(
                user.createdAt
              ).toLocaleDateString(
                "en-IN",
                {
                    day:'numeric',
                    month:'long',
                    year:'numeric'
                }
              )}
            </p>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm">

            <h3 className="text-sm text-slate-500">
              Last Updated
            </h3>

            <p className="text-xl font-semibold mt-2">
              {new Date(
                user.updated_at
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        {/* Future SaaS Cards */}

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">

            <h2 className="text-3xl font-bold">
              📁
            </h2>

            <p className="mt-3 text-slate-500">
              Workspaces
            </p>

            <h3 className="text-2xl font-bold mt-2">
              --
            </h3>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">

            <h2 className="text-3xl font-bold">
              📄
            </h2>

            <p className="mt-3 text-slate-500">
              Documents
            </p>

            <h3 className="text-2xl font-bold mt-2">
              --
            </h3>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm text-center">

            <h2 className="text-3xl font-bold">
              🤖
            </h2>

            <p className="mt-3 text-slate-500">
              AI Chats
            </p>

            <h3 className="text-2xl font-bold mt-2">
              --
            </h3>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;