const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "this-is-secret",
};

const JWTStrategy = new Strategy(option, async (payload, done) => {
  const user = await User.findById(payload.id);

  if (user) done(null, user);
  else doNotTrack(null, false);
});

passport.use("jwt", JWTStrategy);
