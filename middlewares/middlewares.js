const validationService = require("../services/validationService")
const jwt = require("jsonwebtoken")

class Middlewares {
    async validateLoginDataMiddleware(req, res, next) {
        try {
            const result = await validationService.validateLoginData(req.body)
            if (result.status === false) {
                return res
                    .status(result.code)
                    .send({message: "Authorization required for this request!"})
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

    async checkAuthMiddleware(req, res, next) {
        try {
            const token = req.headers.authorization?.split(" ")[1]
            // console.log(token)
            if (!token) {
                return res
                    .status(401)
                    .send({message: "Authorization required for this request!"})
            }

            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)

            if(Object.keys(verifiedToken).length === 0) {
                return res
                    .status(401)
                    .send({message: "Unauthorized!"})
            }
            req.user = verifiedToken
            next()
        } catch (e) {
            res.status(401).json({message: "Unauthorized!"})
        }
    }

    async checkRoleMiddleware(req, res, next) {
        try {
            if (
                req.user.role_id !== 1 &&
                req.user.role_id !== 2 &&
                req.user.role_id !== 3
            ) {
                return res
                    .status(403)
                    .send({message: "No permissions for this request"})
            }
            next()
        } catch (e) {
            res.status(500).send(e)
        }
    }

    async checkCompanyIdMiddleware(req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1]
            const companyId = jwt.verify(token, process.env.JWT_SECRET)
            req.company_id = companyId.company_id

            next()
        } catch (e) {
            res.status(500).send(e)
        }
    }
}

module.exports = new Middlewares()
