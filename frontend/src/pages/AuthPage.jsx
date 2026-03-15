import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Chrome, ArrowRight } from 'lucide-react';

const AuthPage = ({ type }) => {
  const isLogin = type === 'login';

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="glass p-8 rounded-3xl space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p className="text-gray-500">{isLogin ? 'Login to access your history' : 'Sign up for a free creator account'}</p>
        </div>

        <div className="space-y-4">
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-all font-medium">
            <Chrome size={20} className="text-red-500" />
            Continue with Google
          </button>

          <div className="relative flex items-center justify-center py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-slate-700"></div></div>
            <span className="relative bg-white dark:bg-slate-800 px-4 text-xs text-gray-400 uppercase tracking-widest">Or with email</span>
          </div>

          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-all"
                />
              </div>
            </div>

            <button className="btn-primary w-full py-3 flex items-center justify-center gap-2">
              {isLogin ? 'Login' : 'Sign Up'} <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-gray-500">
          {isLogin ? "Don't have an account?" : "Already have an account?"} {' '}
          <Link to={isLogin ? '/signup' : '/login'} className="text-primary font-bold hover:underline">
            {isLogin ? 'Sign up' : 'Login'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
