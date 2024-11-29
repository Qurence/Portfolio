import React from 'react';
import { motion } from 'framer-motion';

interface LanguageToggleProps {
  currentLang: string;
  onToggle: (lang: string) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLang, onToggle }) => {
  return (
    <div className="fixed right-6 top-4 z-50 flex gap-2">
      {['en', 'uk'].map((lang) => (
        <motion.button
          key={lang}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggle(lang)}
          className={`px-3 py-1 rounded-md ${
            currentLang === lang
              ? 'bg-purple-600 text-white'
              : 'bg-purple-900/20 hover:bg-purple-600/20'
          }`}
        >
          {lang.toUpperCase()}
        </motion.button>
      ))}
    </div>
  );
};