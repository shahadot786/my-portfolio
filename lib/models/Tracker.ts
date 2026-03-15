import mongoose, { Document, Schema } from 'mongoose';

export interface IChecklistItem {
    text: string;
    completed: boolean;
    hour: number;
}

export interface ITrackerDay {
    dayNumber: number;
    date: Date;
    title: string;
    status: 'pending' | 'completed' | 'skipped' | 'in-progress';
    hoursLogged: number;
    notes: string;
    mood: 'great' | 'good' | 'neutral' | 'tough' | '';
    checklist: IChecklistItem[];
}

export interface IMilestone {
    title: string;
    dayNumber: number;
    completed: boolean;
}

export interface ITracker extends Document {
    title: string;
    slug: string;
    description: string;
    startDate: Date;
    endDate: Date;
    totalDays: number;
    dailyHours: number;
    status: 'active' | 'completed' | 'paused';
    tags: string[];
    featured: boolean;
    color: string;
    milestones: IMilestone[];
    days: ITrackerDay[];
    createdAt: Date;
    updatedAt: Date;
}

const checklistItemSchema = new Schema<IChecklistItem>(
    {
        text: { type: String, required: true },
        completed: { type: Boolean, default: false },
        hour: { type: Number, default: 1 },
    },
    { _id: false }
);

const trackerDaySchema = new Schema<ITrackerDay>(
    {
        dayNumber: { type: Number, required: true },
        date: { type: Date },
        title: { type: String, default: '' },
        status: {
            type: String,
            enum: ['pending', 'completed', 'skipped', 'in-progress'],
            default: 'pending',
        },
        hoursLogged: { type: Number, default: 0 },
        notes: { type: String, default: '' },
        mood: {
            type: String,
            enum: ['great', 'good', 'neutral', 'tough', ''],
            default: '',
        },
        checklist: {
            type: [checklistItemSchema],
            default: [],
        },
    },
    { _id: false }
);

const milestoneSchema = new Schema<IMilestone>(
    {
        title: { type: String, required: true },
        dayNumber: { type: Number, required: true },
        completed: { type: Boolean, default: false },
    },
    { _id: false }
);

const trackerSchema = new Schema<ITracker>(
    {
        title: {
            type: String,
            required: [true, 'Tracker title is required'],
            trim: true,
        },
        slug: {
            type: String,
            required: [true, 'Slug is required'],
            unique: true,
            lowercase: true,
            trim: true,
        },
        description: {
            type: String,
            default: '',
        },
        startDate: {
            type: Date,
            required: [true, 'Start date is required'],
        },
        endDate: {
            type: Date,
            required: [true, 'End date is required'],
        },
        totalDays: {
            type: Number,
            required: [true, 'Total days is required'],
        },
        dailyHours: {
            type: Number,
            default: 5,
        },
        status: {
            type: String,
            enum: ['active', 'completed', 'paused'],
            default: 'active',
        },
        tags: {
            type: [String],
            default: [],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        color: {
            type: String,
            default: '#34d399', // emerald-400
        },
        milestones: {
            type: [milestoneSchema],
            default: [],
        },
        days: {
            type: [trackerDaySchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

trackerSchema.index({ slug: 1 }, { unique: true });
trackerSchema.index({ featured: -1, status: 1 });

export const Tracker = mongoose.models.Tracker || mongoose.model<ITracker>('Tracker', trackerSchema);
