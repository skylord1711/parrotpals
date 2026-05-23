import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileHeader from '../components/ProfileHeader';
import StatsBar from '../components/StatsBar';
import TabNavigation from '../components/TabNavigation';
import LinksTab from '../components/LinksTab';
import ScheduleTab from '../components/ScheduleTab';
import ConnectTab from '../components/ConnectTab';
import ApplyTab from '../components/ApplyTab';
import { scheduleData } from '../data/mockData';
import type { TabId, ConnectSettings, SocialPlatform } from '../types';

interface HomePageProps {
  isLive: boolean;
  followerGoal: number;
  mainGame: string;
  primaryColor: string;
  secondaryColor: string;
  socialStats: Record<string, number>;
  socialPlatforms: SocialPlatform[];
  connectSettings: ConnectSettings;
  bannedUsers: string[];
  onAnalyticsClick: (platformId: string) => void;
}

export default function HomePage({
  isLive,
  followerGoal,
  mainGame,
  primaryColor,
  secondaryColor,
  socialStats,
  socialPlatforms,
  connectSettings,
  bannedUsers,
  onAnalyticsClick,
}: HomePageProps) {
  const [activeTab, setActiveTab] = useState<TabId>('links');

  const platforms = socialPlatforms.map((p) => ({
    ...p,
    followerCount: socialStats[p.id] ?? p.followerCount,
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <ProfileHeader isLive={isLive} />
      <StatsBar
        followerGoal={followerGoal}
        mainGame={mainGame}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <TabNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
      />
      <AnimatePresence mode="wait">
        {activeTab === 'links' && (
          <LinksTab
            key="links"
            platforms={platforms}
            onAnalyticsClick={onAnalyticsClick}
          />
        )}
        {activeTab === 'schedule' && <ScheduleTab key="schedule" schedule={scheduleData} />}
        {activeTab === 'connect' && <ConnectTab key="connect" settings={connectSettings} />}
        {activeTab === 'apply' && <ApplyTab key="apply" bannedUsers={bannedUsers} />}
      </AnimatePresence>
    </motion.div>
  );
}
