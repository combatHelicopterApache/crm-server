const jwt = require("jsonwebtoken");

module.exports = checkCompanyIdMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const companyId = jwt.verify(token, process.env.JWT_SECRET)
        req.company_id = companyId.company_id
        next()
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}