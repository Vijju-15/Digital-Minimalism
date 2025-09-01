'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  TrophyIcon,
  FireIcon,
} from '@heroicons/react/24/outline';

const goalTypes = [
  { id: 'dailyLimit', name: 'Daily Time Limit', description: 'Set maximum daily usage for categories' },
  { id: 'detoxHours', name: 'Digital Detox Hours', description: 'Phone-free time blocks' },
  { id: 'productivityRatio', name: 'Productivity Ratio', description: 'Maintain productive vs entertainment balance' },
  { id: 'custom', name: 'Custom Goal', description: 'Create your own personalized goal' },
];

const categories = ['Social Media', 'Entertainment', 'Games', 'News', 'Shopping', 'All Categories'];

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    category: '',
    goalType: '',
    dailyLimit: '',
    detoxHours: [''],
    productivityRatio: '',
    customGoal: '',
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const res = await fetch('/api/goals');
      if (res.ok) {
        const data = await res.json();
        setGoals(data);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newGoal),
      });

      if (res.ok) {
        setNewGoal({
          category: '',
          goalType: '',
          dailyLimit: '',
          detoxHours: [''],
          productivityRatio: '',
          customGoal: '',
        });
        setShowCreateForm(false);
        fetchGoals();
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const deleteGoal = async (goalId) => {
    try {
      const res = await fetch(`/api/goals/${goalId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const markGoalComplete = async (goalId) => {
    try {
      const res = await fetch(`/api/goals/${goalId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      if (res.ok) {
        fetchGoals();
      }
    } catch (error) {
      console.error('Error marking goal complete:', error);
    }
  };

  const getGoalProgress = (goal) => {
    // Mock progress calculation - in real app, this would be based on actual usage data
    return Math.floor(Math.random() * 100);
  };

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Digital Wellness Goals
              </h1>
              <p className="text-gray-300 text-lg">
                Set meaningful boundaries and track your progress
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Goal</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Active Goals',
              value: goals.length,
              icon: TrophyIcon,
              color: 'from-yellow-500 to-orange-600',
            },
            {
              title: 'Goals Completed',
              value: goals.filter(g => g.progress >= 100).length,
              icon: CheckCircleIcon,
              color: 'from-green-500 to-teal-600',
            },
            {
              title: 'Current Streak',
              value: '7 days',
              icon: FireIcon,
              color: 'from-red-500 to-pink-600',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-xl p-6 card-hover"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Create Goal Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Create New Goal</h2>
            <form onSubmit={handleCreateGoal} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Goal Type</label>
                  <select
                    value={newGoal.goalType}
                    onChange={(e) => setNewGoal({ ...newGoal, goalType: e.target.value })}
                    className="form-select w-full"
                    required
                  >
                    <option value="">Select goal type</option>
                    {goalTypes.map((type) => (
                      <option key={type.id} value={type.id} className="text-black">
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white text-sm font-medium mb-2">Category</label>
                  <select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                    className="form-select w-full"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category} value={category} className="text-black">
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Conditional Form Fields */}
              {newGoal.goalType === 'dailyLimit' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Daily Limit (minutes)
                  </label>
                  <input
                    type="number"
                    value={newGoal.dailyLimit}
                    onChange={(e) => setNewGoal({ ...newGoal, dailyLimit: e.target.value })}
                    className="form-input w-full"
                    placeholder="e.g., 60"
                    required
                  />
                </div>
              )}

              {newGoal.goalType === 'productivityRatio' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Target Productivity Ratio (%)
                  </label>
                  <input
                    type="number"
                    value={newGoal.productivityRatio}
                    onChange={(e) => setNewGoal({ ...newGoal, productivityRatio: e.target.value })}
                    className="form-input w-full"
                    placeholder="e.g., 70"
                    min="0"
                    max="100"
                    required
                  />
                </div>
              )}

              {newGoal.goalType === 'custom' && (
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Custom Goal Description
                  </label>
                  <textarea
                    value={newGoal.customGoal}
                    onChange={(e) => setNewGoal({ ...newGoal, customGoal: e.target.value })}
                    className="form-input w-full"
                    placeholder="Describe your custom goal..."
                    rows={3}
                    required
                  />
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200"
                >
                  Create Goal
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded-lg hover:bg-opacity-70 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Goals List */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {goals.length === 0 ? (
            <div className="glass-effect rounded-xl p-12 text-center">
              <TrophyIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Goals Yet</h3>
              <p className="text-gray-300 mb-6">
                Start your digital wellness journey by creating your first goal.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Create Your First Goal
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Active Goals */}
              {goals.filter(goal => !goal.completed).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Active Goals</h2>
                  <div className="space-y-6">
                    {goals.filter(goal => !goal.completed).map((goal, index) => {
                      const progress = getGoalProgress(goal);
                      return (
                        <motion.div
                          key={goal._id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-6 card-hover"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                                <h3 className="text-xl font-semibold text-white">
                                  {goalTypes.find(t => t.id === goal.goalType)?.name || 'Custom Goal'}
                                </h3>
                                <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-sm">
                                  {goal.category}
                                </span>
                              </div>

                              <div className="text-gray-300 mb-4">
                                {goal.dailyLimit && (
                                  <p>Daily limit: {goal.dailyLimit} minutes</p>
                                )}
                                {goal.productivityRatio && (
                                  <p>Target productivity: {goal.productivityRatio}%</p>
                                )}
                                {goal.customGoal && (
                                  <p>{goal.customGoal}</p>
                                )}
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm text-gray-300">Progress</span>
                                    <span className="text-sm text-white">{progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-700 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full bg-gradient-to-r ${
                                        progress >= 100
                                          ? 'from-green-500 to-teal-500'
                                          : progress >= 75
                                          ? 'from-yellow-500 to-orange-500'
                                          : 'from-purple-500 to-blue-500'
                                      }`}
                                      style={{ width: `${Math.min(progress, 100)}%` }}
                                    ></div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-300">
                                  Streak: {goal.streak} days
                                </div>
                              </div>

                              {!goal.completed && progress >= 100 && (
                                <div className="mt-4">
                                  <button
                                    onClick={() => markGoalComplete(goal._id)}
                                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200"
                                  >
                                    Mark as Complete
                                  </button>
                                </div>
                              )}
                            </div>

                            <button
                              onClick={() => deleteGoal(goal._id)}
                              className="text-red-400 hover:text-red-300 p-2 transition-colors"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Completed Goals */}
              {goals.filter(goal => goal.completed).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                    <span>Completed Goals</span>
                  </h2>
                  <div className="space-y-6">
                    {goals.filter(goal => goal.completed).map((goal, index) => {
                      return (
                        <motion.div
                          key={goal._id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-6 card-hover opacity-75"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-semibold text-white line-through">
                                  {goalTypes.find(t => t.id === goal.goalType)?.name || 'Custom Goal'}
                                </h3>
                                <span className="bg-green-500 bg-opacity-20 text-green-300 px-2 py-1 rounded text-sm">
                                  Completed
                                </span>
                                <span className="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded text-sm">
                                  {goal.category}
                                </span>
                              </div>

                              <div className="text-gray-400 mb-4">
                                {goal.dailyLimit && (
                                  <p>Daily limit: {goal.dailyLimit} minutes</p>
                                )}
                                {goal.productivityRatio && (
                                  <p>Target productivity: {goal.productivityRatio}%</p>
                                )}
                                {goal.customGoal && (
                                  <p>{goal.customGoal}</p>
                                )}
                                <p className="text-green-400 text-sm mt-2">
                                  Completed on: {new Date(goal.completedAt).toLocaleDateString()}
                                </p>
                              </div>

                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 w-full"></div>
                              </div>
                            </div>

                            <button
                              onClick={() => deleteGoal(goal._id)}
                              className="text-red-400 hover:text-red-300 p-2 transition-colors"
                            >
                              <TrashIcon className="h-5 w-5" />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}