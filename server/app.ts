import express  from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import helmet from 'helmet'

import userProfileRouter from './routers/userProfileRouter'
import passport from 'passport'
import applyJwtStrategy from './auth/auth'

const app = express()

const PORT : string | number = process.env.PORT || 5000

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(helmet())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())

applyJwtStrategy(passport)
app.use(passport.initialize())

app.use('/user_profile', userProfileRouter)

app.use((_req, res, _next) => {
    res.status(404).send("Page cannot be found.")
})

app.listen(PORT, () => {
    console.log("Server is listening in PORT " + PORT)
})