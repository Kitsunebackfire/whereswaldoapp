import React, { useEffect } from "react";
import Styling from "./Title.module.css";

const Title = (props) => {
  const {
    setGameover,
    timerOn,
    setTimerOn,
    timer,
    setTimer,
    resetPokemonFound,
    bestTimes,
    foundPikachu,
    foundBagon,
    foundMew,
    gameStart,
    setGameStart,
  } = props;

  // resets TimerOn to false and resets timer to 0
  function resetControl(a, b) {
    setTimerOn(a);
    setTimer(b);
    resetPokemonFound();
    setGameStart(false);
    setGameover(false);
  }

  const startControl = () => {
    setGameStart(true);
    setTimerOn(true);
  };

  useEffect(() => {
    let interval = null;

    if (timerOn) {
      // code when timer on. initializes
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 10);
      }, 10);
    } else {
      // code when timer off
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [setTimer, timerOn]);

  return (
    <div className={Styling.mainContainer}>
      <div className={Styling.leftContainer}>
        <h1 className={Styling.title}>Find the Pokemon!</h1>
        <h3 className={Styling.findThese}>
          {gameStart ? "Found " : "Find "}
          {foundPikachu ? (
            <span style={{ textDecoration: "line-through" }}>Pikachu</span>
          ) : (
            "Pikachu"
          )}
          ,{" "}
          {foundBagon ? (
            <span style={{ textDecoration: "line-through" }}>Bagon</span>
          ) : (
            "Bagon "
          )}
          , and{" "}
          {foundMew ? (
            <span style={{ textDecoration: "line-through" }}>Mew</span>
          ) : (
            "Mew"
          )}
        </h3>
      </div>

      <div className={Styling.timer}>
        <span>
          {
            // shows minutes
            // .slice(-2 removes the 0 whenever timer display is 2 digits)
            ("0" + Math.floor((timer / 60000) % 60)).slice(-2)
          }
          :
        </span>
        <span>
          {
            // shows seconds
            // .slice(-2 removes the 0 whenever timer display is 2 digits)
            ("0" + Math.floor((timer / 1000) % 60)).slice(-2)
          }
        </span>
        :
        <span>
          {
            // shows milliseconds and resets to zero every second
            // .slice(-2 removes the 0 whenever timer display is 2 digits)
            ("0" + ((timer / 10) % 100)).slice(-2)
          }
        </span>
      </div>
      <div className={Styling.rightContainer}>
        <div className={Styling.buttonContainer}>
          <button className={Styling.startBtn} onClick={() => startControl()}>
            Start
          </button>
          <button
            className={Styling.resetBtn}
            onClick={() => resetControl(false, 0)}
          >
            Reset
          </button>
        </div>
        <div className={Styling.bestScoresSection}>
          <div className={Styling.bestScoresTitle}>Best Scores</div>
          <div className={Styling.bestScoresContainer}>
            <div className={Styling.bestScores}>
              {bestTimes.map((time) => {
                return <div key={time}>time: {time}</div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
