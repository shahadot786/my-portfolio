import mongoose, { Document } from 'mongoose';
export interface ISocialLink {
    platform: string;
    url: string;
    icon: string;
}
export interface ISeoData {
    title: string;
    description: string;
    keywords: string[];
}
export interface IProfile extends Document {
    name: string;
    title: string;
    bio: string[];
    avatar: string;
    location: string;
    email: string;
    socialLinks: ISocialLink[];
    seo: ISeoData;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Profile: mongoose.Model<IProfile, {}, {}, {}, mongoose.Document<unknown, {}, IProfile, {}, {}> & IProfile & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Profile.d.ts.map