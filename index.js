require('dotenv').config();
const express = require('express');

// const app = express();
const app = require('./app');
const port = 8000;

app.get('/', (req, res) => {
  res.send('YUNEDA TEAM !');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
