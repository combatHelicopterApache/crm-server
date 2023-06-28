const User = require("../models/userModel");

module.exports = checkPermissions = (target) => async (req, res, next) => {
    try {
        const userData = await User.findById(req.user.id)
        const userPermissions = userData?.permissions[target]

        if(!userPermissions) {
            return res.status(401).json({message: 'You don\'t have permissions for this module'})
        }  else {
            next()
        }

    } catch (e) {
        res.status(500).json( { message: e.message } )
    }

}