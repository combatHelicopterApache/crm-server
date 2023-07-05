const Response = require("../common/responseMessages");
const commentModel = require('../models/commentModel')
const CommentDTO = require('../dtos/commentDto')
const mongoose = require("mongoose");
const Lead = require("../models/leadModel")

class CommentService {
    async createNew(data) {
        try {
            const {
                description,
                attached_files
            } = data.body

            const {id, full_name} = data.user

            const candidate = await commentModel.findOne({path: data.params.element, elem_id: data.params.id })

            if(candidate) {
               return await this.addCommentToElementByID(data)
            }

            const createComment = await commentModel.create({
                path: data.params.element,
                elem_id: data.params.id,
                comments: {
                    user_name: full_name,
                    user_id: id,
                    description,
                    attached_files
                }
            })

            const saveComment = await createComment.save()

            if (saveComment) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("comment", true),
                    data: CommentDTO.commentObject(saveComment),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("comment", false),
                    data: CommentDTO.commentObject(createComment),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async getByElementId(params) {
        try {
            const {element, id} = params

            const comments = await commentModel.aggregate([
                {
                    $match: {
                        path: element,
                        elem_id: new mongoose.Types.ObjectId(id)
                    }
                },  {
                    $addFields: {
                        id: '$_id',
                        comments: {
                            $map: {
                                input: '$comments',
                                as: 'comment',
                                in: {
                                    user_id: '$$comment.user_id',
                                    user_name: '$$comment.user_name',
                                    description: '$$comment.description',
                                    deleted_by: '$$comment.deleted_by',
                                    deleted_by_name: '$$comment.deleted_at',
                                    deleted_at: '$$comment.deleted_at',
                                    updated_by: '$$comment.updated_by',
                                    updated_by_name: '$$comment.updated_by_name',
                                    updated_at: '$$comment.updated_at',
                                    created_at: '$$comment.created_at',
                                    id: '$$comment._id'
                                }
                            }
                        }
                    },

                },
                {
                    $project: {
                        _id: 0,
                        __v: 0,
                    }
                },
            ])
            if (comments) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("comment", true),
                    data: comments[0],
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.get("comment", false),
                    data: CommentDTO.commentArray(comments),
                };
            }

        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async addCommentToElementByID(data) {
        try {
            const {
                description,
                attached_files
            } = data.body

            const {id, full_name} = data.user

            const comment = {
                user_name: full_name,
                user_id: id,
                description,
                attached_files
            }

            const added = await commentModel.findOneAndUpdate(
                { path: data.params.element, elem_id: data.params.id },
                { $push: { comments: { $each: [comment] } } },
                { new: true }).lean();

            if (added) {
                return {
                    status: true,
                    code: 200,
                    message: Response.post("comment", true),
                    data: added,
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("comment", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }

    async deleteByID(id, data) {
        try {


            const updated = await commentModel.findOneAndUpdate(
                { "comments._id": id },
                { $set: {
                        "comments.$.deleted_by": data.id,
                        "comments.$.deleted_by_name": data.full_name,
                        "comments.$.deleted_at": new Date()
                    }
                },
                { new: true }).lean();


            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.delete("comment", true),
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.delete("comment", false),
                };
            }
        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }
}

module.exports = new CommentService()

