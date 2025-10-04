import User from'././../model/user.model.js'
import JWT from'jsonwebtoken'
import dotenv from'dotenv'
dotenv.config()

async function loginUser(req, res) {
    try {
        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
            {const token = JWT.sign({email: process.env.ADMIN_EMAIL, role: 'admin'}, process.env.JWT_SECRET, {issuer: 'https://localhost:5454', expiresIn: '1hr'})
            return res.status(200).json({message: 'Login successful', token})
    } else {
        return res.status(200).json({message: 'Invalid email or password'})
    }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

export {loginUser}