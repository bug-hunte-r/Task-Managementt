import { compare, hash } from "bcryptjs"
import { sign, verify } from 'jsonwebtoken'
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

const veryfiTokenHandler = async (token) => {
    try {
        const verifiedToken = verify(token, process.env.privateKey)
        return verifiedToken
    } catch (error) {
        console.log(error);
    }
}

export { hashPassHandler, generateToken, verifyPassHandler, veryfiTokenHandler }