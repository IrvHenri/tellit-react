import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import TimeAgo from "react-timeago";
export default function StoryArticle(props) {
  const {
    acceptedContributions,
    createdAt,
    id,
    title,
    initial_content,
    user: { avatar, username },
    is_complete,
    authorView,
    detailView,
    authorId,
  } = props;

  const handleSubmit = () => {
    const payLoad = { storyId: id, userId: authorId };
    axios
      .post(`http://localhost:8000/api/stories/${id}`, payLoad)
      .then((response) => (window.location = `/stories/${id}`));
  };
  const storyArticleButtonView = () => {
    if (!detailView) {
      return (
        <button>
          <Link to={`/stories/${id}`}>View Story</Link>
        </button>
      );
    }

    if (authorView && detailView && !is_complete) {
      return <button onClick={handleSubmit}>Mark Complete</button>;
    }

    return null;
  };
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
      {acceptedContributions}
      <footer>
        <div>
          <TimeAgo date={createdAt} /> /
          {is_complete ? <span> Complete</span> : <span> In Progress</span>}
        </div>
        {storyArticleButtonView()}
      </footer>
    </article>
  );
}
