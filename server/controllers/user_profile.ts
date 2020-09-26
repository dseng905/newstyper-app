import { Response, Request } from 'express'
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import jwtConfig from '../auth/passport_config'


const prisma = new PrismaClient()

interface CreateUserBody {
    email : string
    password : string
    first_name : string
    last_name : string
}

interface SignInBody {
    email : string
    password : string
}


function getSignedJwtToken(userId : number) {
    return jwt.sign({ userId }, jwtConfig.SECRET_KEY, {
        expiresIn: jwtConfig.EXPIRES_IN,
    })
}

export async function createUserProfile(req : Request, res : Response) {
    try {
        const {
            email, 
            password, 
            first_name: firstName, 
            last_name : lastName
        } = req.body as CreateUserBody

        //Validate email and password by checking if the account exists
        //the email is valid, and the password is longer than 10 char
        if(!validator.isEmail(email)) {
            res.status(403).send({error: "Email address is not valid."})
            return
        }

        const emailExists = await prisma.userProfile.findOne({where: {email}})
        if(emailExists) {
            res.status(403).send({error: "Email address is already registered."})
            return
        }

        const passwordLessThan10Char = !validator.isLength(password, {min : 10})
        if(passwordLessThan10Char) {
            res.status(403).send({error: "Password must be at least 10 characters."})
            return
        }

        //Create new user and save it onto the SQL database with Prisma
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.userProfile.create({
            data: {email, firstName, lastName, password: hashedPassword}
        })

        //Use new user profile info to create JWT token
        const token = getSignedJwtToken(user.id)

        //Send token to the client
        res.status(200).json({
            success: "User profile has been successfully created.", 
            token,
            expiresIn : jwtConfig.EXPIRES_IN,
            userId : user.id
        })
    }
    catch(e) {
        const error = e as Error
        res.status(500).json({error: error.message})
    }
}

export async function signInToUserProfile(req : Request, res : Response) {
    try {
        const { email, password } = req.body as SignInBody

        const user = await prisma.userProfile.findOne({where : {email}})
        if(!user) {
            res.send({error : "User does not exist."})
            return
        }

        const passwordCorrect = await bcrypt.compare(password, user!.password!)
        if(!passwordCorrect) {
            res.send({error: "Password is incorrect."})
            return
        }

        const token = getSignedJwtToken(user.id)

        res.status(200).json({
            success : "User has been successfully signed in.",
            token,
            expiresIn : jwtConfig.EXPIRES_IN,
            userId : user.id
        })
    }
    catch(e) {
        const error = e as Error
        res.status(500).send({error: error.message})
    }
    
}

export async function getUserProfileStatistics(req : Request, res : Response) {
    try {
        if(!req.user) {
            return res.send({error : "Failed to authenticate."})
        }

        const { userId } = req.user as { userId : number }
        const user = await prisma.userProfile.findOne({
            where: {id : userId}, 
            include: {userStatistics : true}
        })

        if(!user) {
            return res.send({error : "User does not exists."})
        }
        if(user.userStatistics) {
            return res.send(user.userStatistics)
        }

        //Craete new UserStatistics entry if it does not exist.
        const userStatistics = await prisma.userStatistics.create({
            data : {
                averageWpm : -1,
                dailyGoal : 3,
                dailyGoalArticlesCompleted : 0,
                totalArticlesCompleted : 0,
                userProfile : {connect : {id : userId}}
            }
        })
        res.send(userStatistics)
    }
    catch(e) {
        const error = e as Error
        res.send({error: error.message})
    }
}

export async function getUserProfile(req : Request, res : Response) {
    try {
        if(!req.user) {
            return res.send({error : "Failed to authenticate."})
        }

        const { userId : id } = req.user as { userId : number }
        const user = await prisma.userProfile.findOne({
            where : { id },
            select : {
                id : true, 
                email : true,
                firstName : true,
                lastName : true,
                userStatistics : true,
            }
        })

        if(!user) {
            return res.send({error : "User does not exist."})
        } else {
            return res.send(user)
        }
    }
    catch(e) {
        const error = e as Error
        res.send({error: error.message})
    }
}

export async function signOutOfUserProfile(req : Request, res : Response) {
    
}



