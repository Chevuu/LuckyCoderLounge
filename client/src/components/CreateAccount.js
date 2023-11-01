import React, { useState } from "react";
import "../styles/CreateAccount.css";

function CreateAccountLogIn() {
  const [createAccountFormData, setCreateAccountFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    language: "",
  });

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
    repeat_password: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreateAccountFormData({
      ...createAccountFormData,
      [name]: value,
    });
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing data
    const newErrors = {};

    // add errors if existing for missing data and matching passwords
    {
      if (!createAccountFormData.name) {
        newErrors.name = "Name is required";
      }
      if (!createAccountFormData.surname) {
        newErrors.surname = "Surname is required";
      }
      if (!createAccountFormData.email) {
        newErrors.email = "Email is required";
      }
      if (!createAccountFormData.phoneNumber) {
        newErrors.phoneNumber = "Phone Number is required";
      }
      if (!createAccountFormData.nationality) {
        newErrors.nationality = "Nationality is required";
      }
      if (!createAccountFormData.language) {
        newErrors.language = "Language is required";
      }
      if (!loginFormData.username) {
        newErrors.username = "Username is required";
      }
      if (!loginFormData.password) {
        newErrors.password = "Password is required";
      }
      if (loginFormData.password !== loginFormData.repeat_password) {
        newErrors.repeat_password = "Passwords do not match";
      }
    }

    // If there are missing data or password mismatch, set errors and prevent the API call
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(null); // Reset success message
    } else {
      // Reset errors
      setErrors({});

      try {
        const createAccountResponse = await fetch(
          "http://localhost:3000/api/users/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(createAccountFormData),
          }
        );

        if (createAccountResponse.ok) {
          const data = await createAccountResponse.json();
          setSuccess("User created successfully with userID: " + data.userID);
          console.log("User created successfully with userID: " + data.userID);

          const authResponse = await fetch(
            "http://localhost:3001/api/auth/add",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: loginFormData.username,
                password: loginFormData.password,
                userID: data.userID,
              }),
            }
          );

          if (authResponse.ok) {
            setSuccess("Account created successfully.");
            // Reset the form fields
            setCreateAccountFormData({
              name: "",
              surname: "",
              email: "",
              phoneNumber: "",
              nationality: "",
              language: "",
            });
            setLoginFormData({
              username: "",
              password: "",
              repeat_password: "",
            });
          } else {
            setSuccess(null);
            console.error(
              "Failed to create an account on the authentication service"
            );
          }
        } else {
          setSuccess(null);
          console.error("Failed to create a user");
        }
      } catch (error) {
        setSuccess(null);
        console.error("Network error:", error);
      }
    }
  };

  return (
    <div>
      {success && <p className="success">{success}</p>}
      {errors.name && <p className="error">{errors.name}</p>}
      {errors.surname && <p className="error">{errors.surname}</p>}
      {errors.email && <p className="error">{errors.email}</p>}
      {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      {errors.nationality && <p className="error">{errors.nationality}</p>}
      {errors.language && <p className="error">{errors.language}</p>}
      {errors.username && <p className="error">{errors.username}</p>}
      {errors.password && <p className="error">{errors.password}</p>}
      {errors.repeat_password && (
        <p className="error">{errors.repeat_password}</p>
      )}
      <form className="create-account-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={loginFormData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={loginFormData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="repeat_password"
          placeholder="Repeat Password"
          value={loginFormData.repeat_password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={createAccountFormData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="surname"
          placeholder="Surname"
          value={createAccountFormData.surname}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={createAccountFormData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={createAccountFormData.phoneNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="nationality"
          placeholder="Nationality"
          value={createAccountFormData.nationality}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="language"
          placeholder="Language"
          value={createAccountFormData.language}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default CreateAccountLogIn;
