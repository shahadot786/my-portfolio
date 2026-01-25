import { Message } from '../models/index.js';
import { ApiError } from '../middleware/error.js';
// import { sendContactNotification } from '../utils/email.js';
export const submitMessage = async (req, res, next) => {
    try {
        const { name, email, subject, message: text } = req.body;
        if (!name || !email || !subject || !text) {
            throw new ApiError('All fields are required', 400);
        }
        const newMessage = await Message.create({ name, email, subject, message: text });
        // Email notification disabled per user request
        // sendContactNotification({ name, email, subject, message: text }).catch(console.error);
        res.status(201).json({
            success: true,
            message: 'Message sent successfully',
            data: newMessage
        });
    }
    catch (error) {
        next(error);
    }
};
export const getAllMessages = async (_req, res, next) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.status(200).json({ success: true, messages });
    }
    catch (error) {
        next(error);
    }
};
export const updateMessageStatus = async (req, res, next) => {
    try {
        const { status } = req.body;
        const message = await Message.findByIdAndUpdate(req.params.id, { status, ...(status === 'replied' ? { repliedAt: new Date() } : {}) }, { new: true });
        if (!message) {
            throw new ApiError('Message not found', 404);
        }
        res.status(200).json({ success: true, message });
    }
    catch (error) {
        next(error);
    }
};
export const deleteMessage = async (req, res, next) => {
    try {
        const message = await Message.findByIdAndDelete(req.params.id);
        if (!message) {
            throw new ApiError('Message not found', 404);
        }
        res.status(200).json({ success: true, message: 'Message deleted' });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=message.controller.js.map