'use strict'
const router = require('express').Router();

// Authenication
const jwt = require('jsonwebtoken');
const passport = require('passport');

// config package used to manage configuration options
const config = require('config');

// Read secret key from config
const keys = config.get('keys');

// POST login.
// Send username and password via request body from a login form, etc.
router.post('/auth', async (req, res) => {
  // use passport to authenticate - uses local middleware
  // session false as this API is stateless
  passport.authenticate(
    'local',
    { session: false }, (error, user, info) => {
      // authentication fails - return error
      if (error || !user) {
        res.status(400).json({
          message: info ? info.message : 'Login failed',
          user: user
        });
      }

      // Define the JWT contents - be careful: including email here but is that a good idea?
      const payload = {
        username: user.email,
        // process.env.JWT_EXPIRATION_MS, 10
        // Set expiry to 30 minutes
        expires: Date.now() + (1000 * 60 * 30),
      };

      //assigns payload to req.user
      req.login(payload, { session: false }, (error) => {
        if (error) {
          res.status(400).send({ error });
        }
        // generate a signed json web token and return it in the response
        const token = jwt.sign(JSON.stringify(payload), keys.secret);

        // add the jwt to the cookie and send
        res.cookie('jwt', token, { httpOnly: true, secure: false });
        res.status(200).send({ "user": user.email, token });
      });
    },
  )(req, res);
});

// logout
router.get('/logout', async (req, res) => {
    try {
        // add the jwt to the cookie and send
        res.clearCookie('jwt', {path: '/'});
        return res.status(200).send({"message": "Logged out"});
    // Catch and send errors
    } catch (err) {
        res.status(500)
        res.send(err.message)
    }
});

module.exports = router;