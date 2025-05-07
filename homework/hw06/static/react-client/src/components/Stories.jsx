import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";

export default function Stories({ token }) {
  const [stories, setStories] = useState([]);

  async function getStories() {
    const data = await getDataFromServer(token, "/api/stories");
    setStories(data);
  }

  useEffect(() => {
    getStories();
  }, []);

  function renderStory(story) {
    return (
      <div key={story.id} className="flex flex-col items-center min-w-[60px]">
        <img
          src={story.user.thumb_url}
          alt={story.user.username}
          className="rounded-full border-2 border-gray-300 w-12 h-12 object-cover"
        />
        <p className="text-xs text-gray-500 mt-1 truncate max-w-[60px] text-center">
          {story.user.username}
        </p>
      </div>
    );
  }

  return (
    <header className="flex gap-4 bg-white border p-3 overflow-x-auto mb-6">
      {stories.map(renderStory)}
    </header>
  );
}
