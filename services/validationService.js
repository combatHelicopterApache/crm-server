const mongoose = require("mongoose");
const customMessages = require("../common/messages");
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

	async validateLoginData(data) {
		const login = data.hasOwnProperty("email") ? data.email.split(" ").join("") : undefined
		const password = data.hasOwnProperty("password") ? data.password.split(" ").join("") : undefined

		if (login === "" || login === undefined) return {
			status: false,
			message: customMessages.login.failed.login.empty
		}
		if (!password || password === "" || password === undefined) return {
			status: false,
			message: customMessages.login.failed.password.empty
		}

		const loginSchema = Joi.object({
			login: Joi.string()
				.email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
			password: Joi.string()
				.min(8)
				.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{7,19}[@$!#%*?&A-Za-z\d]$/)
				.required()
		})

		const loginData = {
			login,
			password
		}

		const { error } = loginSchema.validate(loginData)
		if (error) {
			return { status: false, message: error.details[0].message }
		}

		return { status: true }

	}

	async checkUserPermissions () {

	}
}

module.exports =  new Validation()