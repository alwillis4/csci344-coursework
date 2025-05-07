import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Post from "./Post";

export default function Posts({ token }) {
  //
  // 1. fetch post data from the server u
  // 2. It iterates through each element and draws a post comment
  const [posts, setPosts] = useState([]);
  const [counter, setCounter] = useState(0);

  async function getPosts() {
    // fteched data from https://photo-app-secured.herokuapp.com/api/posts
    const data = await getDataFromServer(token, "/api/posts");
    setPosts(data);
  }

  // useEffect is a bulit-in function designed to handek "side effects" when the page
  // first loads:
  useEffect(() => {
    getPosts();
  }, []);

  function addOneToConter() {
    setCounter(counter + 1);
  }

  console.log(posts);
  console.log("Redraw screen with", addOneToConter);

  function outputPost(postObj) {
    return <Post token={token} key={postObj.id} postData={postObj} />;
  }
  return <div>{posts.map(outputPost)}</div>;
}
