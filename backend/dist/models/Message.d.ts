import mongoose, { Document } from 'mongoose';
export interface IMessage extends Document {
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
    repliedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Message: mongoose.Model<IMessage, {}, {}, {}, mongoose.Document<unknown, {}, IMessage, {}, {}> & IMessage & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Message.d.ts.map