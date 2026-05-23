import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface SocialStatsManagerProps {
  stats: Record<string, number>;
  onUpdate: (stats: Record<string, number>) => void;
}

export default function SocialStatsManager({ stats, onUpdate }: SocialStatsManagerProps) {
  const handleChange = (platform: string, value: string) => {
    const num = parseInt(value, 10);
    if (!isNaN(num)) {
      onUpdate({ ...stats, [platform]: num });
    }
  };

  const platforms = [
    { key: 'tiktok', label: 'TikTok', color: '#a855f7' },
    { key: 'discord', label: 'Discord', color: '#6366f1' },
    { key: 'twitch', label: 'Twitch', color: '#9146ff' },
    { key: 'youtube', label: 'YouTube', color: '#ef4444' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2 rounded-lg bg-cyan-500/10">
          <Users size={18} className="text-cyan-400" />
        </div>
        <h3 className="font-semibold text-white">Social Stats</h3>
      </div>

      <div className="space-y-3">
        {platforms.map((platform) => (
          <div key={platform.key} className="flex items-center gap-3">
            <span className="w-20 text-sm text-gray-300">{platform.label}</span>
            <input
              type="number"
              value={stats[platform.key] ?? 0}
              onChange={(e) => handleChange(platform.key, e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: platform.color }} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
