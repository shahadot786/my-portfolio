import mongoose, { Schema } from 'mongoose';
const educationSchema = new Schema({
    degree: {
        type: String,
        required: [true, 'Degree is required'],
        trim: true,
    },
    institution: {
        type: String,
        required: [true, 'Institution is required'],
        trim: true,
    },
    location: {
        type: String,
        default: '',
        trim: true,
    },
    period: {
        type: String,
        required: [true, 'Period is required'],
        trim: true,
    },
    highlights: {
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
educationSchema.index({ order: 1 });
export const Education = mongoose.model('Education', educationSchema);
//# sourceMappingURL=Education.js.map