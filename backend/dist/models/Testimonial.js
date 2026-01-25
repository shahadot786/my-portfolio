import mongoose, { Schema } from 'mongoose';
const testimonialSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
    },
    company: {
        type: String,
        default: '',
        trim: true,
    },
    image: {
        type: String,
        default: '',
    },
    url: {
        type: String,
        default: '',
    },
    content: {
        type: String,
        required: [true, 'Testimonial content is required'],
    },
    featured: {
        type: Boolean,
        default: true,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// Index for sorting
testimonialSchema.index({ featured: -1, order: 1 });
export const Testimonial = mongoose.model('Testimonial', testimonialSchema);
//# sourceMappingURL=Testimonial.js.map