import React, { useState, useEffect } from "react";
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../utilities";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */
const Card = (props) => {
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

    // get(`/api/profile`, { userId: this.props.userId }).then((user) => {
    //   setState({ user: user });
    // });
  }, []);

  //console.log(user);
  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <img className="Card-pic" src={user.photo} alt="display" />
      <SingleStory
        _id={props._id}
        creator_name={user.name}
        creator_id={props.creator_id}
        creator_profession={user.profession}
        content={props.content}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        creator_id={props.creator_id}
        creator_profession={props.creator_profession}
        userId={props.userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;
