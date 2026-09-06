import mongoose, { Document, Schema } from 'mongoose';

export interface ISocialLink {
    platform: string;
    url: string;
    icon: string;
}

export interface ISeoData {
    title: string;
    description: string;
    keywords: string[];
}

export interface IProfile extends Document {
    name: string;
    title: string;
    yearsOfExperience?: string;
    heroBadge?: string;
    bio: string[];
    avatar: string;
    resumeUrl?: string;
    location: string;
    email: string;
    phone?: string;
    availabilityBadge?: string;
    isAvailable?: boolean;
    // Hero stats strip
    statsTransactions?: string;
    statsUsers?: string;
    statsClients?: string;
    statsClientsDetail?: string;
    // Integrations
    mediumUsername?: string;
    // Organization / SEO
    currentCompany?: string;
    // AI Assistant
    isAiAssistantEnabled?: boolean;
    aiWelcomeMessage?: string;
    aiStarterPrompts?: string[];
    socialLinks: ISocialLink[];
    seo: ISeoData;
    createdAt: Date;
    updatedAt: Date;
}

const socialLinkSchema = new Schema<ISocialLink>(
    {
        platform: { type: String, required: true },
        url: { type: String, required: true },
        icon: { type: String, required: true },
    },
    { _id: false }
);

const seoSchema = new Schema<ISeoData>(
    {
        title: { type: String, default: '' },
        description: { type: String, default: '' },
        keywords: { type: [String], default: [] },
    },
    { _id: false }
);

const profileSchema = new Schema<IProfile>(
    {
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
        yearsOfExperience: {
            type: String,
            default: '5+',
            trim: true,
        },
        heroBadge: {
            type: String,
            default: 'Offline-First Architect',
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
        resumeUrl: {
            type: String,
            default: '',
        },
        availabilityBadge: {
            type: String,
            default: 'Available for new opportunities',
        },
        isAvailable: {
            type: Boolean,
            default: true,
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
        phone: {
            type: String,
            default: '',
        },
        // Hero stats strip
        statsTransactions: {
            type: String,
            default: '100K+',
            trim: true,
        },
        statsUsers: {
            type: String,
            default: '10K+',
            trim: true,
        },
        statsClients: {
            type: String,
            default: 'Fortune 500',
            trim: true,
        },
        statsClientsDetail: {
            type: String,
            default: 'Unilever, BAT, Nestlé, Nagad',
            trim: true,
        },
        // Integrations
        mediumUsername: {
            type: String,
            default: 'shrhossain786',
            trim: true,
        },
        // Organization / JSON-LD
        currentCompany: {
            type: String,
            default: '',
            trim: true,
        },
        // AI Assistant
        isAiAssistantEnabled: {
            type: Boolean,
            default: true,
        },
        aiWelcomeMessage: {
            type: String,
            default: '',
        },
        aiStarterPrompts: {
            type: [String],
            default: [],
        },
        socialLinks: {
            type: [socialLinkSchema],
            default: [],
        },
        seo: {
            type: seoSchema,
            default: () => ({}),
        },
    },
    {
        timestamps: true,
    }
);

export const Profile = mongoose.models.Profile || mongoose.model<IProfile>('Profile', profileSchema);

