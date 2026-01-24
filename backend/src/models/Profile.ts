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
  bio: string[];
  avatar: string;
  location: string;
  email: string;
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
  },
  {
    timestamps: true,
  }
);

export const Profile = mongoose.model<IProfile>('Profile', profileSchema);
