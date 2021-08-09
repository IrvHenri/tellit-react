import React from "react";
import { Link } from "react-router-dom";

export default function StoryArticle(props) {
  const {
    id,
    title,
    initial_Content,
    user: { avatar, username },
    is_complete,
  } = props;

  return (
    <article className="story-article">
      <header>
        <h2>{title}</h2>{" "}
        <div className="story-user-profile">
          {avatar && <img src={avatar} alt="user avatar" />}
          <p>{username}</p>
        </div>{" "}
      </header>
      <p className="story-content">{initial_Content}</p>
      <footer>
        {" "}
        {is_complete ? <span>Complete</span> : <span>In Progress</span>}{" "}
        <button>
          <Link to={`/stories/${id}`}>View Story</Link>
        </button>
      </footer>
    </article>
  );
}
