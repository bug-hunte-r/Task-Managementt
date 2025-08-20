import { hash } from "bcryptjs"
import { sign } from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const hashPassHandler = async (password) => {
    const hashedPass = hash(password, 12)
    return hashedPass
}

const generateToken = ({ ...data }) => {
    const token = sign(data, process.env.privateKey)
    return token
}

export { hashPassHandler, generateToken }