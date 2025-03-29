import React, { useState } from "react";
import "./Welcome.css";

export function Welcome({ name, imgUrl }) {
  // state variables got at the top
  const [style, setStyle] = useState("card");
  const [times, setTimes] = useState(0);

  //function Carousel() {
  //    const [index, setIndex] = useState(0); // pass in initial value
  //}

  function toggleClass() {
    console.log("Change the card class!");
    if (style === "card") {
      setStyle("active-card");
    } else {
      setStyle("card");
    }
  }
  function addOne(ev) {
    setTimes(times + 1);
    ev.stopPropagagtion();
  }

  return (
    <section className={style} onClick={toggleClass}>
      <h2>Hello, {name}</h2>
      {/*<img src="http://picsum.photos/200?a=b"/>*/}
      <img src={imgUrl} />
      <button onClick={addOne}> This has been clicked {times} times.</button>
    </section>
  );
}
