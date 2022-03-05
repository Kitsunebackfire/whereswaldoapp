import React, { useEffect } from "react";
import Styling from "./Title.module.css";
import bagonImg from "./pokemon/bagon.jpg";
import pikachuImg from "./pokemon/pikachu.jpg";
import mewImg from "./pokemon/mew.jpg";

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
    setGameStart,
    gameover,
    pikachu,
    getBestScores,
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
        <div className={Styling.title} onClick={() => console.log(timer)}>
          Find the Pokemon!
        </div>
        <div className={Styling.findPokemonContainer}>
          <div className={Styling.pokeContainer}>
            <span className={Styling.pokeName}>Pikachu</span>
            <img className={Styling.pokeImg} alt="pikachu" src={pikachuImg} />
            {foundPikachu ? (
              <span
                style={{
                  marginLeft: "10px",
                  alignSelf: "center",
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                ✔️ Found!
              </span>
            ) : (
              ""
            )}
          </div>
          <div className={Styling.pokeContainer}>
            <span className={Styling.pokeName}>Bagon</span>
            <img className={Styling.pokeImg} alt="bagon" src={bagonImg} />
            {foundBagon ? (
              <span
                style={{
                  marginLeft: "10px",
                  alignSelf: "center",
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                ✔️ Found!
              </span>
            ) : (
              ""
            )}
          </div>
          <div className={Styling.pokeContainer}>
            <span className={Styling.pokeName}>Mew</span>
            <img className={Styling.pokeImg} alt="mew" src={mewImg} />
            {foundMew ? (
              <span
                style={{
                  marginLeft: "10px",
                  alignSelf: "center",
                  color: "green",
                  fontSize: "1.2rem",
                }}
              >
                ✔️ Found!
              </span>
            ) : (
              ""
            )}
          </div>
        </div>
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
          <button
            className={Styling.startBtn}
            onClick={() => (gameover ? "" : startControl())}
          >
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
            <div
              onClick={() => console.log(getBestScores())}
              className={Styling.bestScores}
            >
              {
                //console.log(getBestScores)
                //console.log(getBestScores)
                //getBestScores.map((time) => {
                // key will likely be id later from fb
                //return <div key={time.id}>time: {time.time}</div>;
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
