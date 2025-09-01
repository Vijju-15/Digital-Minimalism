'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import {
  PlusIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  FireIcon,
  BoltIcon,
  SparklesIcon,
  BeakerIcon,
  RocketLaunchIcon,
  CpuChipIcon,
  StarIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  AcademicCapIcon,
  ShoppingCartIcon,
  PlayIcon,
  NewspaperIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const appCategories = [
  'Social Media',
  'Productivity',
  'Entertainment',
  'News',
  'Games',
  'Education',
  'Shopping',
  'Communication',
];

// App icons as SVG components
const AppIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  YouTube: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  ),
  Gmail: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
    </svg>
  ),
  Slack: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
    </svg>
  ),
  Netflix: () => (
    <img src="/netflix.png" alt="Netflix" className="w-6 h-6" />
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
  ),
  TikTok: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
    </svg>
  ),
  WhatsApp: () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.531 3.488"/>
    </svg>
  )
};

const commonApps = [
  { name: 'Instagram', category: 'Social Media', icon: <AppIcons.Instagram />, color: 'from-pink-500 to-purple-600' },
  { name: 'YouTube', category: 'Entertainment', icon: <AppIcons.YouTube />, color: 'from-red-500 to-red-600' },
  { name: 'Gmail', category: 'Communication', icon: <AppIcons.Gmail />, color: 'from-blue-500 to-blue-600' },
  { name: 'Slack', category: 'Productivity', icon: <AppIcons.Slack />, color: 'from-green-500 to-green-600' },
  { name: 'Netflix', category: 'Entertainment', icon: <AppIcons.Netflix />, color: 'from-red-600 to-black' },
  { name: 'Twitter', category: 'Social Media', icon: <AppIcons.Twitter />, color: 'from-blue-400 to-blue-500' },
  { name: 'TikTok', category: 'Social Media', icon: <AppIcons.TikTok />, color: 'from-purple-500 to-pink-500' },
  { name: 'WhatsApp', category: 'Communication', icon: <AppIcons.WhatsApp />, color: 'from-green-500 to-green-400' },
];

