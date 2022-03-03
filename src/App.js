import React, { useState, useEffect } from "react";
import "./App.css";
import FindPhoto from "./components/FindPhoto";
import Title from "./components/Title";
import { colRef } from "./firebaseConfig";
import { collection, getDoc, getDocs, query } from "firebase/firestore";
import { db } from "./firebaseConfig";

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

  // waits for coords to load and then sets them into the coords state which then
  // allows them to be set into the pokemon collection state via a callback

  const [pikachu, setPikachu] = useState([{}]);
  const [bagon, setBagon] = useState([{}]);
  const [mew, setMew] = useState([{}]);

  const fetchCoordinates = async (collectName) => {
    let coordsQuery = query(collection(db, collectName));
    const querySnapshot = await getDocs(coordsQuery);
    const coordinates = querySnapshot.docs.map((doc) => doc.data());
    console.log("coordinates from firebase");
    return coordinates[0];
  };

  useEffect(() => {
    const loadCoords = async () => {
      try {
        setPikachu([
          {
            pokemon: "pikachu",
            coords: await fetchCoordinates("pikachu"),
          },
        ]);
        setBagon([
          { pokemon: "bagon", coords: await fetchCoordinates("bagon") },
        ]);
        setMew([{ pokemon: "mew", coords: await fetchCoordinates("mew") }]);
      } catch (error) {
        console.log(error);
      }
    };
    loadCoords();
  }, []);

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
        pikachu={pikachu}
      />
      <FindPhoto
        timerOn={timerOn}
        x={x}
        y={y}
        setX={setX}
        setY={setY}
        setFoundPikachu={setFoundPikachu}
        setFoundBagon={setFoundBagon}
        setFoundMew={setFoundMew}
        gameover={gameover}
      />
    </div>
  );
}

export default App;
