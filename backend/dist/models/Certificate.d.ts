import mongoose, { Document } from 'mongoose';
export interface ICertificate extends Document {
    name: string;
    issuer: string;
    date: string;
    image?: string;
    url?: string;
    verified: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Certificate: mongoose.Model<ICertificate, {}, {}, {}, mongoose.Document<unknown, {}, ICertificate, {}, {}> & ICertificate & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Certificate.d.ts.map