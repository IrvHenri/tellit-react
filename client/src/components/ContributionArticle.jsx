import React from "react";
import axios from "axios";
import TimeAgo from "react-timeago";
import useUpvote from "../hooks/useUpvote";
import { FaArrowUp } from "react-icons/fa";
import randomColor from "../helpers/randomColor";
export default function ContributionArticle(props) {
  const {
    createdAt,
    id,
    content,
    user: { username, avatar },
  } = props;
  const { upVote, setUpvote } = useUpvote(id);
  console.log(randomColor());

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

  const style = {
    background: randomColor(),
  };
  return (
    <article className="contribution-article" style={style}>
      <header>
        <p>Upvotes: {upVote}</p>
        <div>
          <img src={avatar} alt="user avatar" /> <p>{username}</p>
        </div>
      </header>
      <p>{content}</p>
      <footer>
        <TimeAgo date={createdAt} />
        <button onClick={onClick}>
          Upvote
          <FaArrowUp />
        </button>
      </footer>
    </article>
  );
}
