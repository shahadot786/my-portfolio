import mongoose, { Schema } from 'mongoose';
const projectMetricSchema = new Schema({
    label: { type: String, required: true },
    value: { type: String, required: true },
}, { _id: false });
const projectLinkSchema = new Schema({
    type: {
        type: String,
        enum: ['github', 'live', 'appStore', 'playStore', 'demo'],
        required: true,
    },
    url: { type: String, required: true },
}, { _id: false });
const projectSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Project title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    metrics: {
        type: [projectMetricSchema],
        default: [],
    },
    technologies: {
        type: [String],
        default: [],
    },
    links: {
        type: [projectLinkSchema],
        default: [],
    },
    featured: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});
// Indexes
projectSchema.index({ featured: -1, order: 1 });
projectSchema.index({ order: 1 });
export const Project = mongoose.model('Project', projectSchema);
//# sourceMappingURL=Project.js.map