import React from "react";
import { Link } from "@reach/router";

/**
 * Story is a component that renders creator and content of a story
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} creator_profession
 * @param {string} content of the story
 */

const SingleStory = (props) => {
  return (
    <div className="Card-story">
      <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
        {props.creator_name}
      </Link>
      <pre className="underline u-profession">{props.creator_profession}</pre>
      <p className="Card-storyContent">{props.content}</p>
    </div>
  );
};

export default SingleStory;
