import React from "react";
import useUserStories from "../hooks/useUserStories";
import StoryArticle from "./StoryArticle";
import { useAuth } from "../context/AuthContext";
export default function UserFeed() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("auth-token");
  const [stories, loading] = useUserStories(id, token);
  const { user } = useAuth();
  let userStories =
    stories &&
    stories.map((story) => <StoryArticle key={story.id} {...story} />);
  const loggedInUser = () => {
    if (user) {
      return loading ? <p>loading...</p> : userStories;
    } else {
      return <p>Login to view your stories!</p>;
    }
  };

  return <div className="user-feed">{loggedInUser()}</div>;
}
