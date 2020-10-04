import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions, VerifyCallbackWithRequest } from 'passport-jwt'
import jwtConfig from './passport_config'


export interface AuthUser {
    userId? : number
}

function applyJwtStrategy(passport : PassportStatic) {
    const options : StrategyOptions = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : jwtConfig.SECRET_KEY,
    }

    passport.use('jwt', new JwtStrategy(options, (payload, done) => {
        try{
            return done(null, <AuthUser>{ userId : payload.userId })
        }
        catch(e) {
            return done(e, false)
        }
    })) 
}

export default applyJwtStrategy
