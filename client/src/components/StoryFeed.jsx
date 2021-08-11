import React from "react";
import StoryArticle from "./StoryArticle";
import useStories from "../hooks/useStories";
import { CircularProgress } from "@material-ui/core";
export default function StoryFeed() {
  const [stories, loading] = useStories();

  let storyList =
    stories &&
    stories.map((story) => (
      <StoryArticle
        key={story.id}
        {...story}
        authorView={false}
        detailView={false}
      />
    ));
  return (
    <div className="story-feed">
      {loading ? (
        <CircularProgress size={100} />
      ) : stories.length > 0 ? (
        storyList
      ) : (
        <p>No Stories! Check Back Later!</p>
      )}
    </div>
  );
}
