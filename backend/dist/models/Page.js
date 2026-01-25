import mongoose, { Schema } from 'mongoose';
const pageSchema = new Schema({
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    subtitle: {
        type: String,
        default: '',
        trim: true,
    },
    seo: {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        keywords: { type: [String], default: [] },
    },
}, {
    timestamps: { updatedAt: 'lastUpdated' },
});
export const Page = mongoose.model('Page', pageSchema);
//# sourceMappingURL=Page.js.map