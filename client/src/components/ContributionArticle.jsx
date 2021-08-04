import React from "react";
import axios from "axios";
import useUpvote from "../hooks/useUpvote";
import { FaArrowUp } from "react-icons/fa";

export default function ContributionArticle(props) {
  const {
    id,
    content,
    user: { username, avatar },
  } = props;
  const { upVote, setUpvote } = useUpvote(id);

  //TEST

  const onClick = () => {
    const upVotePayload = {
      userId: 1,
    };
    axios
      .post(
        `http://localhost:8000/api/contributions/${id}/upvote`,
        upVotePayload
      )
      .then(() => setUpvote((prev) => prev + 1))
      .catch((err) => console.log(err));
  };
  return (
    <article className="contribution-article">
      <header>
        <p>Upvotes: {upVote}</p>
        <img src={avatar} alt="user avatar" /> <p>{username}</p>
      </header>
      <p>{content}</p>
      <footer>
        <button onClick={onClick}>
          Upvote
          <FaArrowUp />
        </button>
      </footer>
    </article>
  );
}
