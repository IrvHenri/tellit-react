import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function Navbar({ user }) {
  const { logOut } = useAuth();
  const activeStyle = {
    fontWeight: "bold",
    color: "red",
  };
  return (
    <nav className="navbar">
      <h1>Tellit!</h1>

      {!user ? (
        <div className="nav-action-links">
          <NavLink to="/signup" activeStyle={activeStyle}>
            Sign up
          </NavLink>
          <NavLink to="/login" activeStyle={activeStyle}>
            Login
          </NavLink>
        </div>
      ) : user ? (
        <div className="nav-action-logged-in">
          <p>Welcome back {user.username} !</p>
          <button onClick={logOut}> Logout </button>
        </div>
      ) : null}
    </nav>
  );
}
