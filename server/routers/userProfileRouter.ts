import express from 'express'
import * as UserProfile from '../controllers/user_profile'
import articleRouter from './articleRouter'
import passport from 'passport'
import '../auth/auth'


const userProfileRouter = express.Router()

userProfileRouter.route('/')
    .get(passport.authenticate('jwt', {session : false}), UserProfile.getUserProfileStatistics)

userProfileRouter.post('/create', UserProfile.createUserProfile)

userProfileRouter.post('/signin', UserProfile.signInToUserProfile)

userProfileRouter.post('/signout', UserProfile.signOutOfUserProfile)

userProfileRouter.use('/article', articleRouter)

export default userProfileRouter