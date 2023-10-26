import React, { useState } from "react";
import CreateAccount from "./CreateAccount";
import LogIn from "./LogIn";
import "../styles/LogInPage.css";

function EntryLogInPage() {
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const [showLogIn, setShowLogIn] = useState(false);

  return (
    <div className="landing-page">
      <h1>Welcome to Lucky Coder Lounge</h1>
      <div className="buttons">
        <button className="login-button" onClick={() => {
          setShowLogIn(true)
          setShowCreateAccount(false)
        }}>
          Log In
        </button>
        <button className="create-account-button" onClick={() => {
          setShowLogIn(false)
          setShowCreateAccount(true)
        }}>
          Create Account
        </button>
      </div>
      {showCreateAccount && <CreateAccount />}
      {showLogIn && <LogIn />}
    </div>
  );
}

export default EntryLogInPage;
