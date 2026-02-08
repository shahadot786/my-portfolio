import mongoose, { Document, Schema } from 'mongoose';

export interface IExperience extends Document {
    company: string;
    location: string;
    title: string;
    period: string;
    isCurrent: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const experienceSchema = new Schema<IExperience>(
    {
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
        },
        period: {
            type: String,
            required: [true, 'Period is required'],
            trim: true,
        },
        isCurrent: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            default: '',
        },
        achievements: {
            type: [String],
            default: [],
        },
        technologies: {
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

experienceSchema.index({ order: 1 });

export const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', experienceSchema);
