import { useState } from 'react';
import { motion } from 'framer-motion';
import { Radio, Wifi, WifiOff, RefreshCw } from 'lucide-react';
import { useToast } from '../Toast';

interface LiveStatusProps {
  isLive: boolean;
  onToggle: () => void;
  tiktokUsername: string;
}

export default function LiveStatus({ isLive, onToggle, tiktokUsername }: LiveStatusProps) {
  const [checking, setChecking] = useState(false);
  const { showToast } = useToast();

  const handleAutoDetect = async () => {
    setChecking(true);
    try {
      const res = await fetch(`/api/check-tiktok-live?username=${encodeURIComponent(tiktokUsername)}`);
      const data = await res.json();

      if (data.isLive !== undefined) {
        if (data.isLive !== isLive) {
          onToggle();
        }
        showToast(data.isLive ? 'TikTok is live!' : 'Not live on TikTok');
      }
    } catch {
      showToast('Failed to check TikTok', 'error');
    } finally {
      setChecking(false);
    }
  };

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

      <button
        onClick={handleAutoDetect}
        disabled={checking}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white text-sm transition-all disabled:opacity-50"
      >
        <RefreshCw size={14} className={checking ? 'animate-spin' : ''} />
        {checking ? 'Checking TikTok...' : 'Auto-detect TikTok Live'}
      </button>
    </motion.div>
  );
}
