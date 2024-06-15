import React, { useEffect } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import HomePage from "./components/HomePage/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth, login } from "./Slices/authSlice";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    const savedToken = localStorage.getItem("accessToken");
    const savedUser = localStorage.getItem("user");

    if (savedToken && savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch(login({ token: savedToken, user }));
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
        // Optionally, remove corrupted user data from localStorage
        localStorage.removeItem("user");
      }
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      {!auth.isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
