import { motion } from 'framer-motion';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LiveStatus from './LiveStatus';
import StreamSettings from './StreamSettings';
import ThemeCustomizer from './ThemeCustomizer';
import SocialStatsManager from './SocialStatsManager';
import AnalyticsComponent from './Analytics';
import ConnectSettingsEditor from './ConnectSettingsEditor';
import SocialLinksEditor from './SocialLinksEditor';
import type { LinkAnalytics, ConnectSettings, SocialPlatform } from '../../types';

interface DashboardProps {
  isLive: boolean;
  onToggleLive: () => void;
  followerGoal: number;
  mainGame: string;
  onFollowerGoalChange: (goal: number) => void;
  onMainGameChange: (game: string) => void;
  primaryColor: string;
  secondaryColor: string;
  onPrimaryChange: (color: string) => void;
  onSecondaryChange: (color: string) => void;
  socialStats: Record<string, number>;
  onSocialStatsUpdate: (stats: Record<string, number>) => void;
  analytics: LinkAnalytics[];
  onAnalyticsReset: () => void;
  connectSettings: ConnectSettings;
  onConnectSettingsUpdate: (settings: ConnectSettings) => void;
  socialPlatforms: SocialPlatform[];
  onSocialPlatformsUpdate: (platforms: SocialPlatform[]) => void;
}

export default function Dashboard({
  isLive,
  onToggleLive,
  followerGoal,
  mainGame,
  onFollowerGoalChange,
  onMainGameChange,
  primaryColor,
  secondaryColor,
  onPrimaryChange,
  onSecondaryChange,
  socialStats,
  onSocialStatsUpdate,
  analytics,
  onAnalyticsReset,
  connectSettings,
  onConnectSettingsUpdate,
  socialPlatforms,
  onSocialPlatformsUpdate,
}: DashboardProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const tiktokUsername = socialPlatforms.find((p) => p.id === 'tiktok')?.username || '';

  const handleLogout = () => {
    logout();
    navigate('/control');
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-8">
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={18} />
            Back to Page
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-300 hover:bg-red-500/20 text-sm font-medium transition-all"
          >
            <LogOut size={16} />
            Logout
          </motion.button>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-white mb-6"
        >
          Admin Dashboard
        </motion.h1>

        <div className="space-y-4">
          <LiveStatus isLive={isLive} onToggle={onToggleLive} tiktokUsername={tiktokUsername} />
          <StreamSettings
            followerGoal={followerGoal}
            mainGame={mainGame}
            onFollowerGoalChange={onFollowerGoalChange}
            onMainGameChange={onMainGameChange}
          />
          <ThemeCustomizer
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPrimaryChange={onPrimaryChange}
            onSecondaryChange={onSecondaryChange}
          />
          <SocialStatsManager stats={socialStats} onUpdate={onSocialStatsUpdate} />
          <SocialLinksEditor platforms={socialPlatforms} onUpdate={onSocialPlatformsUpdate} />
          <ConnectSettingsEditor settings={connectSettings} onUpdate={onConnectSettingsUpdate} />
          <AnalyticsComponent analytics={analytics} onReset={onAnalyticsReset} />
        </div>
      </div>
    </div>
  );
}
