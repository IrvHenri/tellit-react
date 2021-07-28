import React from "react";
import Login from "./Login";
import Signup from "./Signup";

export default function Navbar() {
  return (
    <nav className="navbar">
      {" "}
      <p>Logo</p> <Login /> <Signup />{" "}
    </nav>
  );
}
