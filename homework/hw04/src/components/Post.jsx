import React from "react";

import Bookmark from "./Bookmark";
import Like from "./Like";

export default function Post({ postData, token }) {
  console.log(postData);
  function outputComment() {
    if (postData.comments.length === 0) {
      return "No comments";
    }
    if (postData.comments.length === 1) {
      const comment = postData.comments[0];
      return (
        <div>
          <p className="flex gap-2 text-sm mb-3" key={comment.id}>
            <strong>{comment.user.username}</strong> {comment.text}
          </p>
        </div>
      );
    }
    if (postData.comments.length > 1) {
      const comment = postData.comments[postData.comments.length - 1];
      return (
        <div>
          <p className="flex gap-2 text-sm mb-3">
            <strong>{comment.user.username}</strong> {comment.text}
          </p>
          <button className="button">Show more comments</button>
        </div>
      );
    }

    //  postData.comments.map((comment) => (
    //   <p className="flex gap-2 text-sm mb-3" key={comment.id}>
    //     <strong>{comment.user.username}</strong> {comment.text}
    //   </p>
    // ))
  }
  return (
    <section className="bg-white border mb-10">
      {/* User Header */}
      <div className="p-4 flex justify-between">
        <h3 className="text-lg font-Comfortaa font-bold">
          {postData.user.username}
        </h3>
        <button aria-label="Ellipsis button" className="icon-button">
          <i className="fas fa-ellipsis-h"></i>
        </button>
      </div>
      {/* Image */}
      <img
        src={postData.image_url}
        alt={postData.alt_text || "Post Photo"}
        width="300"
        height="300"
        className="w-full bg-cover"
      />
      {/* Buttons */}
      <div className="p-4">
        <div className="flex justify-between text-2xl mb-3">
          <div className="flex gap-2">
            {/* Like Button*/}

            <Like
              likeId={postData.current_user_like_id}
              postId={postData.id}
              token={token}
            />
            {/* Comment Button*/}
            <button aria-label="Comment button">
              <i className="far fa-comment"></i>
            </button>
            {/* Airplane Button*/}
            <button aria-label="Airplane button">
              <i className="far fa-paper-plane"></i>
            </button>
          </div>
          <div>
            {/* Bookmark Button*/}

            <Bookmark
              bookmarkId={postData.current_user_bookmark_id}
              postId={postData.id}
              token={token}
            />
          </div>
        </div>
        <p className="font-bold mb-3">{postData.likes.length} likes</p>

        {/* Caption made by the author of the post*/}
        <div className="text-sm mb-3">
          <p className="flex gap-2">
            <strong>{postData.user.username}</strong>
            {postData.caption}
            <button className="button">more</button>
          </p>
          {/* Comments */}
        </div>

        {outputComment()}

        {/* Last Updated */}
        <p className="uppercase text-gray-500 text-xs">
          {postData.display_time}
        </p>
      </div>
      <div className="flex justify-between items-center p-3">
        <div className="flex items-center gap-3 min-w-[80%]">
          <i className="far fa-smile text-lg"></i>
          <input
            type="text"
            className="min-w-[80%] focus:outline-none"
            placeholder="Add a comment..."
            aria-label="Textbox for comments"
          />
        </div>
        <button className="text-blue-700 py-2">Post</button>
      </div>
    </section>
  );
}
