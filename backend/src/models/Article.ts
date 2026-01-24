import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  categories: string[];
  type: 'internal' | 'medium';
  externalUrl?: string;
  published: boolean;
  publishedAt?: Date;
  author: Types.ObjectId;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

const articleSchema = new Schema<IArticle>(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      default: '',
    },
    excerpt: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    categories: {
      type: [String],
      default: [],
    },
    type: {
      type: String,
      enum: ['internal', 'medium'],
      default: 'internal',
    },
    externalUrl: {
      type: String,
      default: '',
    },
    published: {
      type: Boolean,
      default: false,
    },
    publishedAt: {
      type: Date,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
articleSchema.index({ slug: 1 });
articleSchema.index({ published: 1, publishedAt: -1 });
articleSchema.index({ categories: 1 });

// Generate slug from title if not provided
articleSchema.pre('save', function (next) {
  if (this.isNew && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  // Auto-generate excerpt if not provided
  if (!this.excerpt && this.content) {
    const plainText = this.content.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    this.excerpt = plainText.length > 200 ? plainText.substring(0, 200) + '...' : plainText;
  }
  
  // Set publishedAt when publishing
  if (this.isModified('published') && this.published && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  
  next();
});

export const Article = mongoose.model<IArticle>('Article', articleSchema);
