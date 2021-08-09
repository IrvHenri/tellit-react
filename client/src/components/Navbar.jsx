import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar({ user }) {
  const { logOut } = useAuth();
  return (
    <nav className="navbar">
      <h1>Tellit!</h1>

      {!user ? (
        <div>
          <Link to="/signup">Sign up</Link>
          <Link to="/login">Login</Link>
        </div>
      ) : user ? (
        <div>
          <p>Welcome back {user.username} !</p>
          <button onClick={logOut}> Logout </button>
        </div>
      ) : null}
    </nav>
  );
}
