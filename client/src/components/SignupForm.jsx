import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { username, email, password } = inputs;
    const newUser = {
      username,
      email,
      password,
    };

    axios
      .post("http://localhost:8000/api/signup", newUser)
      .then(() => {
        setInputs({ username: "", email: "", password: "" });
        window.location = "/login";
      })
      .catch((err) => {
        console.log(err);
        // setError(err);
      });
  };
  return (
    <form className="form signup-form">
      <input
        type="text"
        placeholder="Enter username"
        name="username"
        value={inputs.username}
        onChange={handleChange}
      />
      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
      />
      <input
        name="password"
        type="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Password must be at least 10 and 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
      />
      <button onClick={handleSubmit} type="submit">
        Signup
      </button>
      <p>{error && error}</p>
    </form>
  );
}
