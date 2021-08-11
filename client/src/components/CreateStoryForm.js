import React, { useState } from "react";
import { ImCross } from "react-icons/im";

import axios from "axios";
const CreateStoryForm = ({ onClick, userId }) => {
  const [title, setTitle] = useState("");
  const [initialContent, setInitialContent] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const newStory = {
      title,
      userId,
      initial_content: initialContent,
    };
    console.log(newStory);
    axios
      .post("http://localhost:8000/api/stories", newStory)
      .then(() => {
        setTitle("");
        setInitialContent("");
        onClick();
        window.location = "/";
      })
      .catch((err) => {
        console.log("SIGNUP ERR:", err);
        // setError(err);
      });
  };
  return (
    <div className="form create-story-modal">
      <button onClick={onClick} className="close-story-modal-btn">
        <ImCross />
      </button>
      <h1>Tellit!</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        name="initial_content"
        cols="30"
        rows="10"
        placeholder="Once upon a time..."
        required
        onChange={(e) => setInitialContent(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateStoryForm;
