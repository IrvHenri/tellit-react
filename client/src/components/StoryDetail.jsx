import React from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import useStory from "../hooks/useStory";
import StoryArticle from "./StoryArticle";
import ContributionForm from "./ContributionForm";
import ContributionArticle from "./ContributionArticle";
export default function StoryDetail({ currentUser }) {
  const { id } = useParams();
  const { story, contributions, acceptedContributions, loading } = useStory(id);
  const storyUserId = story.userId;
  const loggedInUserId = currentUser && currentUser.id;
  const isAuthor = storyUserId === loggedInUserId;

  const isCompleteView = () => {
    if (story.is_complete) {
      return null;
    }
    return (
      <div className="story-detail-sidebar">
        <ContributionForm storyId={id} loggedInUserId={loggedInUserId} />
        <div className="contribution-container">
          {contributionList ? contributionList : null}
        </div>
      </div>
    );
  };
  const acceptedContributionsList = acceptedContributions.map(
    (contribution) => <p>{contribution.content}</p>
  );

  const contributionList =
    contributions &&
    contributions.map((contribution) => (
      <ContributionArticle
        key={contribution.id}
        {...contribution}
        loggedInUserId={loggedInUserId}
        authorView={isAuthor}
        authorId={storyUserId}
        storyId={id}
      />
    ));
  return (
    <div
      className={`story-detail-page ${
        story.is_complete ? "story-detail-complete" : null
      }`}
    >
      {loading ? (
        <CircularProgress size={100} />
      ) : (
        <>
          <StoryArticle
            {...story}
            authorView={isAuthor}
            detailView={true}
            authorId={storyUserId}
            acceptedContributions={acceptedContributionsList}
          />
          {isCompleteView()}
        </>
      )}
    </div>
  );
}
