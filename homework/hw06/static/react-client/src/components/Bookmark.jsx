import React, { useState } from "react";
import { postDataToServer, deleteDataFromServer } from "../server-requests";
//
// 1. renders the bookmark (reflecting whethere the current user has bookmarked or not)
// 2. create or deletes bookmark
//

export default function Bookmark({ token, bookmarkId, postId }) {
  const [statebookmarkId, setStateBookmarkId] = useState(bookmarkId);

  async function createBookmark() {
    const sendData = {
      post_id: postId,
    };
    console.log("Creating a bookmark...");
    // send an HTTP Post request to create a bookmark
    const responceData = await postDataToServer(
      token,
      "/api/bookmarks/",
      sendData
    );
    console.log(responceData);
    setStateBookmarkId(responceData.id);
  }

  async function deleteBookmark() {
    console.log("deleting a bookmark...");
    // send an HTTP Post request to delete a bookmark
    const responceData = await deleteDataFromServer(
      token,
      "/api/bookmarks/" + statebookmarkId
    );
    console.log(responceData);
    setStateBookmarkId(null);
  }
  console.log(statebookmarkId);
  if (statebookmarkId) {
    return (
      <button
        aria-label="Unbookmark this Post"
        ariaChecked="true"
        ariaRole="toggle"
        onClick={deleteBookmark}
      >
        <i className="fas fa-bookmark"></i>
      </button>
    );
  } else {
    return (
      <button
        aria-label="Bookmark this Post"
        ariaChecked="false"
        ariaRole="toggle"
        onClick={createBookmark}
      >
        <i className="far fa-bookmark"></i>
      </button>
    );
  }
}
