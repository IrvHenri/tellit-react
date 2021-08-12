import React from "react";

export default function Button(props) {
  const { text } = props;
  return (
    <button type="submit" className="btn-main">
      {text}
    </button>
  );
}
