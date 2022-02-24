import React, { useState, useEffect } from "react";
import "./App.css";
import FindPhoto from "./components/FindPhoto";
import Title from "./components/Title";
import { colRef } from "./firebaseConfig";
import { getDocs } from "firebase/firestore";

function App() {
  // used for tracking, will be commented out later
  const [x, setX] = useState();
  const [y, setY] = useState();
  const [foundPikachu, setFoundPikachu] = useState(false);
  const [foundBagon, setFoundBagon] = useState(false);
  const [foundMew, setFoundMew] = useState(false);
  // when all founds
  const [gameover, setGameover] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  // timer state
  const [timer, setTimer] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // best time storage
  const [bestTimes, setBestTimes] = useState([]);

  // takes prev values in besttimes array and then adds new time taken
  const handleBestTimes = (time) => {
    setBestTimes((prevBestTimes) => [...prevBestTimes, time]);
  };

  // cords before integrating firebase
  const [pikachu] = useState({
    xlow: 660,
    xhigh: 730,
    ylow: 351,
    yhigh: 429,
  });
  const [bagon] = useState({
    xlow: 1049,
    xhigh: 1109,
    ylow: 675,
    yhigh: 746,
  });
  const [mew] = useState({
    xlow: 827,
    xhigh: 900,
    ylow: 632,
    yhigh: 694,
  });

  const resetPokemonFound = () => {
    setFoundPikachu(false);
    setFoundBagon(false);
    setFoundMew(false);
  };

  // monitors found statuses to declare game over and sets state from false to true
  useEffect(() => {
    if (foundPikachu && foundBagon && foundMew) {
      // sets gameover to lead to future render
      // possibly display game over popup with time taken to find
      // disable future clicks as well. Disable the photo div
      setGameover(true);

      // setting timer to false disables the div again, fades it, and stops the timer.
      setTimerOn(false);
      const score = timer;
      handleBestTimes(score);
      console.log("gameover complete");
    }
  }, [foundPikachu, foundBagon, foundMew, timer]);

  useEffect(() => {
    getDocs(colRef).then((snapshot) => {
      console.log(snapshot.docs);
    });
  }, []);

  return (
    <div>
      <Title
        x={x}
        y={y}
        gameover={gameover}
        setGameover={setGameover}
        setTimerOn={setTimerOn}
        timerOn={timerOn}
        timer={timer}
        setTimer={setTimer}
        resetPokemonFound={resetPokemonFound}
        bestTimes={bestTimes}
        foundPikachu={foundPikachu}
        foundBagon={foundBagon}
        foundMew={foundMew}
        gameStart={gameStart}
        setGameStart={setGameStart}
      />
      <FindPhoto
        timerOn={timerOn}
        x={x}
        y={y}
        setX={setX}
        setY={setY}
        pikachu={pikachu}
        setFoundPikachu={setFoundPikachu}
        bagon={bagon}
        setFoundBagon={setFoundBagon}
        mew={mew}
        setFoundMew={setFoundMew}
        gameover={gameover}
      />
    </div>
  );
}

export default App;
