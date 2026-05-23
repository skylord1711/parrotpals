import { motion } from 'framer-motion';
import { BarChart3, Trash2, ExternalLink } from 'lucide-react';
import type { LinkAnalytics } from '../../types';
import { useToast } from '../Toast';

interface AnalyticsProps {
  analytics: LinkAnalytics[];
  onReset: () => void;
}

const platformColors: Record<string, string> = {
  tiktok: '#a855f7',
  discord: '#6366f1',
  twitch: '#9146ff',
  youtube: '#ef4444',
};

export default function Analytics({ analytics, onReset }: AnalyticsProps) {
  const { showToast } = useToast();
  const totalClicks = analytics.reduce((sum, a) => sum + a.clicks, 0);

  const handleReset = () => {
    onReset();
    showToast('Analytics reset');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10">
            <BarChart3 size={18} className="text-amber-400" />
          </div>
          <h3 className="font-semibold text-white">Analytics</h3>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 text-red-300 hover:bg-red-500/20 text-xs font-medium transition-all"
        >
          <Trash2 size={14} />
          Reset
        </button>
      </div>

      <div className="space-y-3 mb-4">
        {analytics.map((item) => {
          const maxClicks = Math.max(...analytics.map((a) => a.clicks), 1);
          const percentage = (item.clicks / maxClicks) * 100;
          const color = platformColors[item.platform] || '#a855f7';

          return (
            <div key={item.platform}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <ExternalLink size={14} className="text-gray-400" />
                  <span className="text-sm text-gray-300 capitalize">{item.platform}</span>
                </div>
                <span className="text-sm font-medium text-white">{item.clicks} clicks</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-white/5 flex items-center justify-between">
        <span className="text-sm text-gray-300">Total Clicks</span>
        <span className="text-xl font-bold gradient-text">{totalClicks}</span>
      </div>
    </motion.div>
  );
}
