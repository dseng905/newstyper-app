"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_jwt_1 = require("passport-jwt");
var passport_config_1 = __importDefault(require("./passport_config"));
function applyJwtStrategy(passport) {
    var options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: passport_config_1.default.SECRET_KEY,
    };
    passport.use('jwt', new passport_jwt_1.Strategy(options, function (payload, done) {
        try {
            return done(null, { userId: payload.userId });
        }
        catch (e) {
            return done(e, false);
        }
    }));
}
exports.default = applyJwtStrategy;
