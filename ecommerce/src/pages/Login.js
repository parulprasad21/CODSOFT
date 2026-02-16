import React, { useState } from "react";

function Login({ setIsLoggedIn, setShowSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email === "test@desikart.com" && password === "123456") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth">
      <h2>Login to DESIKART</h2>
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
      <button className="btn-login" onClick={handleLogin}>
        Login
      </button>
      <p className="switch-auth">
        New user?{" "}
        <span className="switch-link" onClick={() => setShowSignup(true)}>
          Create account
        </span>
      </p>
    </div>
  );
}

export default Login;
