import React from "react";

function Message({ text, isError }) {
  return (
    <div className={`message ${isError ? "error" : "success"}`}>{text}</div>
  );
}
export default Message;
