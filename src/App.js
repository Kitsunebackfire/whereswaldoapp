import React, { useState, useEffect } from "react";
import "./App.css";
import FindPhoto from "./components/FindPhoto";
import Title from "./components/Title";
import Username from "./components/Username";
import {
  collection,
  getDocs,
  query,
  addDoc,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
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

  // pokemon state objects. draws coords and setState via useEffect and fetchcoordinates
  const [pikachu, setPikachu] = useState([{}]);
  const [bagon, setBagon] = useState([{}]);
  const [mew, setMew] = useState([{}]);

  // best time storage
  const [bestTimes, setBestTimes] = useState([]);

  // username state to be used in conjunction w/ best times for db storage
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const fetchCoordinates = async (collectName) => {
    let coordsQuery = query(collection(db, collectName));
    const querySnapshot = await getDocs(coordsQuery);
    const coordinates = querySnapshot.docs.map((doc) => doc.data());
    console.log("coordinates from firebase");
    return coordinates[0];
  };

  useEffect(() => {
    getBestScores();
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

  const pushTimeToDb = (time2push, user) => {
    try {
      let bestScoresCollection = collection(db, "bestScores");
      addDoc(bestScoresCollection, { time: time2push, username: user });
    } catch (error) {
      console.log("I failed to upload to db");
      console.log(error);
    }
  };

  const getBestScores = () => {
    let bestScoresCollectionRef = collection(db, "bestScores");
    const bestScoresQuery = query(
      bestScoresCollectionRef,
      orderBy("time", "asc"),
      limit(3)
    );

    onSnapshot(bestScoresQuery, (snapshot) => {
      let timesArray = [];
      snapshot.docs.forEach((doc) => {
        timesArray.push({ ...doc.data(), id: doc.id });
      });
      setBestTimes(timesArray);
    });
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
      //handleBestTimes(score);
      //// create db push for time
      pushTimeToDb(score, username);
      ////
      console.log("gameover complete");
    }
  }, [foundPikachu, foundBagon, foundMew, timer, username]);

  return (
    <div>
      <Username handleUsernameChange={handleUsernameChange} />
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
        bagon={bagon}
        mew={mew}
        getBestScores={getBestScores}
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
        pikachu={pikachu}
        bagon={bagon}
        mew={mew}
      />
    </div>
  );
}

export default App;
