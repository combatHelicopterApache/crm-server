const customError = require("../common/messages")
const userService = require('../services/userService')
const LoginUser = async (req, res) => {
	try {
		const result = await userService.login(req.body)

		if(result.status !== true) {
			return res.status(200).json(result)
		} else {
			return res.status(200).json(result)
		}
	} catch(err) {
		return res.status(500).json({message: customError.server.error, error: err})
	}
}

module.exports = {
	LoginUser
}