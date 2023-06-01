const validationService = require('../services/validationService')
class Middlewares {
	async validateLoginData (req, res, next) {
		 await validationService.validateLoginData(req.body)
		 next()
	}
}

module.exports = new Middlewares()