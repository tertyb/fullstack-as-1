import { Router } from "express";
import { createComment, deleteComment, findCommentsById, updateComment } from "../services/comment.service";

export const commentRouter = Router();

commentRouter.post('/create', async (req, res) => {
  try {

    const { postId, text, userId } = req.body;
    const message = await createComment(userId, text, postId);

    res.json({ message });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

commentRouter.delete('/delete', async (req, res) => {
  try {

    const { postId, commentId } = req.body;
    const message = await deleteComment(commentId, postId);

    res.json({ message });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

commentRouter.put('/update', async (req, res) => {
  try {

    const { text, commentId } = req.body;
    const message = await updateComment(text, commentId);

    res.json({ message });

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

commentRouter.get('/:commentid', async (req, res) => {
  try {
    if(req?.params?.commentid) {
      const commentId = req?.params?.commentid;
      const comment = await findCommentsById(commentId);
      res.json({ comment });
    }

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

