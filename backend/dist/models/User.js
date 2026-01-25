import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false, // Don't include password in queries by default
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    role: {
        type: String,
        enum: ['admin', 'editor'],
        default: 'editor',
    },
    refreshTokens: {
        type: [String],
        default: [],
        select: false,
    },
}, {
    timestamps: true,
});
// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password'))
        return next();
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});
// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};
// Remove sensitive data from JSON output
userSchema.set('toJSON', {
    transform: (_doc, ret) => {
        const obj = ret;
        delete obj.password;
        delete obj.refreshTokens;
        delete obj.__v;
        return obj;
    },
});
export const User = mongoose.model('User', userSchema);
//# sourceMappingURL=User.js.map