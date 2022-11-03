//CITATION YOUTUBE TUTORIAL: THE NET NINJA, "MERN Authentiation Tuturial", 2022

const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async (req, res, next) => {

    //verify authentication
    const { authorization } = req.headers

    //Check if it has a value
    if (!authorization) {
        return res.status(401).json({error: 'Authorization token required'})
    }

    // NOTE: authorization looks like this 'Bearer djkfajfdljflasdjflsajfl.dkjfls'
    const token = authorization.split(' ')[1]

    try {
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({error: 'Request is not authrized'})
    }
}

module.exports = requireAuth