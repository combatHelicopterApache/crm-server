const jwt = require("jsonwebtoken");

module.exports = checkAuthMiddleware = async (req, res, next) => {
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