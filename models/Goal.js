import mongoose from 'mongoose';

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: String, required: true },
  goalType: { type: String, required: true },
  dailyLimit: { type: Number }, // in minutes
  detoxHours: [{ type: String }], // e.g., ['22:00-07:00']
  productivityRatio: { type: Number }, // e.g., 0.5 for 50%
  customGoal: { type: String },
  progress: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  completedAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Goal || mongoose.model('Goal', GoalSchema);
