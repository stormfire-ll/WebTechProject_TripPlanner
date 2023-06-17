const express = require('express');
const app = express();
const patha = require('path');
const mime = require('mime');


// Serve static files from the "public" directory
app.use(express.static(patha.join(__dirname, '/public')));

// Other routes and middleware
app.get("/", (req, res) => {
   res.sendFile("./index.html", {root: __dirname});
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
