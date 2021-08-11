import React, { useState } from "react";
import axios from "axios";

export default function LoginForm({ setToken }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");
    const user = {
      username,
      password,
    };

    axios
      .post("http://localhost:8000/api/login", user)
      .then((res) => {
        const { token, id } = res.data;
        localStorage.setItem("auth-token", token);
        localStorage.setItem("id", id);
        window.location = "/";
      })
      .catch((err) => {
        let error = err.response.data;
        setError(error);
      });
  };
  return (
    <form className="form login-form">
      <h1>Log In</h1>
      <input
        type="text"
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Username"
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div>
        <button type="submit" onClick={handleSubmit}>
          Log in
        </button>
      </div>
      {error && <p>{error}</p>}
    </form>
  );
}
