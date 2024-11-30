import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  userId: string;
  text: string;
  date: Date;
}

 const CommentSchema = new Schema<IComment>({
  userId: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, required: false }
});

const CommentModel = mongoose.model<IComment>('Comment', CommentSchema);

export default CommentModel;
 


