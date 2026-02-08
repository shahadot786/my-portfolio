import mongoose, { Document, Schema } from 'mongoose';

export interface IAnalytics extends Document {
    date: Date;
    pageViews: number;
    uniqueVisitors: number;
    topPages: { path: string; views: number }[];
    clicks: { url: string; count: number }[];
    browsers: { name: string; count: number }[];
    os: { name: string; count: number }[];
    devices: { name: string; count: number }[];
    locations: { country: string; city: string; count: number }[];
    referrers: { name: string; count: number }[];
    languages: { name: string; count: number }[];
    screens: { name: string; count: number }[];
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

const metricSchema = new Schema(
    {
        name: { type: String, required: true },
        count: { type: Number, default: 0 }
    },
    { _id: false }
);

const geoSchema = new Schema(
    {
        country: { type: String, required: true },
        city: { type: String, default: 'Unknown' },
        count: { type: Number, default: 0 }
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
        clicks: {
            type: [
                new Schema({
                    url: String,
                    count: { type: Number, default: 0 }
                }, { _id: false })
            ],
            default: []
        },
        browsers: { type: [metricSchema], default: [] },
        os: { type: [metricSchema], default: [] },
        devices: { type: [metricSchema], default: [] },
        locations: { type: [geoSchema], default: [] },
        referrers: { type: [metricSchema], default: [] },
        languages: { type: [metricSchema], default: [] },
        screens: { type: [metricSchema], default: [] }
    },
    {
        timestamps: true,
    }
);

analyticsSchema.index({ date: -1 });

export const Analytics = mongoose.models.Analytics || mongoose.model<IAnalytics>('Analytics', analyticsSchema);
