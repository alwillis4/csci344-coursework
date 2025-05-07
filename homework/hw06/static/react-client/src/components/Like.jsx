import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";

export default function Like({ token, likeId, postId }) {
  const [statelikeId, setStateLikeId] = useState(likeId);

  async function createLike() {
    const sendData = {
      post_id: postId,
    };
    console.log("Creating a Like...");
    // send an HTTP Post request to create a like
    const responceData = await postDataToServer(token, "/api/likes/", sendData);
    console.log(responceData);
    setStateLikeId(responceData.id);
  }

  async function deleteLike() {
    console.log("deleting a Like...");
    // send an HTTP Post request to delete a bookmark
    const responceData = await deleteDataFromServer(
      token,
      "/api/likes/" + statelikeId
    );
    console.log(responceData);
    setStateLikeId(responceData.id);
  }

  if (statelikeId) {
    return (
      <button
        aria-label="Unlike this Post"
        ariaChecked="true"
        ariaRole="toggle"
        onClick={deleteLike}
      >
        <i className="fas text-red-700 fa-heart"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="Like this Post"
        ariaChecked="false"
        ariaRole="toggle"
        onClick={createLike}
      >
        <i className="far fa-heart"></i>
      </button>
    );
  }
}
