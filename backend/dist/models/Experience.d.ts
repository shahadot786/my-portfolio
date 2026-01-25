import mongoose, { Document } from 'mongoose';
export interface IExperience extends Document {
    company: string;
    location: string;
    title: string;
    period: string;
    isCurrent: boolean;
    description: string;
    achievements: string[];
    technologies: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Experience: mongoose.Model<IExperience, {}, {}, {}, mongoose.Document<unknown, {}, IExperience, {}, {}> & IExperience & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Experience.d.ts.map