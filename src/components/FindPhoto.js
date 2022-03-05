import React, { useEffect } from "react";
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
    pikachu,
    bagon,
    mew,
    gameover,
  } = props;

  useEffect((e) => {
    const update = (e) => {
      // setX and setY used for tracking pokemon position
      setX(e.offsetX);
      setY(e.offsetY);
      console.log(`${e.offsetX}, ${e.offsetY}`);

      if (gameover !== true) {
        if (
          e.offsetX >= pikachu[0].coords.xlow &&
          e.offsetX <= pikachu[0].coords.xhigh &&
          e.offsetY >= pikachu[0].coords.ylow &&
          e.offsetY <= pikachu[0].coords.yhigh
        ) {
          setFoundPikachu(true);
          // when pikachu is found, allow change in pikachu icon to disappear
        } else if (
          e.offsetX >= bagon[0].coords.xlow &&
          e.offsetX <= bagon[0].coords.xhigh &&
          e.offsetY >= bagon[0].coords.ylow &&
          e.offsetY <= bagon[0].coords.yhigh
        ) {
          setFoundBagon(true);
          // when pikachu is found, allow change in pikachu icon to disappear
        } else if (
          e.offsetX >= mew[0].coords.xlow &&
          e.offsetX <= mew[0].coords.xhigh &&
          e.offsetY >= mew[0].coords.ylow &&
          e.offsetY <= mew[0].coords.yhigh
        ) {
          setFoundMew(true);
          // when pikachu is found, allow change in pikachu icon to disappear
        }
      } else {
        console.log("game is finished, why are you still clicking?");
      }
    };

    window.addEventListener("click", update);
    return () => window.removeEventListener("click", update);
  });

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
