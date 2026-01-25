import mongoose, { Schema } from 'mongoose';
const socialLinkSchema = new Schema({
    platform: { type: String, required: true },
    url: { type: String, required: true },
    icon: { type: String, required: true },
}, { _id: false });
const seoSchema = new Schema({
    title: { type: String, default: '' },
    description: { type: String, default: '' },
    keywords: { type: [String], default: [] },
}, { _id: false });
const profileSchema = new Schema({
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
    bio: {
        type: [String],
        default: [],
    },
    avatar: {
        type: String,
        default: '/avatar.png',
    },
    location: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    socialLinks: {
        type: [socialLinkSchema],
        default: [],
    },
    seo: {
        type: seoSchema,
        default: () => ({}),
    },
}, {
    timestamps: true,
});
export const Profile = mongoose.model('Profile', profileSchema);
//# sourceMappingURL=Profile.js.map