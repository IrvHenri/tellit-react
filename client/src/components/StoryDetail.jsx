import React from "react";
import { useParams } from "react-router-dom";
import useStory from "../hooks/useStory";
import StoryArticle from "./StoryArticle";
import ContributionForm from "./ContributionForm";
import ContributionArticle from "./ContributionArticle";
export default function StoryDetail() {
  const { id } = useParams();
  const { story, contributions, loading } = useStory(id);
  const userId = 1;
  const contributionList =
    contributions &&
    contributions.map((contribution) => (
      <ContributionArticle key={contribution.id} {...contribution} />
    ));
  return (
    <div>
      {loading ? (
        "Loading.."
      ) : (
        <div className="story-detail-page">
          {" "}
          <StoryArticle {...story} />{" "}
          <ContributionForm storyId={id} userId={userId} />{" "}
          <div className="contribution-container">
            {contributionList ? contributionList : null}
          </div>
        </div>
      )}
    </div>
  );
}
