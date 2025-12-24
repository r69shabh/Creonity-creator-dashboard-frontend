import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

interface SignupProps {
  onSignup: () => void;
}

const Signup: React.FC<SignupProps> = ({ onSignup }) => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, API call to register would go here.
    onSignup();
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="size-12 bg-gradient-to-tr from-primary to-orange-500 rounded-xl flex items-center justify-center text-white shadow-glow mx-auto mb-6">
            <span className="material-symbols-outlined text-[28px]">hub</span>
          </div>
          <h1 className="text-2xl font-display font-bold text-text-primary dark:text-white tracking-tight">
            Create your account
          </h1>
          <p className="text-text-secondary dark:text-gray-400 text-sm">
            Start your journey as a professional creator.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input 
              label="Full Name" 
              type="text" 
              placeholder="Alex Morgan" 
              required
            />
            <Input 
              label="Email" 
              type="email" 
              placeholder="you@example.com" 
              leftIcon="mail"
              required
            />
            <div className="space-y-1.5">
               <Input 
                label="Password" 
                type="password" 
                placeholder="••••••••" 
                leftIcon="lock"
                required
              />
              <p className="text-[10px] text-text-secondary dark:text-gray-500">Must be at least 8 characters.</p>
            </div>

            <Button type="submit" className="w-full py-3" size="lg">
              Create Account
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-gray-900 px-2 text-text-secondary dark:text-gray-500">Or sign up with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-text-primary dark:text-white">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </button>
            <button className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium text-text-primary dark:text-white">
              <img src="https://www.svgrepo.com/show/452229/instagram-1.svg" className="w-5 h-5" alt="Instagram" />
              Instagram
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm">
          <span className="text-text-secondary dark:text-gray-500">Already have an account? </span>
          <Link to="/login" className="font-bold text-text-primary dark:text-white hover:text-primary transition-colors">Sign in</Link>
        </div>

        <div className="flex justify-center gap-4 text-xs text-text-secondary dark:text-gray-600">
          <Link to="#">Terms of Service</Link>
          <Link to="#">Privacy Policy</Link>
        </div>

      </div>
    </div>
  );
};

export default Signup;