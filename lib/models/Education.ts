import mongoose, { Document, Schema } from 'mongoose';

export interface IEducation extends Document {
    degree: string;
    institution: string;
    location: string;
    period: string;
    highlights: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const educationSchema = new Schema<IEducation>(
    {
        degree: {
            type: String,
            required: [true, 'Degree is required'],
            trim: true,
        },
        institution: {
            type: String,
            required: [true, 'Institution is required'],
            trim: true,
        },
        location: {
            type: String,
            default: '',
            trim: true,
        },
        period: {
            type: String,
            required: [true, 'Period is required'],
            trim: true,
        },
        highlights: {
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

educationSchema.index({ order: 1 });

export const Education = mongoose.models.Education || mongoose.model<IEducation>('Education', educationSchema);
