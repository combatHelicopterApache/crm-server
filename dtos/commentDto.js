class CommentDTO {
    commentArray(data) {
        return data.reduce((acc, item, idx) => {
            acc.push({
                id: item._id,
                path: item?.path,
                elem_id: item.elem_id,
                comments: this.commentArrayObject(item?.comments),
                key: idx,
            });
            return acc;
        }, []);
    }

    commentArrayObject(data) {
        return data.reduce((acc, item, idx) => {
            acc.push({
                id : item?._id,
                user_id : item?.user_id,
                user_name : item?.user_name,
                description : item?.description,
                deleted_by : item?.deleted_by,
                deleted_by_name : item?.deleted_by_name,
                deleted_at : item?.deleted_at,
                updated_by : item?.updated_by,
                updated_by_name : item?.updated_by_name,
                updated_at : item?.updated_at,
                attached_files : item?.attached_files,
                key: idx,
            });
            return acc;
        }, []);
    }

    commentObject(data) {
        const result = {};

        for (const [key, value] of Object.entries(data)) {
            result[key] = value;
        }

        result.id = data._id;
        delete result._id;
        delete result.__v;
        // console.log(result)
        return result;
    }
// }

    // commentObject(data) {
    //     return {
    //         id: data?._id,
    //         user_id : data?.user_id,
    //         user_name : data?.user_name,
    //         description : data?.description,
    //         deleted_by : data?.deleted_by,
    //         deleted_by_name : data?.deleted_by_name,
    //         deleted_at : data?.deleted_at,
    //         updated_by : data?.updated_by,
    //         updated_by_name : data?.updated_by_name,
    //         updated_at : data?.updated_at,
    //         created_at : data?.created_at,
    //         attached_files : data?.attached_files,
    //     }
    // }

}

module.exports = new CommentDTO();
