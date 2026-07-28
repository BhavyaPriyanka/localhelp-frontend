import React, { useState } from "react";

function AuthModal({ type, onClose }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async () => {
    if (type === "signin") {
      try {
        const response = await fetch("http://localhost:8080/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username,
            password
          })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("role", data.role);
          localStorage.setItem("username", username);

          setMsg("Login Successful");

          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 800);
        } else {
          setMsg(data.message || "Invalid username or password");
        }
      } catch (err) {
        console.error(err);
        setMsg("Unable to connect to backend");
      }

      return;
    }

    if (type === "signup") {
      setMsg("Signup will be implemented later.");
    }

    if (type === "forgot") {
      setMsg("Forgot Password will be implemented later.");
    }
  };

  return (
    <div className="modal-bg">
      <div className="modal">

        <h2>
          {type === "signin" && "Sign In"}
          {type === "signup" && "Sign Up"}
          {type === "forgot" && "Forgot Password"}
        </h2>

        {type === "signup" && (
          <>
            <input placeholder="Name" />
            <input placeholder="Email" />
            <input type="password" placeholder="Password" />
          </>
        )}

        {type === "signin" && (
          <>
            <input
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="link">
              Forgot Password?
            </p>
          </>
        )}

        {type === "forgot" && (
          <>
            <input placeholder="Email" />
            <input placeholder="Verification Code" />
          </>
        )}

        <button className="green-btn" onClick={handleSubmit}>
          Submit
        </button>

        <button className="red-btn" onClick={onClose}>
          Close
        </button>

        {msg && <p className="msg">{msg}</p>}

      </div>
    </div>
  );
}

export default AuthModal;