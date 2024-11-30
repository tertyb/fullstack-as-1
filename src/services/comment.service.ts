import mongoose from 'mongoose';
import CommentModel from '../models/comment.model';
import { addCommentsPost, deleteCommentsPost, getPostById } from './post.service';

export const deleteComment = async (commentId: string, postId: string) => {
    try {
        
        await CommentModel.deleteOne({ _id: commentId });
        await deleteCommentsPost(postId, commentId);
        return 'delete comment sucssfully';

    } catch (error) {
        throw new Error('could not delete comment');
    }
}

export const createComment = async (userId: string, text: string, postId: string) => {
    const now = new Date();
    try {

        const newComment = new CommentModel({ userId, text, date: now });
        await newComment.save();
        await addCommentsPost(postId, newComment.id);
        return 'created comment sucssfully';

    } catch (error) {
        throw new Error('could not create comment');
    }
}

export const updateComment = async (text: string, commentId: string) => {
    const updatedDate = new Date();
    const updateData: { text: string, date: Date } = {
        date: updatedDate,
        text
    };

    const updatedComment = await CommentModel.findByIdAndUpdate(
        {_id: commentId},
       { $set: updateData },
       { new: true, runValidators: true }
   );

   if (!updatedComment) {
    throw new Error('Post not found');
    }

    return 'updated comment sucssfully';
}


export const allCommentsByPostId = async (postId: string) => {
    const post = await getPostById(postId);
    return await findCommentsByIds(post?.commentsIds || [])
}

export const findCommentsByIds = async (commentIds: string[]) => await CommentModel.find({ _id: { $in: commentIds } });
export const findCommentsById = async (commentId: string) => await CommentModel.find({ _id: commentId });











