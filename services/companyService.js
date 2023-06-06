const customMessages = require("../common/messages")
const companyModel = require("../models/companyModel")
const validationService = require("./validationService")

class CompanyService {
	async getCompanies() {
		const result = await companyModel.find()

		if (!result) {
			return { status: false, message: customMessages.company.failed.get  }
		}
		const prepareResult = result?.reduce((acc, item, idx) => {
			acc.push({
				address: item.addrees,
				admin_email: item.admin_email,
				admin_name: item.admin_name,
				admin_phone: item.admin_phone,
				company_email: item.company_email,
				company_identifier: item.company_identifier,
				company_name: item.company_name,
				company_phone: item.company_phone,
				createdAt: item.createdAt,
				notes: item.notes,
				title: item.title,
				updatedAt: item.updatedAt,
				id: item._id,
				status: item.status,
				key: idx,
			})
			return acc
		}, [])

		return { status: true, message: customMessages.company.success.get, data: prepareResult, count: prepareResult.length }
	}

	async createCompany(data) {
		const result = await new companyModel(data)

		await result.save()
		const userData = await this.prepareCompanyData(result)
		if (result) {
			return { status: true, message: customMessages.company.success.add, data: userData  }
		} else {
			return { status: false, message: customMessages.company.failed.add }
		}
	}

	async updateCompany() {

	}

	async deleteCompany(id) {
		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }
		const result = await companyModel.findByIdAndDelete({id})
		const userData = await this.prepareCompanyData(result)
		if (result) {
			return { status: true, message: customMessages.company.success.delete, data: userData }
		} else {
			return { status: false, message: customMessages.company.failed.delete }
		}
	}


	async prepareCompanyData(data) {

		return [data].reduce((acc, item, idx) => {
				acc.address= item.addrees,
				acc.admin_email= item.admin_email,
				acc.admin_name= item.admin_name,
				acc.admin_phone= item.admin_phone,
				acc.company_email = item.company_email,
				acc.company_identifier= item.company_identifier,
				acc.company_name = item.company_name,
				acc.company_phone = item.company_phone,
				acc.createdAt = item.createdAt,
				acc.notes= item.notes,
				acc.title= item.title,
				acc.updatedAt= item.updatedAt,
				acc.id= item._id,
				acc.status= item.status,
				acc.key= idx
			return acc
		},{})

	}
}



module.exports = new CompanyService()