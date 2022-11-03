//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022
const User = require('../models/userModel')
const jwt= require('jsonwebtoken')


// Generate JWT
const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn:'30d'})
}

// login a user
const loginUser = async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.login(email, password)
    // create a token
    //const token =createToken(user._id)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: createToken(user._id)
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


// signup a user
const signupUser = async (req, res) => {
  const {name, email, password, city, state, zip} = req.body
  try {
    const user = await User.signup(name, email, password, city, state, zip)
    // create a token
    //const token = createToken(user._id)
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      city: user.city,
      state: user.state,
      zip: user.zip,
      token: createToken(user._id)
    })
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}


module.exports = { signupUser, loginUser }