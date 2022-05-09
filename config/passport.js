const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const { User } = require('./../models/user/user');

// Google Token
passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try{
      const exitingUser = await User.findOne({"google.id": profile.id});
      if(exitingUser) return done(null, exitingUser);

      const newUser = new User({
        methods: 'google',
        google: {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        }
      });
      await newUser.save();
      done(null, newUser);

    }catch(error){
      done(error, false, error.message);
    }
    
  }
));

