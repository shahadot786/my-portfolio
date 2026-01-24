import mongoose, { Schema } from 'mongoose';
const skillCategorySchema = new Schema({
    title: {
        type: String,
        required: [true, 'Category title is required'],
        trim: true,
    },
    icon: {
        type: String,
        required: [true, 'Icon name is required'],
        trim: true,
    },
    skills: {
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
// Index for sorting
skillCategorySchema.index({ order: 1 });
export const SkillCategory = mongoose.model('SkillCategory', skillCategorySchema);
//# sourceMappingURL=Skill.js.map