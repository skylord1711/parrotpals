import { useAuth } from '../context/AuthContext';
import LoginPage from '../components/Admin/LoginPage';
import Dashboard from '../components/Admin/Dashboard';
import type { LinkAnalytics, ConnectSettings, SocialPlatform } from '../types';
import AnimatedBackground from '../components/AnimatedBackground';

interface AdminPageProps {
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
  bannedUsers: string[];
  onBannedUsersUpdate: (banned: string[]) => void;
}

export default function AdminPage({
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
  bannedUsers,
  onBannedUsersUpdate,
}: AdminPageProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-dark text-text-primary relative overflow-x-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        {isAuthenticated ? (
          <Dashboard
            isLive={isLive}
            onToggleLive={onToggleLive}
            followerGoal={followerGoal}
            mainGame={mainGame}
            onFollowerGoalChange={onFollowerGoalChange}
            onMainGameChange={onMainGameChange}
            primaryColor={primaryColor}
            secondaryColor={secondaryColor}
            onPrimaryChange={onPrimaryChange}
            onSecondaryChange={onSecondaryChange}
            socialStats={socialStats}
            onSocialStatsUpdate={onSocialStatsUpdate}
            analytics={analytics}
            onAnalyticsReset={onAnalyticsReset}
            connectSettings={connectSettings}
            onConnectSettingsUpdate={onConnectSettingsUpdate}
            socialPlatforms={socialPlatforms}
            onSocialPlatformsUpdate={onSocialPlatformsUpdate}
            bannedUsers={bannedUsers}
            onBannedUsersUpdate={onBannedUsersUpdate}
          />
        ) : (
          <LoginPage />
        )}
      </div>
    </div>
  );
}
