import mongoose, { Schema, Document } from 'mongoose';

export interface ITopicProgress extends Document {
  topicId: number;
  isFinished: boolean;
  updatedAt: Date;
}

const TopicProgressSchema: Schema = new Schema({
  topicId: { type: Number, required: true, unique: true },
  isFinished: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.TopicProgress || mongoose.model<ITopicProgress>('TopicProgress', TopicProgressSchema);
