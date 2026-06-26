import mongoose, { Schema, Document } from 'mongoose';

export interface IYTTopicProgress extends Document {
  topicId: number;
  isFinished: boolean;
  updatedAt: Date;
}

const YTTopicProgressSchema: Schema = new Schema({
  topicId: { type: Number, required: true, unique: true },
  isFinished: { type: Boolean, default: false },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.models.YTTopicProgress || mongoose.model<IYTTopicProgress>('YTTopicProgress', YTTopicProgressSchema);
