import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import jwtConfig from './passport_config'

function applyJwtStrategy(passport : PassportStatic) {
    const options : StrategyOptions = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : jwtConfig.SECRET_KEY
    }

    passport.use('jwt', new JwtStrategy(options, async (payload, done) => {
        try{
            return done(null, {
                userId : payload.userId
            })
        }
        catch(e) {
            return done(e, false)
        }
    })) 
}

export default applyJwtStrategy
