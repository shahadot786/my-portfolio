import mongoose, { Schema } from 'mongoose';
const messageSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        lowercase: true,
        trim: true,
    },
    subject: {
        type: String,
        required: [true, 'Subject is required'],
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    status: {
        type: String,
        enum: ['unread', 'read', 'replied'],
        default: 'unread',
    },
    repliedAt: {
        type: Date,
    },
}, {
    timestamps: true,
});
// Indexes
messageSchema.index({ status: 1, createdAt: -1 });
messageSchema.index({ createdAt: -1 });
export const Message = mongoose.model('Message', messageSchema);
//# sourceMappingURL=Message.js.map