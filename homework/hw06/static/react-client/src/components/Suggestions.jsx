import React, { useState, useEffect } from "react";
import { getDataFromServer } from "../server-requests";
import Suggestion from "./Suggestion";

export default function Suggestions({ token }) {
  const [Suggestions, setSuggestions] = useState([]);

  async function getSuggestions() {
    // fteched data from https://photo-app-secured.herokuapp.com/api/posts
    const data = await getDataFromServer(token, "/api/suggestions");
    setSuggestions(data);
  }

  // useEffect is a bulit-in function designed to handek "side effects" when the page
  // first loads:
  useEffect(() => {
    getSuggestions();
  }, []);

  console.log(Suggestions);

  function outputSuggestion(SuggestionObj) {
    return <Suggestion key={SuggestionObj.id} SuggestionData={SuggestionObj} />;
  }
  return <div>{Suggestions.map(outputSuggestion)}</div>;
  //   return (
  //     <div className="mt-4">
  //       <p className="text-base text-gray-400 font-bold mb-4">
  //         Suggestions for you
  //       </p>

  //       <section className="flex justify-between items-center mb-4 gap-2">
  //         Suggestions go here. Fetch data from /api/suggestions endpoint.
  //       </section>
  //     </div>
  //   );
}
