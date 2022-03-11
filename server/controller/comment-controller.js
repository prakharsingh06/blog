import Comment from "../model/commentSchema.js"

export const createComment = async (req, res) => {
    try {
        console.log(req.body);
        const newComment = new Comment(req.body);
        await newComment.save();
        res.status(200).json("Comment Saved to database");
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getAllComments = async (req, res) => {
    let id = req.params.id;
    let comments;
    try {
        comments = await Comment.find({ blogId: id });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}