import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, logout as userLogout } from "../../Slices/authSlice";
import { uploadImage, selectImages } from "../../Slices/imageSlice";
import "./homepage.css";
const HomePage = () => {
  const [file, setFile] = useState(null);
  const { token, isAuthenticated } = useSelector(selectAuth);
  const { images, loading, error } = useSelector(selectImages);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log(file);
    console.log(token);
    if (file && token) {
      dispatch(uploadImage({ file, token }));
    }
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <div className="container">
      <div className="homepage_header">
        <h1>Image To Text Converter</h1>
        {isAuthenticated && (
          <div className="logout_btn">
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="upload_file">
          <input
            type="file"
            onChange={handleFileChange}
            className="choose_opt"
          />
          <button type="submit" className="upload_btn">
            Upload
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        {images.map((img) => (
          <div key={img._id} className="image_text">
            <div className="image_box">
              <img
                src={`data:image/jpeg;base64,${img.image}`}
                alt="uploaded"
                className="uploaded_img"
              />
            </div>
            <h5>Copy Your Text Here:</h5>
            <div className="extracted_text">
              <p>{img.text}</p>
              <strong>Bold Words:</strong>
              <ul>
                {img.boldWords.map((word, index) => (
                  <li key={index}>{word}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
