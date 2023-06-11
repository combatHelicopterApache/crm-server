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

  async checkRoleMiddleware(req, res, next) {
    try {
      const token =  req.headers.authorization.split(" ")[1]

      if (!token) {
        return res
          .status(403)
          .send({ message: "No permission for this request" })
      }

      const decoded =  jwt.verify(token, process.env.JWT_SECRET)
      if (decoded.role_name !== "ADMIN") {
        return res
          .status(403)
          .send({ message: "No permission for this request" })
      }
      req.user = decoded


      next()
    } catch (e) {
    res.status(500).send( e)
    }
  }

}

module.exports = new Middlewares()
