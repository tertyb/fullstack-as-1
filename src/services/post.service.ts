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

export const getPostById = async (postId: string) => await PostModel.findById( postId )

export const getPostsBysenderId = async (senderId: string) => await PostModel.find({ senderId })











