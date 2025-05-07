import React from "react";

export default function Suggestion({ SuggestionData }) {
  console.log(SuggestionData);
  return (
    <section className="flex justify-between items-center mb-4 gap-2">
      <img
        src={SuggestionData.thumb_url}
        alt="suggestions"
        className="rounded-full"
      />
      <div className="w-[180px]">
        <p className="font-bold text-sm">{SuggestionData.username}</p>
        <p className="text-gray-700 text-xs">Suggested for you</p>
      </div>
      <button className="text-blue-700 text-sm py-2">follow</button>
    </section>
  );
}
