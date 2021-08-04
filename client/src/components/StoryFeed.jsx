import React from "react";
import StoryArticle from "./StoryArticle";
import useStories from "../hooks/useStories";
export default function StoryFeed() {
  const [stories, loading] = useStories();

  let storyList =
    stories &&
    stories.map((story) => <StoryArticle key={story.id} {...story} />);
  return (
    <div className="home-journal">
      {loading ? (
        <p>"Loading..."</p>
      ) : stories ? (
        <div>{storyList}</div>
      ) : (
        <p>No Stories! Check Back Later!</p>
      )}
    </div>
  );
}
