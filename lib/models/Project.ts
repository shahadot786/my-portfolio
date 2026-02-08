import mongoose, { Document, Schema } from 'mongoose';

export interface IProjectMetric {
    label: string;
    value: string;
}

export interface IProjectLink {
    type: 'github' | 'live' | 'appStore' | 'playStore' | 'demo';
    url: string;
}

export interface IProject extends Document {
    title: string;
    description: string;
    metrics: IProjectMetric[];
    technologies: string[];
    links: IProjectLink[];
    featured: boolean;
    order: number;
    image?: string;
    createdAt: Date;
    updatedAt: Date;
}

const projectMetricSchema = new Schema<IProjectMetric>(
    {
        label: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const projectLinkSchema = new Schema<IProjectLink>(
    {
        type: {
            type: String,
            enum: ['github', 'live', 'appStore', 'playStore', 'demo'],
            required: true,
        },
        url: { type: String, required: true },
    },
    { _id: false }
);

const projectSchema = new Schema<IProject>(
    {
        title: {
            type: String,
            required: [true, 'Project title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
        },
        metrics: {
            type: [projectMetricSchema],
            default: [],
        },
        technologies: {
            type: [String],
            default: [],
        },
        links: {
            type: [projectLinkSchema],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        order: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ order: 1 });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', projectSchema);
