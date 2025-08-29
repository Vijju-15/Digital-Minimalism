import mongoose from 'mongoose';

const ChallengeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String }, // e.g., 'No Social Sunday'
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  progress: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Challenge || mongoose.model('Challenge', ChallengeSchema);
