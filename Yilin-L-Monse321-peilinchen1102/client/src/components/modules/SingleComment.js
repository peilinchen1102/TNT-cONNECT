import { Link } from "@reach/router";
import React, { useState, useEffect } from "react";

import { get } from "../../utilities";
/**
 * Component to render a single comment
 *
 * Proptypes
 * @param {string} _id of comment
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the comment
 */
const SingleComment = (props) => {
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
    <div className="Card-commentBody">
      <img className="Card-piccomment" src={user.photo} alt="display" />
      <Link to={`/profile/${props.creator}`} className="u-link u-bold u-small">
        {props.creator_name}
      </Link>
      <pre className="underline u-profession_comment">{props.creator_profession}</pre>
      <span>{" | " + props.content}</span>
    </div>
  );
};

export default SingleComment;
