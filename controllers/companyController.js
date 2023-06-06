
const companyService = require('../services/companyService')

class CompanyController {
	async getCompanies(req, res) {
		try {
			const result = await companyService.getCompanies(req.body)
			return res.send(result)
		} catch ( err ) {
			return res.status(500).send( { message: err } )
		}
	}

	async createCompany(req, res) {
		try {
			const result = await companyService.createCompany(req.body)
			return res.send(result)
		} catch ( err ) {
			return res.status(500).send( { message: err } )
		}
	}

	async updateCompany(req, res) {
		try {
			const result = await companyService.updateCompany()
			return res.send(result)
		} catch ( err ) {
			return res.status(500).send( { message: err } )
		}
	}

	async deleteCompany(req, res) {
		try {
			const result = await companyService.deleteCompany(req.params.id)
			return res.send(result)
		} catch ( err ) {
			return res.status(500).send( { message: err } )
		}
	}


}


module.exports = new CompanyController()