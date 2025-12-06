import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!username || !password) return alert("Заполните все поля");

    if (username === "admin" && password === "admin123") {
      localStorage.setItem(
        "currentUser",
        JSON.stringify({ username: "admin", role: "admin" })
      );
      navigate("/admin");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!user) return alert("Неверный логин или пароль");

    localStorage.setItem(
      "currentUser",
      JSON.stringify({ username: user.username, role: "user" })
    );
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 className="mb-3 text-center">Login</h2>
      <input
        type="text"
        placeholder="Username"
        className="form-control mb-2"
        style={{ maxWidth: "300px", margin: "0 auto" }}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="form-control mb-2"
        style={{ maxWidth: "300px", margin: "0 auto" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="btn btn-primary w-50 d-block mx-auto"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}

export default Login;
