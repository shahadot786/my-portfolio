import mongoose, { Document } from 'mongoose';
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
export declare const Project: mongoose.Model<IProject, {}, {}, {}, mongoose.Document<unknown, {}, IProject, {}, {}> & IProject & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Project.d.ts.map