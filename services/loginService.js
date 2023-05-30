const User = require("../models/users/users");
const customError = require("../common/errors");
const jwt = require('jsonwebtoken')
const conf = require("config")
const Joi = require('joi');

const validationLoginData = async (data) => {

	const login = data.hasOwnProperty('login') ? data.login.split(" ").join("") : undefined
	const password = data.hasOwnProperty('password') ? data.password.split(" ").join("") : undefined


	if(login === '' || login === undefined ) return { status: false, message: customError.login.failed.login.empty }
	if(!password || password === '' || password === undefined ) return { status: false, message: customError.login.failed.password.empty }


	const loginSchema = Joi.object({
		login: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
		password: Joi.string().min(8).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
	});

	const loginData = {
		login,
		password
	}

	const { error, value } = loginSchema.validate(loginData);

	if (error) {
		return { status: false, message: error.details[0].message }
	} else {
		return { status: true  }
	}
}

const loginService = async (data) => {
	try {

		const validation = await validationLoginData(data)

		if(validation.status === true) {
			const user = await User.findOne( { login: data.login, password: data.password } )

			const preparedDataUser =  [user].reduce((acc, item) => {
				acc.id = item?.id,
				acc.name = item?.name,
				acc.login = item?.login
				return acc
			}, {})

			const userData = jwt.sign({preparedDataUser}, conf.get('jwtSecret') )

			if (!user) {
				return { status: false, message: customError.login.failed.match }
			} else {
				return {
					status: true,
					message: customError.login.success,
					token: await userData,
					data: await preparedDataUser
				}
			}
		} else {
			return { status: false, message: validation.message }
		}


	} catch (e) {
		throw new Error(customError.server.error)
	}
}

module.exports = {
	loginService
}