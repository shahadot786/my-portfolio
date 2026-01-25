import mongoose, { Document } from 'mongoose';
export interface ISkillCategory extends Document {
    title: string;
    icon: string;
    skills: string[];
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const SkillCategory: mongoose.Model<ISkillCategory, {}, {}, {}, mongoose.Document<unknown, {}, ISkillCategory, {}, {}> & ISkillCategory & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Skill.d.ts.map