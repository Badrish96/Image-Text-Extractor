import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, selectAuth } from "../../Slices/authSlice";
import { useNavigate } from "react-router-dom";
import "../Register/register.css";
import register_banner from "../../assets/register_background.jpg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(selectAuth);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username, password })).then(() => {
      navigate("/home");
    });
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div>
      <div className="container d-flex main">
        <div className="wrap">
          <div className="register_banner">
            <img src={register_banner} alt="RegisterBanner" />
          </div>
          <div>
            <div className="register_form">
              <div className="register_heading">
                <h3>Log In</h3>
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
                  <div className="registerForm_btn">
                    <button type="submit" disabled={loading}>
                      {loading ? "Logging in..." : "Log In"}
                    </button>
                    {error && <p className="error">{error}</p>}
                    <p>
                      {"Don't have an account?"}
                      <a href="#" onClick={handleRegister}>
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
