import { compare, hash } from "bcryptjs"
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

const verifyPassHandler = async (password, hashedPassword) => {
    const verifiedPass = compare(password, hashedPassword)
    return verifiedPass
}

export { hashPassHandler, generateToken, verifyPassHandler }