import mongoose, { Document, Schema } from 'mongoose';

export interface IExpertise extends Document {
  title: string;
  badge: string;
  description: string;
  isFeatured: boolean;
  metrics?: Array<{
    label: string;
    value: string;
  }>;
  tags?: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const expertiseSchema = new Schema<IExpertise>(
  {
    title: {
      type: String,
      required: [true, 'Expertise title is required'],
      trim: true,
    },
    badge: {
      type: String,
      default: 'EA',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    metrics: [
      {
        label: { type: String, trim: true },
        value: { type: String, trim: true },
      },
    ],
    tags: {
      type: [String],
      default: [],
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

expertiseSchema.index({ order: 1 });

export const Expertise = mongoose.models.Expertise || mongoose.model<IExpertise>('Expertise', expertiseSchema);
