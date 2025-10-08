'use client';

import { motion } from 'framer-motion';
import { signIn, getProviders } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { ArrowRightIcon, ArrowLeftIcon, CpuChipIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SignInContent() {
  const [providers, setProviders] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res || {});
    };
    fetchProviders();
  }, []);

  const getErrorMessage = (error) => {
    switch (error) {
      case 'OAuthAccountNotLinked':
        return 'This email is already registered with a different sign-in method. We&apos;ve now enabled account linking - please try signing in again with GitHub.';
      case 'AccessDenied':
        return 'Access denied. You cancelled the authentication or permission was not granted.';
      case 'Verification':
        return 'The verification token has expired or has already been used.';
      default:
        return 'An error occurred during authentication. Please try again.';
    }
  };

  const handleSignIn = async (providerId) => {
    try {
      setIsLoading(true);
      const result = await signIn(providerId, { 
        callbackUrl: '/dashboard',
        redirect: false 
      });
      
      if (result?.error) {
        console.error('Sign in error:', result.error);
      } else if (result?.url) {
        window.location.href = result.url;
      }
    } catch (error) {
      console.error('Sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors mb-8"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
          
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-400 via-gray-500 to-gray-900 rounded-xl flex items-center justify-center mb-6 shadow-lg"
          >
            <CpuChipIcon className="h-8 w-8 text-white" />
          </motion.div>
          <h2 className="text-3xl font-bold card-title mb-2">
            Welcome to DigitalZen
          </h2>
          <p className="card-description">
            Sign in to start your digital wellness journey
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-effect-metallic rounded-2xl p-8 space-y-6 card-hover"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6"
            >
              <div className="flex items-start space-x-3">
                <ExclamationTriangleIcon className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-medium text-sm mb-1">Authentication Error</h3>
                  <p className="text-red-300 text-sm">{getErrorMessage(error)}</p>
                  {error === 'OAuthAccountNotLinked' && (
                    <div className="mt-3 text-xs text-red-200">
                      <p><strong>Good news!</strong> We&apos;ve enabled account linking for your security. Simply try signing in with GitHub again and your accounts will be automatically linked.</p>
                      <p className="mt-1">You&apos;ll then be able to sign in with either Google or GitHub in the future.</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          <div className="space-y-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              onClick={() => handleSignIn('google')}
              disabled={isLoading}
              className="btn-metallic-blue w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-3 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
              {isLoading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              onClick={() => handleSignIn('github')}
              disabled={isLoading}
              className="btn-metallic-purple w-full px-6 py-4 rounded-xl font-medium flex items-center justify-center space-x-3 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="white">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span>Continue with GitHub</span>
              {isLoading && <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>}
            </motion.button>
          </div>

          <div className="text-center">
            <p className="text-sm card-description">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="text-blue-400 hover:text-blue-300 transition-colors">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
                Privacy Policy
              </Link>
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="card-description">
            Secure authentication powered by NextAuth.js
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}
