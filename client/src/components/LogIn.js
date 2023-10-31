import React, { useState } from "react";
import "../styles/CreateAccount.css";

function LogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async () => {
    // Send a request to your server to get the user based on the provided username
    const username = formData.username;
    const authResponse = await fetch(
      `http://localhost:3001/api/auth/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
        }),
      }
    );

    if (authResponse.ok) {
      const user = await authResponse.json();
      // Check if the provided password matches the user's password
      if (user && user.password === formData.password) {
        setLoggedInUser(user.username);
      } else {
        // Password doesn't match
        alert("Invalid username or password");
      }
    } else {
      // User not found
      alert("User not found");
    }
  };

  return (
    <div>
      {loggedInUser && <p>Welcome, {loggedInUser}!</p>}
      <form className="log-in-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default LogIn;
