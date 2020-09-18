import express  from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import helmet from 'helmet'

const app = express()

const PORT : string | number = process.env.PORT || 5000

app.use(cors())
app.use(helmet())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())



app.use((_req, res, _next) => {
    res.status(404).send("Page cannot be found.")
})

app.listen(PORT, () => {
    console.log("Server is listening in PORT " + PORT)
})