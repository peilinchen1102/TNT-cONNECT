import React from "react";

const Description = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };
  return <span>{props.content}</span>;
};

export default Description;
