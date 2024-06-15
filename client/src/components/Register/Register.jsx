import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../Slices/authSlice";
import "./register.css";
import register_banner from "../../assets/register_background.jpg";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await dispatch(register({ username, password })).unwrap();
      navigate("/login");
    } catch (err) {
      console.error("Failed to register:", err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="container d-flex main">
      <div className="wrap">
        <div className="register_banner">
          <img src={register_banner} alt="RegisterBanner" />
        </div>
        <div>
          <div className="register_form">
            <div className="register_heading">
              <h3>Register</h3>
              <h6>Enter your username and password below</h6>
            </div>
            <div className="form_inputs">
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <label>Confirm Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Enter your confirm password"
                  required
                />
                <div className="registerForm_btn">
                  <button type="submit">Register</button>
                  <p>
                    Already have an account?
                    <a href="#" onClick={handleLogin}>
                      Login
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
