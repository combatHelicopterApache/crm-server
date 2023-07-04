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
        return data.reduce((acc, item, idx ) => {
            acc.id = item?._id;
            acc.user_id = item?.user_id;
            acc.user_name = item?.user_name;
            acc.description = item?.description;
            acc.deleted_by = item?.deleted_by;
            acc.deleted_by_name = item?.deleted_by_name;
            acc.deleted_at = item?.deleted_at;
            acc.updated_by = item?.updated_by;
            acc.updated_by_name = item?.updated_by_name;
            acc.updated_at = item?.updated_at;
            acc.attached_files = item?.attached_files;
            acc.key = idx;
            return acc;
        }, {});
    }

}

module.exports = new CommentDTO();
