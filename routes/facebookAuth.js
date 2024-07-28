const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const express = require('express');
const User = require('../models/user.js');

const router = express.Router();
require('dotenv').config();

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET_KEY,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails'] // כולל את השדה emails
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        let user = await User.findOne({
          accountId: profile.id,
          provider: 'facebook',
        });

        if (!user) {
          console.log('Adding new facebook user to DB..');
          user = new User({
            accountId: profile.id,
            name: profile.displayName,
            provider: profile.provider,
            email: profile.emails && profile.emails.length ? profile.emails[0].value : undefined // מוסיף את האימייל אם קיים
          });
          await user.save();
        } else {
          console.log('Facebook User already exists in DB..');
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

router.get('/', passport.authenticate('facebook', { scope: ['email'] }));

router.get(
  '/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/auth/facebook/error',
  }),
  function (req, res) {
    // Successful authentication, redirect to success screen.
    res.redirect('/home');
  }
);

router.get('/success', async (req, res) => {
  const userInfo = {
    id: req.user.id,
    displayName: req.user.name,
    provider: req.user.provider,
  };
  res.render('fb-github-success', { user: userInfo });
});

router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

router.get('/signout', (req, res) => {
  try {
    req.logout(err => {
      if (err) { return next(err); }
      req.session.destroy(function (err) {
        if (err) { return next(err); }
        console.log('session destroyed.');
        res.render('auth');
      });
    });
  } catch (err) {
    res.status(400).send({ message: 'Failed to sign out fb user' });
  }
});

module.exports = router;
