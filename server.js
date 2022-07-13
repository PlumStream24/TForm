const express = require('express');
const path = require('path');
const app = express();
let port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/dist/tform'));
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname+ '/dist/tform/index.html'));
});
app.listen(port);
console.log("Listening on port " + port);