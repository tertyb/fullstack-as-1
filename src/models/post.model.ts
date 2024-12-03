import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  senderId: string;
  text: string;
  date: Date;
  image: string;
  likes: string[];
  commentsIds: string[];
}

const PostSchema = new Schema<IPost>({
  senderId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: true },
  image: { type: String, required: false },
  likes: {
    type: [String],
    required: false,
    validate: {
      validator:  (likes) => {
        return Array.isArray(likes) && likes.length === new Set(likes).size;
      },
      message: "Likes array must have unique values.",
    },
  },
  commentsIds: { type: [String], required: false },
});

const PostModel = mongoose.model<IPost>('Post', PostSchema);

export default PostModel;
