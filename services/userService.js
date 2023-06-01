const User = require("../models/userModel")
const customMessages = require("../common/messages")
const Joi = require("joi")
const jwt = require("jsonwebtoken")
const conf = require("config")
const validationService = require('./validationService')


class UserService {
	async createNewUser(data, Model) {
		const { full_name, title, phone, email, password, role, role_id, group, is_admin, parent_id, child_id, company_id  } = data

		const candidate = await User.findOne({ email })

		if (candidate) {
			return { status: false, message: customMessages.user.failed.exists }
		}

		const user = await new User({ full_name, title, phone, email, password, role, role_id, group, is_admin, parent_id, child_id, company_id })

		const createdUser = await user.save()

		const userData = await this.prepareUserData(createdUser)
		if (createdUser) {
			return { status: true, message: customMessages.user.success.add, user: userData }
		} else {
			return { status: false, message: customMessages.user.failed.add }
		}
	}

	async getAll() {
		const users = await User.find().sort({ "created_at": 1 })

		const userData = users.reduce((acc, item) => {
			acc.push({
				id : item?._id,
				full_name: item?.full_name,
				title: item?.title,
				phone: item?.phone,
				email: item?.email,
				role: item?.role,
				role_id: item?.role_id,
				group: item?.group,
				is_admin: item?.is_admin,
				parent_id: item?.parent_id,
				child_id: item?.child_id,
				company_id: item?.company_id,
				created_at: item?.created_at,
				updated_at: item?.updated_at
			})

			return acc
		}, [])
		if (users) {
			return { status: true, data: userData }
		} else {
			return { status: false, message: customMessages.user.common.search.success }
		}
	}

	async getById(id) {

		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }

		const foundUser = await User.findById({ _id: id })
		const userData = await this.prepareUserData(foundUser)

		if (foundUser) {
			return { status: true, data: userData }
		} else {
			return { status: false, message: customMessages.user.common.search.failed, id: id }
		}
	}

	async getByToken(token) {

		const userId = jwt.verify(token, conf.get("JWT_SECRET")).id

		const user = await this.getById(userId)

		if (userId) {
			return { user }
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

		const userData = await this.prepareUserData(resUpdate)

		if (resUpdate) {
			return { status: true, message: customMessages.user.success.update, data: userData }
		} else {
			return { status: false, message: customMessages.user.failed.update }
		}

	}

	async deleteByID(id) {
		if (! await validationService.validateMongoId(id)) return { status: false, message: customMessages.id.error, id: id }

		const resDelete = await User.findByIdAndDelete(id)
		const userData = await this.prepareUserData(resDelete)
		if (resDelete) {
			return { status: true, code: 200, message: customMessages.user.success.delete, data: userData }
		} else {
			return { status: false, message: customMessages.user.failed.delete }
		}
	}

	async prepareUserData(data) {

		const userData = [data].reduce((acc, item) => {
				acc.id = item?._id,
				acc.full_name = item?.full_name,
				acc.title = item?.title,
				acc.phone = item?.phone,
				acc.email = item?.email,
				acc.role = item?.role,
				acc.role_id = item?.role_id,
				acc.group = item?.group,
				acc.is_admin = item?.is_admin,
				acc.parent_id = item?.parent_id,
				acc.child_id = item?.child_id,
				acc.company_id = item?.company_id,
				acc.created_at = item?.created_at,
				acc.updated_at = item?.updated_at

			return acc
		},{})

		return userData
	}


	async login(data) {

		const user = await User.findOne({ email: data.email, password: data.password })
		const userData = await this.prepareUserData(user)

		const tokenData = {
			id: userData.id,
			full_name: userData.full_name,
			role: userData.role,
			email: userData.email
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

	}
}


module.exports = new UserService()