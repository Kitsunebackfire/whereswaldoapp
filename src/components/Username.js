import React from "react";
import Styling from "./Username.module.css";

function Username(props) {
  const mainContainer = document.getElementById("usernameContainer");
  const usernameInputBox = document.getElementById("usernameInputBox");

  const handleUserInput = () => {
    if (usernameInputBox.value === "") {
      window.alert("please enter a username");
    } else {
      mainContainer.style.display = "none";
    }
  };

  return (
    <div id="usernameContainer" className={Styling.usernameContainer}>
      <div className={Styling.usernameInstructions}>Enter a Username below</div>
      <input
        id="usernameInputBox"
        onChange={(e) => props.handleUsernameChange(e)}
        className={Styling.usernameInput}
        type="text"
        placeholder="username"
      ></input>
      <button onClick={() => handleUserInput()} className={Styling.submitBtn}>
        Submit
      </button>
    </div>
  );
}

export default Username;
