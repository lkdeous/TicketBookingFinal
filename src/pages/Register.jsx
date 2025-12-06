import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!username || !password) return alert("Заполните все поля");

    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username))
      return alert("Такой пользователь уже существует");

    users.push({ username, password });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Регистрация прошла успешно!");
    navigate("/login");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2 className="mb-3 text-center">Register</h2>
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
        className="btn btn-success w-50 d-block mx-auto"
        onClick={handleRegister}
      >
        Register
      </button>
    </div>
  );
}

export default Register;
