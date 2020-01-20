const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function(req, res) {
  console.log('request web static ====> ', req);
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.REACT_APP_PORT || 7771;

app.listen(port, () => {
  console.log('sindata web running on port '+port)
});

