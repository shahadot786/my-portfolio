import mongoose, { Document, Types } from 'mongoose';
export interface IArticle extends Document {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    thumbnail?: string;
    categories: string[];
    published: boolean;
    publishedAt?: Date;
    author: Types.ObjectId;
    views: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Article: mongoose.Model<IArticle, {}, {}, {}, mongoose.Document<unknown, {}, IArticle, {}, {}> & IArticle & Required<{
    _id: Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Article.d.ts.map