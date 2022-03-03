import React, { useState, useEffect } from "react";
import Styling from "./FindPhoto.module.css";

const FindPhoto = (props) => {
  // used destructuring to handle props because it's easier to reference them
  // if they're all on the file so I don't flip pages constantly
  const {
    timerOn,
    setX,
    setY,

    setFoundPikachu,

    setFoundBagon,

    setFoundMew,
    gameover,
    pokemonCollection,
  } = props;

  /*
  useEffect((e) => {
    const update = (e) => {
      // setX and setY used for tracking pokemon position
      setX(e.offsetX);
      setY(e.offsetY);
      console.log(`${e.offsetX}, ${e.offsetY}`);
      if (gameover !== true) {
        if (
          e.offsetX >= pikachu.xlow &&
          e.offsetX <= pikachu.xhigh &&
          e.offsetY >= pikachu.ylow &&
          e.offsetY <= pikachu.yhigh
        ) {
          setFoundPikachu(true);
          // when pikachu is found, allow change in pikachu icon to disappear
          console.log(pikachu);
        } else if (
          e.offsetX >= bagon.xlow &&
          e.offsetX <= bagon.xhigh &&
          e.offsetY >= bagon.ylow &&
          e.offsetY <= bagon.yhigh
        ) {
          setFoundBagon(true);
          // when pikachu is found, allow change in pikachu icon to disappear
          console.log(bagon);
        } else if (
          e.offsetX >= mew.xlow &&
          e.offsetX <= mew.xhigh &&
          e.offsetY >= mew.ylow &&
          e.offsetY <= mew.yhigh
        ) {
          setFoundMew(true);
          // when pikachu is found, allow change in pikachu icon to disappear
          console.log(mew);
        }
      } else {
        console.log("game is finished, why are you still clicking?");
      }
    };

    window.addEventListener("click", update);
    return () => window.removeEventListener("click", update);
  });*/

  return (
    <div
      style={
        timerOn
          ? { pointerEvents: "" }
          : { pointerEvents: "none", opacity: "45%" }
      }
      className={Styling.backgroundImage}
    >
      <img
        className="imageFind"
        alt="where are the pokemon"
        src="https://m.media-amazon.com/images/I/A1KnEKzWWtL._AC_SL1500_.jpg"
      ></img>
    </div>
  );
};

export default FindPhoto;
