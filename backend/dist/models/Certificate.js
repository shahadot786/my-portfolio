import mongoose, { Schema } from 'mongoose';
const certificateSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Certificate name is required'],
        trim: true,
    },
    issuer: {
        type: String,
        required: [true, 'Issuer is required'],
        trim: true,
    },
    date: {
        type: String,
        required: [true, 'Date is required'],
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
    verified: {
        type: Boolean,
        default: false,
    },
    order: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true,
});
certificateSchema.index({ verified: -1, order: 1 });
export const Certificate = mongoose.model('Certificate', certificateSchema);
//# sourceMappingURL=Certificate.js.map