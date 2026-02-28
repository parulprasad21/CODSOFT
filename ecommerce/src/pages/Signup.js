import React, { useState } from "react";
import axios from "axios";

function Signup({ setShowSignup }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name: fullName,
          email,
          password
        }
      );

      alert("Account created! You can now login.");
      setShowSignup(false);

    } catch (error) {
      alert("User already exists");
    }
  };

  return (
    <div className="auth">
      <h2>Create DESIKART Account</h2>

      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <button className="btn-login" onClick={handleSignup}>
        Signup
      </button>

      <p className="switch-auth">
        Already have an account?{" "}
        <span
          className="switch-link"
          onClick={() => setShowSignup(false)}
        >
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;