import React, { useState } from "react";
import axios from "axios";
import Button from "./Button";
export default function ContributionForm({ storyId, loggedInUserId }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const handleChange = (event) => {
    const { value } = event.target;
    setContent(value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();

    const contribution = {
      content,
      storyId,
      userId: loggedInUserId,
    };
    axios
      .post(
        `http://localhost:8000/api/stories/${storyId}/contribution`,
        contribution
      )
      .then((res) => {
        setError("");
        setContent("");
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <div className="contribution-widget">
      <form onSubmit={handleSubmit}>
        {error && <p>{error}</p>}
        <h2>Submit A Contribution!</h2>
        <textarea
          type="text"
          name="text"
          value={content}
          onChange={handleChange}
          placeholder="What happens next?"
        />
        <Button text="Submit" />
      </form>
    </div>
  );
}
