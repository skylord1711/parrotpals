import { motion } from 'framer-motion';
import { Radio, Wifi, WifiOff } from 'lucide-react';

interface LiveStatusProps {
  isLive: boolean;
  onToggle: () => void;
}

export default function LiveStatus({ isLive, onToggle }: LiveStatusProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${isLive ? 'bg-red-500/10' : 'bg-gray-500/10'}`}>
            <Radio size={18} className={isLive ? 'text-red-400' : 'text-gray-400'} />
          </div>
          <h3 className="font-semibold text-white">Live Status</h3>
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-medium ${isLive ? 'text-red-400' : 'text-gray-400'}`}>
          {isLive ? <Wifi size={14} /> : <WifiOff size={14} />}
          {isLive ? 'LIVE' : 'Offline'}
        </span>
      </div>

      <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 mb-4">
        <span className="text-sm text-gray-300">Stream Status</span>
        <button
          onClick={onToggle}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isLive ? 'bg-red-500' : 'bg-gray-600'
          }`}
          aria-label="Toggle live status"
        >
          <motion.div
            animate={{ x: isLive ? 24 : 2 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="absolute top-1 w-5 h-4 bg-white rounded-full shadow-md"
          />
        </button>
      </div>

      {isLive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          className="p-3 rounded-xl bg-red-500/5 border border-red-500/10"
        >
          <p className="text-xs text-red-300">
            TikTok live detection placeholder — integrate with TikTok API for auto-detection.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
