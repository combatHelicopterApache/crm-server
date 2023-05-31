const userService = require('../services/userService')

class UserController {
    async crateUser (req, res, next)  {
        try {
            const result = await userService.createNewUser(req.body)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async getUsers (req, res, next)  {
        try {
            const result = await userService.getAll()
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async getUserById (req, res, next)  {
        try {
            const { id } = req.params
            const result = await userService.getById(id)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async getUserByToken (req, res, next)  {
        try {
            const { token } = req.query
            const result = await userService.getByToken(token)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async updateUserByID (req, res, next)  {
        try {
            const { id } = req.params.id
            const result = await userService.updateByID(id)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async deleteUserByID (req, res, next)  {
        try {
            const { id } = req.params.id
            const result = await userService.deleteByID(id)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

    async loginUser (req, res, next) {
        try {
            const result = await userService.login(req.body)
            return res.json(result)
        } catch ( err ) {
            return res.status(500).json( { message: err } )
        }
    }

}




module.exports =  new UserController()