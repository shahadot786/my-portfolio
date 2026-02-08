import mongoose, { Document, Schema } from 'mongoose';

export interface IPage extends Document {
    slug: string;
    title: string;
    subtitle: string;
    seo: {
        title: string;
        description: string;
        keywords: string[];
    };
    lastUpdated: Date;
}

const pageSchema = new Schema<IPage>(
    {
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            default: '',
            trim: true,
        },
        seo: {
            title: { type: String, default: '' },
            description: { type: String, default: '' },
            keywords: { type: [String], default: [] },
        },
    },
    {
        timestamps: { updatedAt: 'lastUpdated' },
    }
);

export const Page = mongoose.models.Page || mongoose.model<IPage>('Page', pageSchema);
