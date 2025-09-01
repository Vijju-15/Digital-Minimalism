'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  ExclamationTriangleIcon,
  ArrowLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error) => {
    switch (error) {
      case 'Configuration':
        return 'There is a problem with the server configuration.';
      case 'AccessDenied':
        return 'Access was denied. Please check your credentials.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      case 'OAuthCallback':
        return 'Error occurred during OAuth authentication. Please try again.';
      default:
        return 'An authentication error occurred. Please try signing in again.';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full text-center space-y-8"
      >
        <div>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6"
          >
            <ExclamationTriangleIcon className="h-8 w-8 text-white" />
          </motion.div>
          
          <h2 className="text-3xl font-bold card-title mb-4">
            Authentication Error
          </h2>
          
          <p className="card-description mb-6">
            {getErrorMessage(error)}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect-metallic rounded-2xl p-8 space-y-6"
        >
          <div className="space-y-4">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/auth/signin"
                className="btn-metallic-blue w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-3"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span>Try Again</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/"
                className="btn-metallic-purple w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-3"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                <span>Back to Home</span>
              </Link>
            </motion.div>
          </div>

          {error && (
            <div className="text-center">
              <p className="text-xs card-description font-mono">
                Error Code: {error}
              </p>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <p className="card-description text-sm">
            If this problem persists, please contact support or try using a different browser.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function AuthError() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-2 border-blue-400 border-t-transparent rounded-full"></div>
      </div>
    }>
      <ErrorContent />
    </Suspense>
  );
}
