import React from "react";
import { Link } from "react-router-dom";

export default function Tabs() {
  return (
    <div className="home-tabs">
      <Link to="/stories">Home</Link>
      <Link to="/user/:id/stories"> My stories</Link>
    </div>
  );
}
