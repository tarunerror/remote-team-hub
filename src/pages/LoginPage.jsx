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
  const [oauthError, setOauthError] = useState('');

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
      setOauthError('');
      await dispatch(loginWithOAuth(provider)).unwrap();
      navigate('/');
    } catch (err) {
      if (err.message?.includes('popup-blocked')) {
        setOauthError('Please allow popups for this site to use social login');
      } else {
        setOauthError(`Failed to login with ${provider}. Please try again.`);
      }
    }
  };

  return (
    <div className="min-h-screen flex bg-theme">
      {/* Left side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-primary to-secondary p-4 rounded-2xl shadow-lg">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold animate-gradient-text">
              Welcome back!
            </h2>
            <p className="mt-2 text-theme">
              Your remote workspace awaits you
            </p>
          </div>

          {(error || oauthError) && (
            <div className="mb-4 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded-md animate-shake">
              <p className="font-medium">Login failed</p>
              <p className="text-sm">{error || oauthError}</p>
            </div>
          )}

          {/* OAuth Buttons */}
          <div className="space-y-4 mb-6">
            <button
              onClick={() => handleOAuthLogin('github')}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium
                       bg-theme-foreground text-theme border border-white/10
                       hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50
                       transition-all duration-200 glass"
            >
              <Github className="h-5 w-5 mr-2" />
              Continue with GitHub
            </button>
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium
                       bg-theme-foreground text-theme border border-white/10
                       hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-primary/50
                       transition-all duration-200 glass"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Continue with Google
            </button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-theme text-theme">Or continue with</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-theme group-hover:text-primary transition-colors">
                Work Email
              </label>
              <div className="mt-1 relative group">
                <input
                  id="email"
                  type="email"
                  required
                  className="block w-full px-4 py-3 rounded-lg text-theme
                           bg-theme-foreground border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-primary/50
                           group-hover:border-primary/50 transition-all duration-300
                           placeholder-gray-500 glass"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@company.com"
                />
                <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>

            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-theme group-hover:text-primary transition-colors">
                Password
              </label>
              <div className="mt-1 relative group">
                <input
                  id="password"
                  type="password"
                  required
                  className="block w-full px-4 py-3 rounded-lg text-theme
                           bg-theme-foreground border border-white/10
                           focus:outline-none focus:ring-2 focus:ring-primary/50
                           group-hover:border-primary/50 transition-all duration-300
                           placeholder-gray-500 glass"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white
                       bg-gradient-to-r from-primary to-secondary
                       hover:from-primary-600 hover:to-secondary-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
                       disabled:opacity-50 transform hover:scale-[1.02] transition-all duration-200
                       shadow-lg hover:shadow-xl glow"
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
            <p className="text-sm text-theme">
              New to our platform?{' '}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary-400 hover:underline transition-colors"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Features */}
      <div className="hidden lg:flex lg:flex-1 bg-theme-foreground glass relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:3rem_3rem]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        </div>
        
        <div className="relative w-full flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-theme mb-4 glow-text">
                Experience the future of teamwork
              </h2>
              <p className="text-xl text-theme/80">
                Connect, collaborate, and create together
              </p>
            </div>

            <div className="grid gap-8">
              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 card-3d">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                    <Laptop2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-theme font-semibold text-lg mb-2">
                      Work from Anywhere
                    </h3>
                    <p className="text-theme/80">
                      Stay connected with your team, no matter where you are
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 card-3d">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-theme font-semibold text-lg mb-2">
                      Real-time Collaboration
                    </h3>
                    <p className="text-theme/80">
                      Work together in real-time with powerful collaboration tools
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300 card-3d">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-primary to-secondary p-3 rounded-xl">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-theme font-semibold text-lg mb-2">
                      Boost Productivity
                    </h3>
                    <p className="text-theme/80">
                      Track progress and manage tasks efficiently
                    </p>
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