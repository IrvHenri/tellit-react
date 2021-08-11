import React from "react";
import axios from "axios";
import TimeAgo from "react-timeago";
import useUpvote from "../hooks/useUpvote";
import { FaArrowUp, FaCheckCircle } from "react-icons/fa";
import randomColor from "../helpers/randomColor";
export default function ContributionArticle(props) {
  const {
    storyId,
    authorView,
    authorId,
    loggedInUserId,
    createdAt,
    id,
    content,
    user: { username, avatar },
  } = props;
  const { upVote, setUpvote } = useUpvote(id);

  const onClick = () => {
    const upVotePayload = {
      userId: loggedInUserId,
    };
    axios
      .post(
        `http://localhost:8000/api/contributions/${id}/upvote`,
        upVotePayload
      )
      .then((res) => {
        setUpvote((prev) => prev + 1);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const acceptContribution = () => {
    const payload = { user_id: authorId };
    axios
      .post(`http://localhost:8000/api/contributions/${id}`, payload)
      .then((res) => (window.location = `/stories/${storyId}`))
      .catch((err) => console.log(err));
  };

  const isAuthorView = () => {
    if (authorView) {
      return (
        <button
          onClick={acceptContribution}
          className="contribution-action-btn"
        >
          Accept
          <FaCheckCircle />
        </button>
      );
    }
  };

  const style = {
    background: randomColor(),
  };
  return (
    <article className="contribution-article" style={style}>
      <header>
        <p>Upvotes: {upVote}</p>
        <div>
          <img src={avatar} alt="user avatar" className="avatar" />{" "}
          <p>{username}</p>
        </div>
      </header>
      <p>{content}</p>
      <footer>
        <TimeAgo date={createdAt} />
        <div className="contribution-action-container">
          {isAuthorView()}{" "}
          <button onClick={onClick} className="contribution-action-btn">
            Upvote
            <FaArrowUp />
          </button>
        </div>
      </footer>
    </article>
  );
}