export default function DashboardPage() {
  const { data: session } = useSession();
  const [logs, setLogs] = useState([]);
  const [goals, setGoals] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [showQuickLog, setShowQuickLog] = useState(false);
  const [todayUsage, setTodayUsage] = useState(0);
  const [favorites, setFavorites] = useState(new Set());

  // Quick log form state
  const [quickLog, setQuickLog] = useState({
    app: '',
    category: '',
    duration: '',
    reflection: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logsRes, goalsRes, challengesRes] = await Promise.all([
        fetch('/api/logs'),
        fetch('/api/goals'),
        fetch('/api/challenges'),
      ]);

      if (logsRes.ok) setLogs(await logsRes.json());
      if (goalsRes.ok) setGoals(await goalsRes.json());
      if (challengesRes.ok) setChallenges(await challengesRes.json());
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleQuickLog = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quickLog),
      });

      if (res.ok) {
        setQuickLog({ app: '', category: '', duration: '', reflection: '' });
        setShowQuickLog(false);
        fetchData();
      }
    } catch (error) {
      console.error('Error logging usage:', error);
    }
  };

  const selectCommonApp = (app) => {
    setQuickLog({ ...quickLog, app: app.name, category: app.category });
  };

  const toggleFavorite = (statIndex) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(statIndex)) {
      newFavorites.delete(statIndex);
    } else {
      newFavorites.add(statIndex);
    }
    setFavorites(newFavorites);
  };

  // Calculate today's usage
  useEffect(() => {
    const today = new Date().toDateString();
    const todayLogs = logs.filter(log => 
      new Date(log.timestamp).toDateString() === today
    );
    const totalMinutes = todayLogs.reduce((sum, log) => sum + log.duration, 0);
    setTodayUsage(totalMinutes);
  }, [logs]);

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome back, {session?.user?.name || 'User'}
          </h1>
          <p className="text-gray-300 text-lg">
            {`Here's your digital wellness overview for today`}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Today's Usage",
              value: `${Math.floor(todayUsage / 60)}h ${todayUsage % 60}m`,
              icon: ClockIcon,
              gradient: 'var(--metallic-blue)',
              glow: 'var(--glow-blue)',
            },
            {
              title: 'Active Goals',
              value: goals.length,
              icon: TrophyIcon,
              gradient: 'var(--metallic-gold)',
              glow: 'var(--glow-gold)',
            },
            {
              title: 'Challenges',
              value: challenges.length,
              icon: FireIcon,
              gradient: 'var(--metallic-purple)',
              glow: 'var(--glow-purple)',
            },
            {
              title: 'Weekly Progress',
              value: '85%',
              icon: SparklesIcon,
              gradient: 'var(--metallic-green)',
              glow: 'var(--glow-green)',
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect-metallic rounded-xl p-6 card-hover group relative overflow-hidden"
            >
              {/* Glow effect background */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300" 
                   style={{ background: stat.gradient }}></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div 
                    className="p-3 rounded-xl border border-white/20"
                    style={{ 
                      background: stat.gradient,
                      boxShadow: `0 4px 15px ${stat.glow}`
                    }}
                  >
                    <stat.icon className="h-6 w-6 text-white icon-glow" />
                  </div>
                  <StarIcon 
                    className={`h-5 w-5 transition-all duration-300 cursor-pointer hover:scale-110 ${
                      favorites.has(index) 
                        ? 'text-yellow-400 opacity-100 glow-animate' 
                        : 'text-yellow-400 opacity-0 group-hover:opacity-100'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(index);
                    }}
                  />
                </div>
                <div className="text-3xl font-bold text-metallic mb-2 group-hover:text-white transition-colors duration-300">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {stat.title}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect-metallic rounded-xl p-6 mb-8 card-hover group"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-metallic group-hover:text-white transition-colors duration-300 flex items-center space-x-2">
              <RocketLaunchIcon className="h-6 w-6 icon-glow" />
              <span>Quick Actions</span>
            </h2>
            <motion.button
              onClick={() => setShowQuickLog(!showQuickLog)}
              className="btn-metallic-purple px-6 py-3 rounded-xl text-white font-medium flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PlusIcon className="h-4 w-4" />
              <span>Log Usage</span>
            </motion.button>
          </div>

          {/* Common Apps Quick Log */}
          {!showQuickLog && (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
              {commonApps.map((app, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    selectCommonApp(app);
                    setShowQuickLog(true);
                  }}
                  className="glass-effect-metallic rounded-lg p-4 text-center card-hover group relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${app.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  <div className="relative z-10">
                    <div className={`w-12 h-12 bg-gradient-to-r ${app.color} rounded-xl mx-auto mb-2 flex items-center justify-center text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      {app.icon}
                    </div>
                    <div className="text-metallic text-sm font-medium group-hover:text-white transition-colors duration-300">{app.name}</div>
                    <div className="text-gray-400 text-xs group-hover:text-gray-300 transition-colors duration-300">{app.category}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Quick Log Form */}
          {showQuickLog && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              onSubmit={handleQuickLog}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="App name"
                  value={quickLog.app}
                  onChange={(e) => setQuickLog({ ...quickLog, app: e.target.value })}
                  className="form-input"
                  required
                />
                <select
                  value={quickLog.category}
                  onChange={(e) => setQuickLog({ ...quickLog, category: e.target.value })}
                  className="form-select"
                  required
                >
                  <option value="">Select category</option>
                  {appCategories.map((category) => (
                    <option key={category} value={category} className="text-black">
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={quickLog.duration}
                  onChange={(e) => setQuickLog({ ...quickLog, duration: e.target.value })}
                  className="form-input"
                  required
                />
                <input
                  type="text"
                  placeholder="How did it feel? (optional)"
                  value={quickLog.reflection}
                  onChange={(e) => setQuickLog({ ...quickLog, reflection: e.target.value })}
                  className="form-input"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Log Usage
                </button>
                <button
                  type="button"
                  onClick={() => setShowQuickLog(false)}
                  className="bg-gray-500 bg-opacity-50 text-white px-6 py-2 rounded-lg hover:bg-opacity-70 transition-all duration-200 transform hover:scale-105"
                >
                  Cancel
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-xl p-6"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
          {logs.length === 0 ? (
            <div className="text-center py-8">
              <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-300">No usage logged yet. Start tracking your digital habits!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.slice(-5).reverse().map((log, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect-metallic rounded-xl p-4 flex items-center justify-between hover:bg-white/20 transition-all duration-300 border border-white/10"
                >
                  <div>
                    <div className="text-white font-medium text-lg">{log.app}</div>
                    <div className="text-gray-300 text-sm">{log.category}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium text-lg">{log.duration} min</div>
                    <div className="text-gray-300 text-sm">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
