import mongoose, { Document } from 'mongoose';
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
export declare const Education: mongoose.Model<IEducation, {}, {}, {}, mongoose.Document<unknown, {}, IEducation, {}, {}> & IEducation & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Education.d.ts.map