import React from "react";

const HomeView = (props) => {
  return (
    <div className="App-home-page App-page">
      <div className="page-content">
        <h1 className="page-title">Welcome to Tic Tac Toe</h1>
        <h2 className="secondary-title">Create a room</h2>
        <form onSubmit={props.createRoom} className="home-form page-form">
          <input
            id="roomName"
            name="roomName"
            className="form-input"
            type="text"
            placeholder="Room Name"
            value={props.roomName}
            onChange={props.onChange}
            required
          />

          <button
            type="submit"
            disabled={props.isInvalid || props.isCreating}
            className={`submit-button ${props.isInvalid ? "disabled" : ""}`}
          >
            Creat{props.isCreating ? "ing" : "e"} room
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomeView;
