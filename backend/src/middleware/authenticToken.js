const jwt = require('jsonwebtoken');

const secret = 'secret';

module.exports = (req, res, next) => {

  console.log(req.body.token);

  try {

    const decode = jwt.verify(req.body.token, secret)
    req.user = decode;
    next();
    
  } catch (err) {
    res.status(200).send({ message: 'Invalid token' })
  }

}