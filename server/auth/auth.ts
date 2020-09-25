import { PassportStatic } from 'passport'
import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from 'passport-jwt'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function applyJwtStrategy(passport : PassportStatic) {
    const options : StrategyOptions = {
        jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey : '10801566a'
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
