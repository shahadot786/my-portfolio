import mongoose, { Schema, Document } from 'mongoose';

export interface IScript extends Document {
  topic: string;
  category: string;
  audience: string;
  duration: string;
  tone: string;
  content: string;
  createdAt: Date;
}

const ScriptSchema: Schema = new Schema({
  topic: { type: String, required: true },
  category: { type: String, required: true },
  audience: { type: String, required: true },
  duration: { type: String, required: true },
  tone: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Script || mongoose.model<IScript>('Script', ScriptSchema);
