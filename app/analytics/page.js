'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { ChartBarIcon, ArrowTrendingUpIcon, ClockIcon } from '@heroicons/react/24/outline';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

export default function AnalyticsPage() {
  const [logs, setLogs] = useState([]);
  const [timeRange, setTimeRange] = useState('week');
  const [chartData, setChartData] = useState({
    daily: [],
    category: [],
    productivity: [],
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/logs');
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const processChartData = useCallback(() => {
    const now = new Date();
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    
    // Daily usage data
    const dailyData = [];
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      
      const dayLogs = logs.filter(log => 
        new Date(log.timestamp).toDateString() === dateStr
      );
      
      const totalMinutes = dayLogs.reduce((sum, log) => sum + log.duration, 0);
      const productiveMinutes = dayLogs
        .filter(log => ['Productivity', 'Education'].includes(log.category))
        .reduce((sum, log) => sum + log.duration, 0);
      
      dailyData.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: Math.round(totalMinutes / 60 * 10) / 10,
        productive: Math.round(productiveMinutes / 60 * 10) / 10,
      });
    }

    // Category breakdown
    const categoryData = {};
    logs.forEach(log => {
      if (!categoryData[log.category]) {
        categoryData[log.category] = 0;
      }
      categoryData[log.category] += log.duration;
    });

    const categoryArray = Object.entries(categoryData).map(([category, minutes]) => ({
      category,
      minutes: Math.round(minutes / 60 * 10) / 10,
      percentage: Math.round((minutes / logs.reduce((sum, log) => sum + log.duration, 0)) * 100)
    }));

    // Productivity trends
    const productivityData = dailyData.map(day => ({
      date: day.date,
      score: day.total > 0 ? Math.round((day.productive / day.total) * 100) : 0
    }));

    setChartData({
      daily: dailyData,
      category: categoryArray,
      productivity: productivityData,
    });
  }, [logs, timeRange]);

  useEffect(() => {
    if (logs.length > 0) {
      processChartData();
    }
  }, [logs, timeRange, processChartData]);

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Analytics Dashboard
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <p className="text-gray-300 text-lg mb-4 sm:mb-0">
              Insights into your digital habits and patterns
            </p>
            <div className="flex space-x-2">
              {['week', 'month', 'quarter'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    timeRange === range
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                      : 'bg-white bg-opacity-10 text-gray-300 hover:bg-opacity-20'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              title: 'Total Screen Time',
              value: `${Math.round(logs.reduce((sum, log) => sum + log.duration, 0) / 60)}h`,
              change: '+12%',
              icon: ClockIcon,
              color: 'from-blue-500 to-purple-600',
            },
            {
              title: 'Productivity Score',
              value: '75%',
              change: '+8%',
              icon: ArrowTrendingUpIcon,
              color: 'from-green-500 to-teal-600',
            },
            {
              title: 'Most Used Category',
              value: chartData.category[0]?.category || 'N/A',
              change: `${chartData.category[0]?.percentage || 0}%`,
              icon: ChartBarIcon,
              color: 'from-orange-500 to-red-600',
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
                <div className="text-green-400 text-sm font-medium">{stat.change}</div>
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Usage Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Daily Usage Trends</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="date" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="total" fill="#8884d8" name="Total Hours" />
                  <Bar dataKey="productive" fill="#82ca9d" name="Productive Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Category Breakdown */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-effect rounded-xl p-6"
          >
            <h3 className="text-xl font-semibold text-white mb-6">Usage by Category</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData.category}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ category, percentage }) => `${category}: ${percentage}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="minutes"
                  >
                    {chartData.category.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Productivity Trends */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="glass-effect rounded-xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Productivity Score Trends</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.productivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    border: 'none',
                    borderRadius: '8px',
                    color: 'white',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-effect rounded-xl p-6 mt-8"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Insights & Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-500 bg-opacity-20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Peak Usage Time</h4>
              <p className="text-gray-300 text-sm">
                You spend most of your time on devices between 2-6 PM. Consider taking breaks during this period.
              </p>
            </div>
            <div className="bg-green-500 bg-opacity-20 rounded-lg p-4">
              <h4 className="text-white font-medium mb-2">Productivity Tip</h4>
              <p className="text-gray-300 text-sm">
                Your productivity score improved by 8% this week! Keep up the great work.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
