import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code, ArrowRight, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const LandingPage: React.FC = () => {
  const { setPrompt } = useAppContext();
  const [inputValue, setInputValue] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    setIsAnimating(true);
    setPrompt(inputValue);
    
    setTimeout(() => {
      navigate('/editor');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImdyYWQiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxYTFhMWEiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwMDAiLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyYWQpIi8+PC9zdmc+')] opacity-40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900 to-gray-900"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl relative"
      >
        <div className="flex justify-center mb-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 bg-gray-800 bg-opacity-50 backdrop-blur-lg px-6 py-3 rounded-2xl border border-gray-700"
          >
            <Code size={40} className="text-blue-400" />
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              BuildSite.ai
            </h1>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
            Transform your ideas into stunning websites<br />with the power of AI
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Simply describe what you want, and watch as AI crafts your perfect website in minutes.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-full relative"
        >
          <div className="flex flex-col md:flex-row gap-3 w-full bg-gray-800 bg-opacity-60 backdrop-blur-xl p-2 rounded-2xl border border-gray-700 shadow-[0_0_30px_rgba(59,130,246,0.1)]">
            <div className="flex-1 relative">
              <Sparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your dream website..."
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-400"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isAnimating}
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-70 shadow-lg"
            >
              {isAnimating ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
              ) : (
                <>
                  Generate Website
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>
        </motion.form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-12 space-y-4"
        >
          <p className="text-gray-400 text-sm font-medium">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "A portfolio website for a photographer",
              "An e-commerce site for handmade jewelry",
              "A blog about travel adventures"
            ].map((example) => (
              <button
                key={example}
                onClick={() => setInputValue(example)}
                className="px-4 py-2 bg-gray-800 bg-opacity-50 rounded-lg text-sm text-gray-300 hover:bg-opacity-70 transition-all"
              >
                {example}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-4 text-gray-500 text-sm"
      >
        © 2025 WebsiteBuilder.ai • Powered by AI
      </motion.div>
    </div>
  );
};

export default LandingPage;