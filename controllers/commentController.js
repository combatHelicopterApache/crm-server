const commentService = require("../services/commentService");

class CommentController {
    async createNewComment(req, res) {
        try {
            const result = await commentService.createNew(req);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async getCommentById(req, res) {
        try {
            const result = await commentService.getByElementId(req.params);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async updateCommentById(req, res) {
        try {
            const result = await commentService.updateByID(req.params);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }

    async deleteCommentById(req, res) {
        try {
            const result = await commentService.deleteByID(req.params.id, req.user);
            return res.status(result.code).send(result);
        } catch (err) {
            return res.status(500).json({message: err.message});
        }
    }
}

module.exports = new CommentController()