//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
// NOTES: Will add more to the schema, such as name, city, etc
// I would also like to add different validations validator offers

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
 
})

// static signup method
// We use regular function so we can refrence the model'this'
userSchema.statics.signup = async function(email, password) {

  // validation: email or password filled
  if (!email || !password ){
    throw Error('All fields must be filled')
  }

  // validation: check if valid email
  if (!validator.isEmail(email)){
    throw Error('Email is not valid')
  }

  // validation: check if password strong enough
  if (!validator.isStrongPassword(password)){
    throw Error('Password not strong enough')

  }

  // validation: email already exist check
  const exists = await this.findOne({ email })
  if (exists) {
    throw Error('Email already in use')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ email, password: hash })

  return user
}


// static login method
userSchema.statics.login = async function(email, password) {

   // validation: email or password filled
   if (!email || !password ){
    throw Error('All fields must be filled')
  }

  // find the user with the email
  const user = await this.findOne({ email })

  if (!user) {
    throw Error('Incorrect email')
  }

  // password: plain text password
  // user.password: hashed password
  const match = await bcrypt.compare(password, user.password)

  // password doesn't match
  if (!match) {
    throw Error('Incorrect password')
  }

  return user
}


module.exports = mongoose.model('User', userSchema)