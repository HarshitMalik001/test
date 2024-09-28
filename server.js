var express = require('express');
var app = express();
var path = require('path');

// Serve static files from the 'frontend' folder
app.use(express.static("frontend"));

// Route for the root URL ("/")
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend', 'index.html'));
});

// Use the port assigned by Vercel or default to 3000 for local development
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;


