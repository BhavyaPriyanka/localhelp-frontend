import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">

      <Header />

      {/* Hero Section */}
      <div className="hero">
        <h1>LocalHelp</h1>

        <p>Get medicines and local help instantly</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/help")}
        >
          Need Local Help?
        </button>
      </div>

      {/* Blog Cards */}
      <div className="blog">
        <div className="card">
          <h3>Community Update</h3>
          <p>Helping each other builds a stronger society ❤️</p>
        </div>

        <div className="card">
          <h3>Announcement</h3>
          <p>LocalHelp platform is now active!</p>
        </div>

        <div className="card">
          <h3>Safety Tip</h3>
          <p>Always verify users before accepting help requests.</p>
        </div>
      </div>

    </div>
  );
}

export default Home;