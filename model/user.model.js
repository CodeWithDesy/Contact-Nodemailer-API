import mongoose from'mongoose'
import bcrypt from'bcryptjs'
import JWT from'jsonwebtoken'
const {Schema} = mongoose

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

const User = mongoose.model('User', userSchema)

userSchema.pre('save', function () {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(this.password, salt)
  hash = this.password
})

userSchema.method('checkPassword', function (password) {
  let valid = bcrypt.compareSync(password, this.password)
  return valid
})

userSchema.method('generateToken', function () {
  let token = JWT.sign({_id: this._id, email: this.email,}, process.env.JWT_SECRET, {issuer: 'https://localhost:8484', expiresIn: '1hr'})
  return token
})

export default {User}