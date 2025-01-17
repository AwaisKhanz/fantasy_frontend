import React from "react";
import { useAuth } from "../context/AuthContext";

export default function HomePage() {
  const { user } = useAuth();
  console.log(user);

  const handleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/yahoo`;
  };

  const handleDashboard = () => {
    window.location.href = "/dashboard"; // ✅ Redirect to dashboard
  };

  return (
    <div className="index">
      <div className="background"></div>
      <div className="wrapper">
        <h1 className="title glow-text">Gridiron Grammy's 2024</h1>
        <p className="subtitle">Celebrating Fantasy Football Excellence</p>

        <button
          className="cta-button"
          onClick={user ? handleDashboard : handleLogin}
        >
          <a href="#" className="cta-button">
            {user ? "Go to Dashboard" : "Sync Your Fantasy Data"}
          </a>
        </button>
        <svg
          className="trophy-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M21 3h-4V2a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v1H3a1 1 0 0 0-1 1v3c0 3.53 2.61 6.43 6 6.92V16a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2.08c3.39-.49 6-3.39 6-6.92V4a1 1 0 0 0-1-1zM5 7V5h2v5.92A5.006 5.006 0 0 1 5 7zm14 0c0 2.36-1.64 4.33-4 4.92V5h2v2h2V7zM9 3h6v1H9V3zm4 14h-2v-2h2v2z" />
        </svg>
      </div>
    </div>
  );
}
