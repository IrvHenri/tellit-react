import React from "react";

export default function StoryFeed({ stories }) {
  return <div className="journal">{stories ? stories : <p>Story Feed</p>}</div>;
}
