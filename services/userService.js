const User = require("../models/user")
const customMessages = require("../common/messages")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const conf = require("config")


class UserService {
	async createNewUser(data) {
		const { full_name, login, email, password, role, group, is_admin, attached_users } = data

		const candidate = await User.findOne({ login })

		if (candidate) {
			return { status: false, message: customMessages.user.failed.exists }
		}

		const user = await new User({ full_name, login, email, password, role, group, is_admin, attached_users })

		const createdUser = await user.save()


		if (createdUser) {
			return { status: true, message: customMessages.user.success.add , user: createdUser }
		} else {
			return { status: false, message: customMessages.user.failed.add }
		}
	}

	async getAll() {
		const users = await User.find().sort({ "name": 1 })

		if (users) {
			return { status: true, data: users }
		} else {
			return { status: false, message: customMessages.user.success.add }
		}
	}

	async getById(id) {
		const foundUser = await User.findById({ _id: id })

		if (foundUser) {
			return foundUser
		} else {
			return { status: false, message: customMessages.user.common.search.failed, id: id }
		}
	}

	async getByToken(token) {

		const userId = jwt.verify(token, conf.get("JWT_SECRET")).id

		const user = await this.getById(userId)

		if (userId) {
			return { status: true, data: user }
		} else {
			return { status: false, message: customMessages.user.common.search.failed }
		}
	}

	async updateByID(data) {
		const filter = { _id: req.params.id }
		const update = req.body

		const resUpdate = await User.findByIdAndUpdate(filter, update, {
			new: true
		})

		if (resUpdate) {
			return res.status(200).json({ message: customMessages.user.success.update })
		} else {
			return res.status(400).json({ message: customMessages.user.failed.update })
		}

	}

	async deleteByID(data) {
		const resDelete = await User.findByIdAndDelete(req.params.id)

		if (resDelete) {
			return res.status(200).json({ message: customMessages.user.success.delete })
		} else {
			return res.status(400).json({ message: customMessages.user.failed.delete })
		}
	}

	async validateLoginData(data) {
		const login = data.hasOwnProperty("login") ? data.login.split(" ").join("") : undefined
		const password = data.hasOwnProperty("password") ? data.password.split(" ").join("") : undefined


		if (login === "" || login === undefined) return { status: false, message: customMessages.login.failed.login.empty }
		if (!password || password === "" || password === undefined) return {
			status: false,
			message: customMessages.login.failed.password.empty
		}


		const loginSchema = Joi.object({
			login: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
			password: Joi.string().min(8).pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required()
		})

		const loginData = {
			login,
			password
		}

		const { error, value } = loginSchema.validate(loginData)

		if (error) {
			return { status: false, message: error.details[0].message }
		} else {
			return { status: true }
		}
	}

	async login(data) {

		try {

			const validation = await this.validateLoginData(data)

			if (validation.status === true) {
				const user = await User.findOne({ login: data.login, password: data.password })

				const userData = [user].reduce((acc, item) => {
						acc.id = item?.id,
						acc.full_name = item?.full_name,
						acc.login = item?.login,
						acc.email = item?.email,
						acc.role = item?.role,
						acc.group = item?.group,
						acc.is_admin = item?.is_admin,
						acc.attached_users = item?.attached_users
					return acc
				}, {})

				const tokenData = {
					id: userData.id,
					full_name: userData.full_name,
					role: userData.role,
					login: userData.login
				}

				const token = jwt.sign( tokenData , conf.get("JWT_SECRET"), {expiresIn: '12h'})

				if (!user) {
					return { status: false, message: customMessages.login.failed.match }
				} else {
					return {
						status: true,
						message: customMessages.login.success,
						token:  token,
						data:  userData
					}
				}
			} else {
				return { status: false, message: validation.message }
			}


		} catch (e) {
			throw new Error(customMessages.server.error)
		}
	}
}


module.exports = new UserService()