'use client';

import { motion } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import {
  ChartBarIcon,
  HomeIcon,
  CogIcon,
  TrophyIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  CpuChipIcon,
  SparklesIcon,
  StarIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Goals', href: '/goals', icon: TrophyIcon },
  { name: 'Challenges', href: '/challenges', icon: SparklesIcon },
];

export default function Navbar() {
  const { data: session } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="glass-effect-metallic fixed w-full z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with Icon */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative">
                <CpuChipIcon className="h-8 w-8 text-blue-400" style={{
                  filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6))'
                }} />
              </div>
              <span className="text-white font-bold text-xl font-['Space_Grotesk'] gradient-text-blue">
                DigitalZen
              </span>
              <ShieldCheckIcon className="h-4 w-4 text-green-400 icon-glow" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-2">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="nav-item-hover px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 group"
                  >
                    <item.icon className="h-5 w-5 icon-glow group-hover:text-blue-400 transition-all duration-300" />
                    <span className="text-white group-hover:text-blue-300 transition-all duration-300">
                      {item.name}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            {session ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 px-3 py-2 rounded-full border border-purple-300/20">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name}
                      className="h-8 w-8 rounded-full border-2 border-blue-400/50 glow-animate"
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-blue-400 icon-glow" />
                  )}
                  <div className="text-sm">
                    <div className="text-metallic font-medium">
                      {session.user?.name || session.user?.email}
                    </div>
                  </div>
                </div>
                <motion.button
                  onClick={() => signOut()}
                  className="btn-metallic-blue px-4 py-2 rounded-lg text-white font-medium text-sm flex items-center space-x-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Sign Out</span>
                </motion.button>
              </div>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/auth/signin"
                  className="btn-metallic-purple px-6 py-2 rounded-lg text-white font-medium text-sm flex items-center space-x-2"
                >
                  <StarIcon className="h-4 w-4" />
                  <span>Sign In</span>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-metallic-blue p-2 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-effect-metallic border-t border-white/10"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={item.href}
                  className="nav-item-hover px-4 py-3 rounded-lg font-medium flex items-center space-x-3 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5 text-blue-400 icon-glow group-hover:text-purple-400 transition-all duration-300" />
                  <span className="text-white group-hover:text-blue-300 transition-all duration-300">
                    {item.name}
                  </span>
                </Link>
              </motion.div>
            ))}
            {session ? (
              <motion.button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="btn-metallic-blue w-full px-4 py-3 rounded-lg font-medium text-left flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <UserCircleIcon className="h-5 w-5" />
                <span>Sign Out</span>
              </motion.button>
            ) : (
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/auth/signin"
                  className="btn-metallic-purple w-full px-4 py-3 rounded-lg font-medium flex items-center space-x-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <StarIcon className="h-5 w-5" />
                  <span>Sign In</span>
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
