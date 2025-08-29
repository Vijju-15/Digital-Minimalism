import mongoose from 'mongoose';

const LogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  app: { type: String, required: true },
  category: { type: String, required: true }, // Social Media, Productivity, etc.
  duration: { type: Number, required: true }, // in minutes
  timestamp: { type: Date, default: Date.now },
  reflection: { type: String },
  mood: { type: String },
});

export default mongoose.models.Log || mongoose.model('Log', LogSchema);
