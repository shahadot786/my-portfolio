import mongoose, { Document } from 'mongoose';
export interface ITestimonial extends Document {
    name: string;
    title: string;
    company: string;
    image?: string;
    content: string;
    featured: boolean;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Testimonial: mongoose.Model<ITestimonial, {}, {}, {}, mongoose.Document<unknown, {}, ITestimonial, {}, {}> & ITestimonial & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=Testimonial.d.ts.map