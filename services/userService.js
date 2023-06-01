const User = require("../models/userModel")
const customMessages = require("../common/messages")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const conf = require("config")
const validationService = require('./validationService')


class UserService {
	async createNewUser(data, Model) {
		const { full_name, email, password, role, group, is_admin } = data

		const candidate = await User.findOne({ email })

		if (candidate) {
			return { status: false, message: customMessages.user.failed.exists }
		}

		const user = await new User({ full_name, email, password, role, group, is_admin })

		const createdUser = await user.save()


		if (createdUser) {
			return { status: true, message: customMessages.user.success.add, user: createdUser }
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

		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }

		const foundUser = await User.findById({ _id: id })

		if (foundUser) {
			return { status: true, data: foundUser }
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

	async updateByID(id, data) {
		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }
		const filter = { _id: id }

		const resUpdate = await User.findByIdAndUpdate(filter, data, {
			new: true
		})

		if (resUpdate) {
			return { status: true, message: customMessages.user.success.update, data: resUpdate }
		} else {
			return { status: false, message: customMessages.user.failed.update }
		}

	}

	async deleteByID(id) {
		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }

		const resDelete = await User.findByIdAndDelete(id)

		if (resDelete) {
			return { status: true, code: 200, message: customMessages.user.success.delete, data: resDelete }
		} else {
			return { status: false, message: customMessages.user.failed.delete }
		}
	}





	async login(data) {
		try {
			const validation = await validationService.validateLoginData(data)

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

				const token = jwt.sign(tokenData, conf.get("JWT_SECRET"), { expiresIn: "12h" })

				if (!user) {
					return { status: false, message: customMessages.login.failed.match }
				} else {
					return {
						status: true,
						message: customMessages.login.success,
						token: token,
						data: userData
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