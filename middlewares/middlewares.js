const validationService = require('../services/validationService')
class Middlewares {
	async validateLoginData (req, res, next) {
		 try {
			 const result =  await validationService.validateLoginData(req.body)
			 if(result.status === false) {
				 res.send(result)
			 } else {
				 next()
			 }
		 } catch (e) {
			 throw new Error('Some error')
		 }
	}

	async validateUserData (req, res, next) {
		try {
			const result =  await validationService.validateUserData(req.body)
			if(result.status === false) {
				res.send(result)
			} else {
				next()
			}
		} catch (e) {
			throw new Error('Some error')
		}
	}


}

module.exports = new Middlewares()