const validationService = require("../services/validationService")
const jwt = require("jsonwebtoken")


class Middlewares {
    async validateLoginDataMiddleware(req, res, next) {
        try {
            const result = await validationService.validateLoginData(req.body)
            if (result.status === false) {
                res.send(result)
            } else {
                next()
            }
        } catch (e) {
            throw new Error("Some error")
        }
    }

    async validateUserDataMiddleware(req, res, next) {
        try {
            const result = await validationService.validateUserData(req.body)
            if (result.status === false) {
                res.send(result)
            } else {
                next()
            }
        } catch (e) {
            throw new Error("Some error")
        }
    }

    async checkCompanyIdMiddleware (req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            if (!token) {
                return res
                    .status(403)
                    .send( { message: "Authorization required for this request!" } )
            }

            req.user = jwt.verify(token, process.env.JWT_SECRET)
            next()

        } catch (e) {
            throw new Error(e)
        }
    }

    async checkRoleMiddleware(req, res, next) {
        try {
            if (req.user.role_id !== 1 && req.user.role_id !== 2 && req.user.role_id !== 3) {
                return res
                    .status(403)
                    .send({message: "No permissions for this request"})
            }
            next()
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async checkCompanyIdMiddleware (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const companyId = jwt.verify(token, process.env.JWT_SECRET);
            req.company_id = companyId.company_id
            next()
        } catch (e) {
            res.status(500).send(e)
        }
    }

}

module.exports = new Middlewares()
