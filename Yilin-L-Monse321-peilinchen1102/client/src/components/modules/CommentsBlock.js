import SingleComment from "./SingleComment.js";
import { NewComment } from "./NewPostInput.js";
import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory.js";

import { get } from "../../utilities";

import "./Card.css";
/**
 * @typedef ContentObject
 * @property {string} _id of story/comment
 * @property {string} creator_name
 * @property {string} content of the story/comment
 */

/**
 * Component that holds all the comments for a story
 *
 * Proptypes
 * @param {ContentObject[]} comments
 * @param {ContentObject} story
 */
const CommentsBlock = (props) => {
  const [comments, setComments] = useState([]);
  const [user, setState] = useState([]);

  useEffect(() => {
    get(`/api/story/${props._id}/comments`).then((comments) => {
      setComments(comments);
    });
    get(`/api/user`, { userId: props.creator_id }).then((data) => {
      const user = data.user;

      //console.log(user.profession);
      setState(user);
    });
  }, []);
  return (
    <div className="Card-commentSection">
      <div className="story-comments">
        {props.comments.map((comment) => (
          <SingleComment
            key={`SingleComment_${comment._id}`}
            _id={comment._id}
            creator_name={comment.creator_name}
            creator_id={comment.creator_id}
            content={comment.content}
          />
        ))}
        {props.userId && (
          <NewComment storyId={props.story._id} addNewComment={props.addNewComment} />
        )}
      </div>
    </div>
  );
};

export default CommentsBlock;
