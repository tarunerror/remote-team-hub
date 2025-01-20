import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Mail, Lock, Users, Globe2, Laptop2, Zap, Clock, Github, Chrome } from 'lucide-react';
import { login, loginWithOAuth, clearError } from '../store/slices/authSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(login(formData)).unwrap();
      navigate('/');
    } catch (err) {
      // Error is handled by the slice
    }
  };

  const handleOAuthLogin = async (provider) => {
    try {
      await dispatch(loginWithOAuth(provider)).unwrap();
      navigate('/');
    } catch (err) {
      // Error is handled by the slice
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Welcome back!
            </h2>
            <p className="mt-2 text-gray-600">
              Your remote workspace awaits you
            </p>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md animate-shake">
              <p className="font-medium">Login failed</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Work Email
              </label>
              <div className="mt-1 relative group">
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           group-hover:border-blue-400 transition-all duration-300"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Password
              </label>
              <div className="mt-1 relative group">
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           group-hover:border-blue-400 transition-all duration-300"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white
                       bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       disabled:opacity-50 transform hover:scale-[1.02] transition-all duration-200
                       shadow-md hover:shadow-lg"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in to Workspace'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              New to our platform?{' '}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Animated features */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        {/* Rest of the right side content remains the same */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:3rem_3rem]"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full max-w-lg">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
            
            <div className="relative space-y-8">
              <div className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl transform hover:scale-105 transition-transform duration-300">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Experience seamless collaboration
                </h2>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform">
                    <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl">
                      <Laptop2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Remote-First</h3>
                      <p className="text-blue-100">Work from anywhere, anytime</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform">
                    <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Real-time Sync</h3>
                      <p className="text-blue-100">Instant updates and communication</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 transform hover:translate-x-2 transition-transform">
                    <div className="flex-shrink-0 p-3 bg-white/20 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Time Tracking</h3>
                      <p className="text-blue-100">Manage your team's productivity</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;