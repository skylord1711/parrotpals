import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

interface ThemeCustomizerProps {
  primaryColor: string;
  secondaryColor: string;
  onPrimaryChange: (color: string) => void;
  onSecondaryChange: (color: string) => void;
}

export default function ThemeCustomizer({
  primaryColor,
  secondaryColor,
  onPrimaryChange,
  onSecondaryChange,
}: ThemeCustomizerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-purple-500/10">
          <Palette size={18} className="text-purple-400" />
        </div>
        <h3 className="font-semibold text-white">Theme Customization</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-2">Primary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primaryColor}
              onChange={(e) => onPrimaryChange(e.target.value)}
              className="w-10 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => onPrimaryChange(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-2">Secondary Color</label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={secondaryColor}
              onChange={(e) => onSecondaryChange(e.target.value)}
              className="w-10 h-10 rounded-xl border border-white/10 bg-transparent cursor-pointer"
            />
            <input
              type="text"
              value={secondaryColor}
              onChange={(e) => onSecondaryChange(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 font-mono"
            />
          </div>
        </div>
      </div>

      <div className="mt-5 p-3 rounded-xl bg-white/5">
        <p className="text-xs text-gray-400">Colors update the UI in real-time across all pages.</p>
      </div>
    </motion.div>
  );
}
