import React, { useState } from "react";

function Signup({ setShowSignup }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (!fullName || !email || !password) {
      alert("Please fill all fields");
      return;
    }
    alert("Account created! You can now login.");
    setShowSignup(false);
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
        <span className="switch-link" onClick={() => setShowSignup(false)}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Signup;
