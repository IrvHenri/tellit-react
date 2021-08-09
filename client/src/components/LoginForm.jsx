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
        window.location = "/stories";
      })
      .catch((err) => {
        let error = err.response.data;
        setError(error);
      });
  };
  return (
    <div className="form login-form">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input type="text" onChange={(e) => setUserName(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
