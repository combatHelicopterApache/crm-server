module.exports = checkRoleMiddleware = async (req, res, next) => {
    try {
        if (
            req.user.role_id !== 1 &&
            req.user.role_id !== 2 &&
            req.user.role_id !== 5
        ) {
            return res
                .status(403)
                .send({message: "No permissions for this request"})
        }
        next()
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}