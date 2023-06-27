const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const userRest = require('../const/user')
module.exports = checkRestriction = (target, type, needle) => async (req, res, next) => {
    try {
        // type = component, general
        // target - route element (lead, user ...)
        // type - crud restrictions or
        // console.log(restriction)

        const userData = await User.findById(req.user.id)
        const userRestriction = userData?.restrictions[target][needle]

        if(userRestriction.includes(5)) { return next() }

        switch (req.method) {
            case 'POST'                         : return !userRestriction.includes(1) ? res.status(401).json({message: 'You don\'t have restrictions'}) : next()
            case 'UPDATE' || 'PUT' ||  'PATCH'  : return !userRestriction.includes(2) ? res.status(401).json({message: 'You don\'t have restrictions'}) : next()
            case 'DElETE'                       : return !userRestriction.includes(3) ? res.status(401).json({message: 'You don\'t have restrictions'}) : next();
            case 'GET'                          : return !userRestriction.includes(4) ? res.status(401).json({message: 'You don\'t have restrictions'}) : next()
            default                             : return res.status(401).json({message: 'You don\'t have restrictions'})
        }
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}