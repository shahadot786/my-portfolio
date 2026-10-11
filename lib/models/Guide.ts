import mongoose, { Document, Schema } from 'mongoose';

export interface IGuide extends Document {
    title: string;
    slug: string;
    summary: string;
    content: string;
    tags: string[];
    coverImage: string;
    published: boolean;
    publishedAt?: Date;
    readingTime: number;
    createdAt: Date;
    updatedAt: Date;
}

const guideSchema = new Schema<IGuide>(
    {
        title: { type: String, required: [true, 'Title is required'], trim: true },
        slug: { type: String, required: [true, 'Slug is required'], unique: true, lowercase: true, trim: true },
        summary: { type: String, default: '' },
        content: { type: String, default: '' },
        tags: { type: [String], default: [] },
        coverImage: { type: String, default: '' },
        published: { type: Boolean, default: false },
        publishedAt: { type: Date },
        readingTime: { type: Number, default: 1 },
    },
    { timestamps: true }
);

guideSchema.index({ published: 1, publishedAt: -1 });

export const Guide = mongoose.models.Guide || mongoose.model<IGuide>('Guide', guideSchema);
