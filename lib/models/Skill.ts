import mongoose, { Document, Schema } from 'mongoose';

export interface ISkillCategory extends Document {
    title: string;
    icon: string;
    skills: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}

const skillCategorySchema = new Schema<ISkillCategory>(
    {
        title: {
            type: String,
            required: [true, 'Category title is required'],
            trim: true,
        },
        icon: {
            type: String,
            required: [true, 'Icon name is required'],
            trim: true,
        },
        skills: {
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

skillCategorySchema.index({ order: 1 });

export const SkillCategory = mongoose.models.SkillCategory || mongoose.model<ISkillCategory>('SkillCategory', skillCategorySchema);
