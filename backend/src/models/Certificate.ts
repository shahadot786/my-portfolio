import mongoose, { Document, Schema } from 'mongoose';

export interface ICertificate extends Document {
  name: string;
  issuer: string;
  date: string;
  image?: string;
  url?: string;
  verified: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const certificateSchema = new Schema<ICertificate>(
  {
    name: {
      type: String,
      required: [true, 'Certificate name is required'],
      trim: true,
    },
    issuer: {
      type: String,
      required: [true, 'Issuer is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Date is required'],
      trim: true,
    },
    image: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: '',
    },
    verified: {
      type: Boolean,
      default: false,
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

certificateSchema.index({ verified: -1, order: 1 });

export const Certificate = mongoose.model<ICertificate>('Certificate', certificateSchema);
