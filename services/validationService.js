const mongoose = require("mongoose");
const Joi = require("joi");

class Validation {
	async validateMongoId (id) {
		return mongoose.Types.ObjectId.isValid(id)
	}

	async validateEmail (email) {
		const emailSchema = Joi.string().email({ minDomainSegments: 2 } )

		const { error } = emailSchema.validate(email)

		if (error) {
			return { status: false, message: error.details[0].message }
		} else {
			return { status: true }
		}
	}

	async validatePassword (password) {

		const passwordSchema = Joi.string()
			.min(8)
			.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,19}[@$!#%*?&A-Za-z\d]$/)
			.required()

		const { error } = passwordSchema.validate(password)

		if (error) {
			return { status: false, message: error.details[0].message }
		} else {
			return { status: true }
		}

	}

	async validateUserData (data) {

		const { password, email } = data

		const vEmail = await this.validateEmail(email)
		const vPass = await this.validatePassword(password)

		if (vEmail.status === false) {
			return { status: false, message: vEmail.message }
		}

		if (vPass.status === false) {
			return { status: false, message: vPass.message }
		}
		return { status: true }
	}

}

module.exports =  new Validation()