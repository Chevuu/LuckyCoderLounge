import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import LogIn from "./LogIn";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../styles/LogInPage.css";

function EntryLogInPage() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div className="landing-page">
      <h1>Welcome to Lucky Lounge</h1>
      <div className="buttons">
        <button className="start-screen-button" onClick={() => {
          setShowLogIn(true);
          setShowCreateAccount(false);
        }}>
          Log In
        </button>
        <button className="start-screen-button" onClick={() => {
          setShowLogIn(false);
          setShowCreateAccount(true);
        }}>
          Create Account
        </button>
        <Link className="start-screen-button" to="/slot-machine"  style={{ textDecoration: 'none' }}>
          Go to Slot Machine
        </Link>
      </div>
      {showCreateAccount && <CreateAccount />}
      {showLogIn && <LogIn />}
    </div>
  );
}

export default EntryLogInPage;
