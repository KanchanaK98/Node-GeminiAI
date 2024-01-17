const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const sendResponse = require("./Routes/mainRoute")
// Enable CORS
app.use(cors());
app.use(bodyParser.json());



// app.post('/processImage', (req, res) => {
//   // Assuming you have an image processing function in yourImageScript.js
//   // const { image } = req.body;
//   // const result = processImage(image);
//   // res.json({ result });
//   //res.json({ message: 'Image processing endpoint not implemented yet.' });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/text",sendResponse);
