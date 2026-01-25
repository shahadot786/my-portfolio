import mongoose, { Document } from 'mongoose';
export interface IAnalytics extends Document {
    date: Date;
    pageViews: number;
    uniqueVisitors: number;
    topPages: {
        path: string;
        views: number;
    }[];
    clicks: {
        url: string;
        count: number;
    }[];
    browsers: {
        name: string;
        count: number;
    }[];
    os: {
        name: string;
        count: number;
    }[];
    devices: {
        name: string;
        count: number;
    }[];
    locations: {
        country: string;
        city: string;
        count: number;
    }[];
    referrers: {
        name: string;
        count: number;
    }[];
    languages: {
        name: string;
        count: number;
    }[];
    screens: {
        name: string;
        count: number;
    }[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Analytics: mongoose.Model<IAnalytics, {}, {}, {}, mongoose.Document<unknown, {}, IAnalytics, {}, {}> & IAnalytics & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Analytics.d.ts.map