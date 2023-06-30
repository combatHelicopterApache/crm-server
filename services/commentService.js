const Response = require("../common/responseMessages");
const commentModel = require('../models/commentModel')
const mongoose = require("mongoose");

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
                    data: saveComment,
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.post("comment", false),
                    data: createComment,
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
                {$match: {path: element, elem_id: new mongoose.Types.ObjectId(id)} },
                // {
                //     $lookup: {
                //         from: "users",
                //         localField: "user_id",
                //         foreignField: "_id",
                //         as: "user",
                //     },
                //
                // },
                // {
                //     $addFields: {
                //         full_name: { $arrayElemAt: ["$user.full_name", 0] }
                //     }
                // },
                // {
                //     $project: {
                //         user: 0
                //     }
                // }
            ])
            if (comments) {
                return {
                    status: true,
                    code: 200,
                    message: Response.get("comment", true),
                    data: comments,
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.get("comment", false),
                    data: comments,
                };
            }

        } catch (e) {
            return {
                code: 500,
                error: e.message,
            };
        }
    }


    async updateByID(id, data) {
        try {
            const filter = { _id: id };

            const updated = await commentModel.findByIdAndUpdate(filter, data, {
                new: true,
            }).lean();

            if (updated) {
                return {
                    status: true,
                    code: 200,
                    message: Response.update("comment", true),
                    data: updated,
                };
            } else {
                return {
                    status: false,
                    code: 400,
                    message: Response.update("comment", false),
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
                    data: updated,
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