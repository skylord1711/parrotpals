import { AnimatePresence, motion } from 'framer-motion';
import SocialCard from './SocialCard';
import type { SocialPlatform } from '../types';

interface LinksTabProps {
  platforms: SocialPlatform[];
  onAnalyticsClick: (platformId: string) => void;
}

export default function LinksTab({ platforms, onAnalyticsClick }: LinksTabProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="links"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="px-4 pb-8 space-y-4"
      >
        {platforms.map((platform, index) => (
          <SocialCard
            key={platform.id}
            platform={platform}
            index={index}
            onAnalyticsClick={onAnalyticsClick}
          />
        ))}
      </motion.div>
    </AnimatePresence>
  );
}
