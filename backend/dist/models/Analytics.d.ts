import mongoose, { Document } from 'mongoose';
export interface IAnalytics extends Document {
    date: Date;
    pageViews: number;
    uniqueVisitors: number;
    topPages: {
        path: string;
        views: number;
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