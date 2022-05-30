const express = require('express');
const path = require('path');

const dirname = path.resolve();

const app = express();

app.get('/login', (req, res) => {
  res.status(200).sendFile(dirname + '/src/screens/login/index.html')
})

app.get('/register', (req, res) => {
  res.status(200).sendFile(dirname + '/src/screens/register/index.html')
})

app.get('/user', (req, res) => {
  res.status(200).sendFile(dirname + '/src/screens/user/index.html')
})

app.get('/styles', (req, res) => {
  res.status(200).sendFile(dirname + '/src/assets/styles/styles.css')
})



app.listen(5000, () => {
  console.log('Server is running at http://localhost:5000')
})