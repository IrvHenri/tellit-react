import React from "react";
import { Link } from "react-router-dom";

export default function Tabs() {
  return (
    <div className="home-tabs">
      <Link to="/">Home</Link>
      <Link to="/stories"> My stories</Link>
    </div>
  );
}
