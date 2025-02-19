import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "./api"; // Ensure this API function is correctly implemented

const SignupForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await signupUser(formData);

      if (response.success) {
        setMessage("Signup successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setMessage(response.message || "Signup failed");
      }
    } catch (error) {
      setMessage(error.message || "Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>

      {message && <p>{message}</p>}

      {message.includes("successful") ? (
        <p>
          <a href="/login">Click here to login</a>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <a href="/login" onClick={() => navigate("./LoginForm")}>
            Log in here
          </a>
        </p>
      )}
    </div>
  );
};

export default SignupForm;
