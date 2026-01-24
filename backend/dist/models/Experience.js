import mongoose, { Schema } from 'mongoose';
const experienceSchema = new Schema({
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
    },
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
    },
    period: {
        type: String,
        required: [true, 'Period is required'],
        trim: true,
    },
    isCurrent: {
        type: Boolean,
        default: false,
    },
    description: {
        type: String,
        default: '',
    },
    achievements: {
        type: [String],
        default: [],
    },
    technologies: {
        type: [String],
        default: [],
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
// Index for sorting by order
experienceSchema.index({ order: 1 });
export const Experience = mongoose.model('Experience', experienceSchema);
//# sourceMappingURL=Experience.js.map