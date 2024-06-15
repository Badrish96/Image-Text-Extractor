const tesseract = require("tesseract.js");
const Image = require("../Models/imageModel");

exports.postImage = async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;
    const base64Image = imageBuffer.toString("base64");
    const result = await tesseract.recognize(imageBuffer, "eng");
    const text = result.data.text;

    // Extract bold words (for demo purposes, we assume bold words are surrounded by ** in the text)
    const boldWords = [];
    const regex = /\*\*(.*?)\*\*/g;
    let match;
    while ((match = regex.exec(text)) !== null) {
      boldWords.push(match[1]);
    }

    const newImage = new Image({
      image: base64Image,
      text: text,
      boldWords: boldWords,
      user: req.user.id,
    });

    await newImage.save();

    res.json({
      _id: newImage._id,
      image: base64Image,
      text: text,
      boldWords: boldWords,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// exports.getImage = async (req, res) => {
//   try {
//     const images = await Image.find({ user: req.user.id });
//     res.json(images);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server error");
//   }
// };
