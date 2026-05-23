import { motion } from 'framer-motion';
import { ExternalLink, Music, MessageCircle, Globe, Video } from 'lucide-react';
import type { SocialPlatform } from '../types';
import { useToast } from './Toast';

interface SocialCardProps {
  platform: SocialPlatform;
  index: number;
  onAnalyticsClick: (platformId: string) => void;
}

const iconMap: Record<string, React.ElementType> = {
  music: Music,
  'message-circle': MessageCircle,
  twitch: Globe,
  youtube: Video,
};

export default function SocialCard({ platform, index, onAnalyticsClick }: SocialCardProps) {
  const { showToast } = useToast();
  const IconComponent = iconMap[platform.icon] || Music;

  const handleClick = () => {
    onAnalyticsClick(platform.id);
    window.open(platform.url, '_blank', 'noopener,noreferrer');
    showToast(`Opening ${platform.name}...`);
  };

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`glass rounded-2xl p-5 cursor-pointer group transition-all duration-300 hover:shadow-lg ${platform.isLive ? 'animate-glow-pulse' : 'gradient-border'}`}
      style={{
        ...(platform.isLive
          ? { borderColor: 'rgba(239, 68, 68, 0.3)', boxShadow: '0 0 20px rgba(239, 68, 68, 0.1)' }
          : {}),
      }}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      aria-label={`Open ${platform.name} profile`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-xl ${platform.isLive ? 'bg-red-500/15' : 'bg-white/5'} group-hover:bg-white/10 transition-colors`}>
            <IconComponent
              size={22}
              className={platform.isLive ? 'text-red-400' : 'text-gray-300'}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white text-sm">{platform.name}</h3>
              {platform.isLive && (
                <span className="text-[10px] font-bold text-red-400 bg-red-500/15 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  LIVE
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{platform.username}</p>
          </div>
        </div>
        <ExternalLink size={16} className="text-gray-500 group-hover:text-white transition-colors flex-shrink-0 mt-1" />
      </div>

      <p className="text-sm text-gray-300 line-clamp-2">{platform.description}</p>
    </motion.div>
  );
}
