import React, { useState } from "react";
import "../styles/CreateAccount.css";

function CreateAccountLogIn() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeat_password: "",
    name: "",
    surname: "",
    email: "",
    phoneNumber: "",
    nationality: "",
    language: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for missing data
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is required";
    }
    if (!formData.surname) {
      newErrors.surname = "Surname is required";
    }
    if (!formData.email) {
      newErrors.email = "Email is required";
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
    }
    if (!formData.nationality) {
      newErrors.nationality = "Nationality is required";
    }
    if (!formData.language) {
      newErrors.language = "Language is required";
    }

    // If there are missing data, set errors and prevent the API call
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setSuccess(null); // Reset success message
    } else {
      // Reset errors
      setErrors({});

      try {
        const response = await fetch("http://localhost:3001/api/auth/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setSuccess("Account created successfully with userID: " + data.userID);
          setFormData({
            username: "", // Reset the form fields
            password: "",
            repeat_password: "",
            name: "",
            surname: "",
            email: "",
            phoneNumber: "",
            nationality: "",
            language: "",
          });
        } else {
          setSuccess(null);
          console.error("Failed to create an account");
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
    <form className="create-account-form" onSubmit={handleSubmit}>
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
      <input
        type="password"
        name="repeat_password"
        placeholder="Repeat Password"
        value={formData.repeat_password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        value={formData.surname}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="nationality"
        placeholder="Nationality"
        value={formData.nationality}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="language"
        placeholder="Language"
        value={formData.language}
        onChange={handleChange}
        required
      />
      <button type="submit">Create Account</button>
    </form>
  </div>
  );
}

export default CreateAccountLogIn;
