//import npm package
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

//import function
import config from "./config";
import StaffRegisteration from "../models/staffRegisteration";

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretOrKey;

//import model
import Admin from "../models/admin";
// import User from "../models/User";

export const usersAuth = (passport) => {
  passport.use(
    "usersAuth",
    new JwtStrategy(opts, async function (jwt_payload, done) {
     await  StaffRegisteration.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        } else if (user) {
          let data = {
            Id: user._id,
            ArrestBy: user.Name,
            Department_name: user.Department,
            Incharge_year:user.InchargeYear,
            Incharge_section:user.InchargeSection,
            
          };
          return done(null, data);
        }
        return done(null, false);
      });
    })
  );
};

export const adminAuth = (passport) => {
  passport.use(
    "adminAuth",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      Admin.findById(jwt_payload._id, function (err, user) {
        if (err) {
          return done(err, false);
        } else if (user) {
          let data = {
            id: user._id,
            name: user.name,
          };
          return done(null, data);
        }
        return done(null, false);
      });
    })
  );
};
