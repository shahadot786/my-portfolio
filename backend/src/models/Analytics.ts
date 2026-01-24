import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
  date: Date;
  pageViews: number;
  uniqueVisitors: number;
  topPages: { path: string; views: number }[];
  createdAt: Date;
  updatedAt: Date;
}

const topPageSchema = new Schema(
  {
    path: { type: String, required: true },
    views: { type: Number, default: 0 },
  },
  { _id: false }
);

const analyticsSchema = new Schema<IAnalytics>(
  {
    date: {
      type: Date,
      required: true,
      unique: true,
    },
    pageViews: {
      type: Number,
      default: 0,
    },
    uniqueVisitors: {
      type: Number,
      default: 0,
    },
    topPages: {
      type: [topPageSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Index for date queries
analyticsSchema.index({ date: -1 });

export const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
