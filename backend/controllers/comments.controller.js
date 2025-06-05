import Comment from "../models/comment.model.js";

export const getCommentsByReport = async (req, res) => {
  try {
    const comments = await Comment.find({ reportId: req.params.id }).populate(
      "userId",
      "name"
    );
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addCommentToReport = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user._id;
    const reportId = req.params.id;

    if (!comment) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const newComment = new Comment({ comment, userId, reportId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this comment" });
    }

    await Comment.deleteOne({ _id: req.params.id });
    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
