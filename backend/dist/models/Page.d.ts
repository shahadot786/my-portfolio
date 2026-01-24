import mongoose, { Document } from 'mongoose';
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
export declare const Page: mongoose.Model<IPage, {}, {}, {}, mongoose.Document<unknown, {}, IPage, {}, {}> & IPage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Page.d.ts.map