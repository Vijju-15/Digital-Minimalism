'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  FireIcon,
  CalendarIcon,
  CheckCircleIcon,
  TrophyIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const predefinedChallenges = [
  {
    name: 'No Social Sunday',
    description: 'Avoid all social media platforms for the entire Sunday',
    duration: 1,
    type: 'weekly',
  },
  {
    name: 'Morning Phone-Free Hour',
    description: 'Keep your phone away for the first hour after waking up',
    duration: 7,
    type: 'daily',
  },
  {
    name: 'Digital Sunset',
    description: 'No screens 1 hour before bedtime',
    duration: 7,
    type: 'daily',
  },
  {
    name: 'Focus Week',
    description: 'Limit entertainment apps to 30 minutes per day',
    duration: 7,
    type: 'weekly',
  },
];

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newChallenge, setNewChallenge] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    type: 'custom',
  });

  useEffect(() => {
    fetchChallenges();
  }, []);

  const fetchChallenges = async () => {
    try {
      const res = await fetch('/api/challenges');
      if (res.ok) {
        const data = await res.json();
        setChallenges(data);
      }
    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newChallenge),
      });

      if (res.ok) {
        setNewChallenge({
          name: '',
          description: '',
          startDate: '',
          endDate: '',
          type: 'custom',
        });
        setShowCreateForm(false);
        fetchChallenges();
      }
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  const joinPredefinedChallenge = async (challenge) => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + challenge.duration);

    const challengeData = {
      ...challenge,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };

    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challengeData),
      });

      if (res.ok) {
        fetchChallenges();
      }
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  const deleteChallenge = async (challengeId) => {
    try {
      const res = await fetch(`/api/challenges/${challengeId}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchChallenges();
      }
    } catch (error) {
      console.error('Error deleting challenge:', error);
    }
  };

  const markChallengeComplete = async (challengeId) => {
    try {
      const res = await fetch(`/api/challenges/${challengeId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: true }),
      });
      if (res.ok) {
        fetchChallenges();
      }
    } catch (error) {
      console.error('Error marking challenge complete:', error);
    }
  };

  const getDaysRemaining = (endDate) => {
    const now = new Date();
    const end = new Date(endDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getProgress = (challenge) => {
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
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
                Digital Wellness Challenges
              </h1>
              <p className="text-gray-300 text-lg">
                Join challenges to build better digital habits
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(true)}
              className="mt-4 sm:mt-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
            >
              <PlusIcon className="h-5 w-5" />
              <span>Create Challenge</span>
            </button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Active Challenges',
              value: challenges.filter(c => !c.completed).length,
              icon: FireIcon,
              color: 'from-orange-500 to-red-600',
            },
            {
              title: 'Completed',
              value: challenges.filter(c => c.completed).length,
              icon: CheckCircleIcon,
              color: 'from-green-500 to-teal-600',
            },
            {
              title: 'Total Points',
              value: challenges.length * 100,
              icon: TrophyIcon,
              color: 'from-yellow-500 to-orange-600',
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

        {/* Predefined Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Popular Challenges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predefinedChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-effect rounded-xl p-6 card-hover"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {challenge.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {challenge.description}
                    </p>
                    <div className="flex items-center text-gray-300 text-sm">
                      <CalendarIcon className="h-4 w-4 mr-1" />
                      {challenge.duration} day{challenge.duration > 1 ? 's' : ''}
                    </div>
                  </div>
                  <button
                    onClick={() => joinPredefinedChallenge(challenge)}
                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 text-sm"
                  >
                    Join
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Create Challenge Form */}
        {showCreateForm && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-xl p-6 mb-8"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Create Custom Challenge</h2>
            <form onSubmit={handleCreateChallenge} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Challenge Name
                  </label>
                  <input
                    type="text"
                    value={newChallenge.name}
                    onChange={(e) => setNewChallenge({ ...newChallenge, name: e.target.value })}
                    className="form-input w-full"
                    placeholder="e.g., No YouTube Week"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Challenge Type
                  </label>
                  <select
                    value={newChallenge.type}
                    onChange={(e) => setNewChallenge({ ...newChallenge, type: e.target.value })}
                    className="form-select w-full"
                  >
                    <option value="custom" className="text-black">Custom</option>
                    <option value="daily" className="text-black">Daily</option>
                    <option value="weekly" className="text-black">Weekly</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white text-sm font-medium mb-2">
                  Description
                </label>
                <textarea
                  value={newChallenge.description}
                  onChange={(e) => setNewChallenge({ ...newChallenge, description: e.target.value })}
                  className="form-input w-full"
                  placeholder="Describe your challenge..."
                  rows={3}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={newChallenge.startDate}
                    onChange={(e) => setNewChallenge({ ...newChallenge, startDate: e.target.value })}
                    className="form-input w-full"
                    required
                  />
                </div>
                <div>
                  <label className="block text-white text-sm font-medium mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={newChallenge.endDate}
                    onChange={(e) => setNewChallenge({ ...newChallenge, endDate: e.target.value })}
                    className="form-input w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200"
                >
                  Create Challenge
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

        {/* Active & Completed Challenges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {challenges.length === 0 ? (
            <div className="glass-effect rounded-xl p-12 text-center">
              <TrophyIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Challenges Yet</h3>
              <p className="text-gray-300 mb-6">
                Join a challenge to start building better digital habits.
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
              >
                Create Your First Challenge
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Active Challenges */}
              {challenges.filter(challenge => !challenge.completed).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6">Active Challenges</h2>
                  <div className="space-y-6">
                    {challenges.filter(challenge => !challenge.completed).map((challenge, index) => {
                      const progress = getProgress(challenge);
                      const daysRemaining = getDaysRemaining(challenge.endDate);
                      
                      return (
                        <motion.div
                          key={challenge._id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-6 card-hover"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <div className="w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"></div>
                                <h3 className="text-xl font-semibold text-white">
                                  {challenge.name}
                                </h3>
                              </div>
                              <p className="text-gray-300 mb-4">{challenge.description}</p>
                              
                              <div className="flex items-center space-x-6 text-sm text-gray-300">
                                <div className="flex items-center">
                                  <CalendarIcon className="h-4 w-4 mr-1" />
                                  {daysRemaining} days left
                                </div>
                                <div className="flex items-center">
                                  <FireIcon className="h-4 w-4 mr-1" />
                                  {progress}% complete
                                </div>
                              </div>

                              <div className="mt-4">
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
                                        : 'from-orange-500 to-red-500'
                                    }`}
                                    style={{ width: `${Math.min(progress, 100)}%` }}
                                  ></div>
                                </div>
                              </div>

                              {!challenge.completed && progress >= 100 && (
                                <div className="mt-4">
                                  <button
                                    onClick={() => markChallengeComplete(challenge._id)}
                                    className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200"
                                  >
                                    Mark as Complete
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => deleteChallenge(challenge._id)}
                                className="text-red-400 hover:text-red-300 p-2 transition-colors"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Completed Challenges */}
              {challenges.filter(challenge => challenge.completed).length > 0 && (
                <div>
                  <h2 className="text-2xl font-semibold text-white mb-6 flex items-center space-x-2">
                    <CheckCircleIcon className="h-6 w-6 text-green-400" />
                    <span>Completed Challenges</span>
                  </h2>
                  <div className="space-y-6">
                    {challenges.filter(challenge => challenge.completed).map((challenge, index) => {
                      return (
                        <motion.div
                          key={challenge._id}
                          initial={{ opacity: 0, x: -30 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="glass-effect rounded-xl p-6 card-hover opacity-75"
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <CheckCircleIcon className="w-6 h-6 text-green-400" />
                                <h3 className="text-xl font-semibold text-white line-through">
                                  {challenge.name}
                                </h3>
                                <span className="bg-green-500 bg-opacity-20 text-green-300 px-2 py-1 rounded text-sm">
                                  Completed
                                </span>
                              </div>
                              <p className="text-gray-400 mb-4">{challenge.description}</p>
                              
                              <p className="text-green-400 text-sm mb-4">
                                Completed on: {new Date(challenge.completedAt).toLocaleDateString()}
                              </p>

                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="h-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 w-full"></div>
                              </div>
                            </div>

                            <div className="flex space-x-2">
                              <button
                                onClick={() => deleteChallenge(challenge._id)}
                                className="text-red-400 hover:text-red-300 p-2 transition-colors"
                              >
                                <TrashIcon className="h-5 w-5" />
                              </button>
                            </div>
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
