import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function SignupForm() {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const history = useHistory();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const { username, email, password, confirmPassword } = inputs;

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const newUser = {
      username,
      email,
      password,
    };

    axios
      .post("http://localhost:8000/api/signup", newUser)
      .then(() => {
        setInputs({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        history.push("/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <form className="form signup-form">
      <h1>Sign-up</h1>

      <input
        type="text"
        placeholder="Enter username"
        name="username"
        value={inputs.username}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        placeholder="Enter Email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        value={inputs.password}
        onChange={handleChange}
        placeholder="Enter Password"
        required
      />
      <input
        name="confirmPassword"
        type="password"
        value={inputs.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm Password"
        required
      />

      <button onClick={handleSubmit} type="submit">
        Signup
      </button>
      <p>{error && error}</p>
    </form>
  );
}
