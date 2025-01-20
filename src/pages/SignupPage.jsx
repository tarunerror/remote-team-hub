import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Building2, Globe2, MessageSquare, Zap, Users, Shield } from 'lucide-react';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement signup logic
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Left side - Animated Features */}
      <div className="hidden lg:flex lg:flex-1 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:3rem_3rem]"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
        </div>
        
        <div className="relative w-full flex items-center justify-center p-12">
          <div className="max-w-lg space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">
                Join the future of remote work
              </h2>
              <p className="text-xl text-blue-100">
                Thousands of teams are already collaborating seamlessly
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Enterprise Security
                    </h3>
                    <p className="text-blue-100">
                      Bank-grade encryption and secure authentication protocols
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Lightning Fast
                    </h3>
                    <p className="text-blue-100">
                      Real-time updates and instant collaboration features
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl transform hover:scale-105 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Globe2 className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      Global Teams
                    </h3>
                    <p className="text-blue-100">
                      Connect with team members across all time zones
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 rounded-2xl shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Building2 className="h-8 w-8 text-white" />
              </div>
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Create your workspace
            </h2>
            <p className="mt-2 text-gray-600">
              Start your journey to better team collaboration
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="group">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Full Name
              </label>
              <div className="mt-1 relative group">
                <input
                  id="name"
                  type="text"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           group-hover:border-blue-400 transition-all duration-300"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                />
                <User className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            <div className="group">
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Company Name
              </label>
              <div className="mt-1 relative group">
                <input
                  id="companyName"
                  type="text"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           group-hover:border-blue-400 transition-all duration-300"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  placeholder="Acme Inc."
                />
                <Building2 className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

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

            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                Confirm Password
              </label>
              <div className="mt-1 relative group">
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           group-hover:border-blue-400 transition-all duration-300"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                />
                <Lock className="absolute right-3 top-3 h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-sm font-medium text-white
                       bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                       transform hover:scale-[1.02] transition-all duration-200
                       shadow-md hover:shadow-lg"
            >
              Create Workspace
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500 hover:underline transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;