import React from "react";

const ListItem = (props) => {
  return (
    <li>
      <input type="checkbox" />
      <span>{props.content}</span>
    </li>
  );
};

export default ListItem;
