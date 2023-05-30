const User = require('../../models/users/users')
const customError = require('../../common/errors')

const CreateNewUser = async (req, res) => {
    try {
        const { name, login, password, group, attached_users } = req.body

        const user = await new User( { name, login, password, group, attached_users  } )

        const createdUser = await user.save()
        console.log(createdUser)
        if (createdUser) {
            return res.status( 201 ).json( {
                message: customError.user.success.add
            } )
        }
        if(result.status !== true) {
            return res.status(400).json(result)
        } else {
            return res.status(200).json(result)
        }
    } catch ( err ) {
        return res.status(500).json({
            message: customError.server.error,
            server: err
        })
    }
}

const GetUsers = async (req, res) => {
    try {
        const users = await User.find().sort( { "name": 1 } )
        return res.status( 200 ).json( users )
    } catch ( err ) {
        return res.status(500).json({
            message: customError.server.error
        })
    }
}

const GetUserById = async (req, res) => {
    try {

        const user = await User.findOne(  { _id: req.params.id  }   )

        if (user) {
            return res.status( 200 ).json( user )

        } else {
            return res.status( 400 ).json( customError.user.common.search.failed )
        }

    } catch ( err ) {

        return res.status(500).json({
            message: customError.server.error
        })
    }
}

const UpdateUserByID = async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const update = req.body

        const resUpdate = await User.findByIdAndUpdate( filter, update, {
            new: true
        })

        if(resUpdate) {
            return res.status( 200 ).json( { message: customError.user.success.update } )
        } else {
            return res.status( 400 ).json( { message: customError.user.failed.update } )
        }

    } catch ( err ) {
        return res.status( 500 ).json( { message: customError.server.error, error: err } )
    }
}

const DeleteUserByID = async (req, res) => {
    try {
        const resDelete = await User.findByIdAndDelete( req.params.id )

        if(resDelete) {
            return res.status( 200 ).json( { message: customError.user.success.delete} )
        } else {
            return res.status( 400 ).json( { message: customError.user.failed.delete } )
        }

    } catch ( err ) {
        return res.status( 500 ).json( { message: customError.server.error, error: err } )
    }
}


module.exports = {
    CreateNewUser,
    GetUsers,
    GetUserById,
    UpdateUserByID,
    DeleteUserByID
}