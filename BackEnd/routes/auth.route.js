import express from 'express'
import { linkedInCallback, getUser } from '../controllers/Auth.controller.js'

const AuthRoutes = express.Router()

AuthRoutes.get('/callback', linkedInCallback)
AuthRoutes.get('/get-user', getUser)


export default AuthRoutes;