import mongoose, { Schema } from 'mongoose';
const topPageSchema = new Schema({
    path: { type: String, required: true },
    views: { type: Number, default: 0 },
}, { _id: false });
const metricSchema = new Schema({
    name: { type: String, required: true },
    count: { type: Number, default: 0 }
}, { _id: false });
const geoSchema = new Schema({
    country: { type: String, required: true },
    city: { type: String, default: 'Unknown' },
    count: { type: Number, default: 0 }
}, { _id: false });
const analyticsSchema = new Schema({
    date: {
        type: Date,
        required: true,
        unique: true,
    },
    pageViews: {
        type: Number,
        default: 0,
    },
    uniqueVisitors: {
        type: Number,
        default: 0,
    },
    topPages: {
        type: [topPageSchema],
        default: [],
    },
    clicks: {
        type: [
            new Schema({
                url: String,
                count: { type: Number, default: 0 }
            }, { _id: false })
        ],
        default: []
    },
    browsers: { type: [metricSchema], default: [] },
    os: { type: [metricSchema], default: [] },
    devices: { type: [metricSchema], default: [] },
    locations: { type: [geoSchema], default: [] }
}, {
    timestamps: true,
});
analyticsSchema.index({ date: -1 });
export const Analytics = mongoose.model('Analytics', analyticsSchema);
//# sourceMappingURL=Analytics.js.map