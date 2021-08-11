import React from "react";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
export default function StoryArticle(props) {
  const {
    createdAt,
    id,
    title,
    initial_content,
    user: { avatar, username },
    is_complete,
  } = props;

  return (
    <article className="story-article">
      <header>
        <h2>{title}</h2>{" "}
        <div className="story-user-profile">
          {avatar && <img src={avatar} alt="user avatar" className="avatar" />}
          <p>{username}</p>
        </div>
      </header>
      <p className="story-content">{initial_content}</p>
      <footer>
        <div>
          <TimeAgo date={createdAt} /> /
          {is_complete ? <span> Complete</span> : <span> In Progress</span>}
        </div>

        <button>
          <Link to={`/stories/${id}`}>View Story</Link>
        </button>
      </footer>
    </article>
  );
}
