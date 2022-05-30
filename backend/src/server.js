// server
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// db
const Connection = require('./connection');
const User = require('./models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const authenticToken = require('./middleware/authenticToken')
const secret = 'secret';

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/user', authenticToken, async (req, res) => {

  const response = await User.findById(req.user._id,
    ['user', 'email']
  );

  res.status(200).send({
    message : 'Valid token',
    data: {
      user: response.user,
      email: response.email
    }
  })

})

app.post('/login', async (req, res) => {

  const response = await User.findOne(
    { user: req.body.user },
    ['user', 'password']
  )

  if (response == null) {

    res.status(200).send({ message: 'Invalid user' })

  } else {

    bcrypt.compare(req.body.password, response.password, (err, result) => {

      if (err) {
        res.status(200).send({ message: 'Bcrypt error' })
      }

      if (result) {

        const token = jwt.sign(
          { _id: response._id },
          secret,
          { expiresIn: '5000' }
        )
        res.status(200).send({
          message: 'Login success',
          token: token
        });

      } else {
        res.status(200).send({ message: 'Invalid password' });
      }

    })

  }

});

app.post('/register', async (req, res) => {

  const responseUser = await User.findOne(
    { user: req.body.user },
    ['user']
  )

  const responseEmail = await User.findOne(
    { email: req.body.email },
    ['email']
  )

  if (responseUser != null) {

    // response if user is in use
    res.status(401).send({ message: 'User unavailable' });

  } else if (responseEmail != null) {

    // response if email is in use
    res.status(401).send({ message: 'E-mail unavailable' });

  } else {

    // if email and user is avaliable

    // encrypt the password
    bcrypt.hash(req.body.password, 10, async (err, hash) => {

      if (err) {

        // encryption error
        res.status(500).send({ message: 'Bcrypt error' });

      } else {

        // create account
        const user = new User({
          user: req.body.user,
          email: req.body.email,
          password: hash
        });
        await user.save();
        res.status(200).send({ message: 'Register success' });

      }

    })

  }

});


Connection('mongodb://localhost:27017/login');

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
});