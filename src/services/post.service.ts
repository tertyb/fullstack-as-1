import mongoose, { ClientSession } from 'mongoose';
import { IComment } from '../models/comment.model';
import PostModel from '../models/post.model';

export const createPost = async (senderId: string, text: string, image: string) => {
    const now = new Date();
    const newPost = new PostModel({ senderId, text, image, date: now });

    const createdPost = await newPost.save().then(res => {
        return 'created Post sucssfully';
    }, (err) => {
        throw new Error('could not create Post');
    });

    return createdPost;
}

export const allPosts = async () => await PostModel.find()

export const getPostById = async (postId: string) => {
    if(!mongoose.isValidObjectId(postId)) throw new Error('invalid id');
    return await PostModel.findById(postId);
}

export const getPostsBysenderId = async (senderId: string) => await PostModel.find({ senderId })

export const updatePost = async (postId: string, updateData: { text?: string, image?: string }) => {

    let updatedPost;
    try {
        updatedPost = await PostModel.findByIdAndUpdate(
            { _id: postId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
    } catch (error) {
        throw new Error('failed to update post')
    }

    if (!updatedPost) {
        throw new Error('Post not found');
    }
    return updatedPost;
}

export const addCommentsPost = async (postId: string, commentId: string) => {

    const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $addToSet: { commentsIds: commentId } },
        { new: true, runValidators: true }
    );

    if (!updatedPost) {
        throw new Error('Post not found');
    }

    return updatedPost;
}

export const deleteCommentsPost = async (postId: string, commentId: string) => {

    const updatedPost = await PostModel.findOneAndUpdate(
        { _id: postId },
        { $pull: { commentsIds: commentId } },
        { new: true, runValidators: true }
    );

    if (!updatedPost) {
        throw new Error('Post not found');
    }

    return updatedPost;
}












