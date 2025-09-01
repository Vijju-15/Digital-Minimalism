'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ArrowRightIcon, 
  SparklesIcon, 
  ShieldCheckIcon, 
  ChartBarIcon,
  CpuChipIcon,
  BoltIcon,
  StarIcon,
  TrophyIcon,
  BeakerIcon,
  RocketLaunchIcon,
  CubeTransparentIcon
} from '@heroicons/react/24/outline';

export default function Home() {
  const stats = [
    { icon: StarIcon, value: '10K+', label: 'Happy Users' },
    { icon: TrophyIcon, value: '95%', label: 'Goal Achievement' },
    { icon: BoltIcon, value: '30%', label: 'Less Screen Time' },
    { icon: BeakerIcon, value: '24/7', label: 'Analytics' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-violet-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Floating Icon */}
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 mb-8"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <CpuChipIcon className="w-16 h-16 text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text icon-glow float-animation" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
                <span className="block text-metallic mb-2">Reclaim Your</span>
                <span className="block gradient-text-purple font-['Space_Grotesk']">Digital Life</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Transform your relationship with technology through mindful tracking, 
                intentional usage, and beautiful insights that promote digital wellness with cutting-edge AI analytics.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            >
              <Link
                href="/auth/signin"
                className="btn-metallic-purple px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 text-lg group inline-flex"
              >
                <RocketLaunchIcon className="h-6 w-6 group-hover:rotate-12 transition-transform duration-300" />
                <span>Start Your Journey</span>
              </Link>
              <button className="btn-metallic-blue px-8 py-4 rounded-xl text-white font-semibold flex items-center justify-center space-x-3 text-lg inline-flex">
                <CubeTransparentIcon className="h-6 w-6" />
                <span>Watch Demo</span>
              </button>
            </motion.div>
          </div>

          {/* Floating Feature Cards */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: SparklesIcon,
                title: "Mindful Tracking",
                description: "Build awareness of your digital habits with beautiful, non-judgmental tracking.",
                delay: 0.3,
                gradient: "from-blue-400 via-purple-500 to-pink-500",
                bgGradient: "from-blue-500/10 to-purple-500/10"
              },
              {
                icon: ChartBarIcon,
                title: "Beautiful Insights",
                description: "Transform your data into actionable insights with stunning visualizations.",
                delay: 0.4,
                gradient: "from-green-400 via-blue-500 to-purple-600",
                bgGradient: "from-green-500/10 to-blue-500/10"
              },
              {
                icon: ShieldCheckIcon,
                title: "Privacy First",
                description: "Your data stays yours. Complete privacy and control over your information.",
                delay: 0.5,
                gradient: "from-emerald-400 via-teal-500 to-cyan-600",
                bgGradient: "from-emerald-500/10 to-teal-500/10"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: feature.delay }}
                className="glass-effect-metallic rounded-2xl p-8 card-hover group relative overflow-hidden"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
                    <feature.icon className="h-8 w-8 text-white icon-glow" />
                  </div>
                  <h3 className="text-xl font-semibold card-title mb-4 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="card-description transition-colors duration-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="mx-auto max-w-2xl text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl gradient-text-blue">
              Trusted by Digital Wellness Enthusiasts
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Join thousands who have transformed their digital habits
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="glass-effect-metallic p-6 rounded-2xl text-center card-hover group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <stat.icon className="h-8 w-8 mx-auto text-blue-400 icon-glow group-hover:text-purple-400 transition-colors duration-300 mb-4" />
                <div className="text-3xl font-bold text-metallic mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-metallic">Everything You Need for</span>
              <span className="block gradient-text">Digital Wellness</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools designed to help you develop a healthier relationship with technology.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="glass-effect-metallic rounded-xl p-6 card-hover group">
                <h3 className="text-2xl font-semibold text-metallic mb-3 group-hover:text-white transition-colors duration-300">Smart Analytics</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  Get deep insights into your digital patterns with beautiful charts and personalized recommendations.
                </p>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                    Daily usage summaries
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3"></div>
                    Productivity scoring
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full mr-3"></div>
                    Trend analysis
                  </li>
                </ul>
              </div>

              <div className="glass-effect-metallic rounded-xl p-6 card-hover group">
                <h3 className="text-2xl font-semibold text-metallic mb-3 group-hover:text-white transition-colors duration-300">Goal Setting & Challenges</h3>
                <p className="text-gray-300 mb-4 group-hover:text-gray-200 transition-colors duration-300">
                  Set meaningful goals and join community challenges to stay motivated on your journey.
                </p>
                <Link
                  href="/auth/signin"
                  className="inline-flex items-center text-blue-400 hover:text-purple-300 transition-colors group"
                >
                  <span>Start setting goals</span>
                  <ArrowRightIcon className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-effect-metallic rounded-2xl p-8 h-96 flex items-center justify-center card-hover group">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-400 via-blue-500 to-pink-400 rounded-full mx-auto mb-6 flex items-center justify-center glow-animate">
                    <ChartBarIcon className="h-12 w-12 text-white icon-glow" />
                  </div>
                  <h4 className="text-xl font-semibold text-metallic mb-2 group-hover:text-white transition-colors duration-300">Beautiful Dashboard</h4>
                  <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">
                    Experience your data like never before with our stunning, intuitive interface.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            className="glass-effect-metallic mx-auto max-w-4xl rounded-3xl p-8 sm:p-16 text-center card-hover relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-blue-500/5 to-pink-500/5"></div>
            
            <div className="relative z-10">
              <div className="relative inline-flex items-center justify-center w-20 h-20 mx-auto mb-8">
                <SparklesIcon className="h-16 w-16 text-yellow-400 icon-glow glow-animate" style={{
                  filter: 'drop-shadow(0 0 20px rgba(251, 191, 36, 0.8))'
                }} />
              </div>
              
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">
                <span className="gradient-text-blue">Ready to Transform Your</span>
                <br />
                <span className="text-metallic">Digital Wellness?</span>
              </h2>
              
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 mb-10">
                Join thousands of users who have already started their journey towards mindful technology use.
                Your future self will thank you.
              </p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <Link
                  href="/auth/signin"
                  className="btn-metallic-gold px-8 py-4 rounded-xl font-semibold text-lg flex items-center justify-center space-x-3"
                >
                  <StarIcon className="h-6 w-6" />
                  <span>Get Started Free</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
