import React from "react";
import { FaPencilAlt } from "react-icons/fa";

export const CreateStoryBtn = ({ onClick }) => {
  return (
    <button className="create-story-btn" onClick={onClick}>
      <FaPencilAlt />
    </button>
  );
};
