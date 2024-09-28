var express = require('express');
var app = express();

app.get('/test', (req, res) => {
  res.send("Test route works!");
});
// Serve static files from the 'frontend' directory
app.use("/", express.static("./frontend"));

// Use the port assigned by Vercel or default to 3000 for local development
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;

