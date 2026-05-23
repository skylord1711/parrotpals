import { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoadingScreen from './components/LoadingScreen';
import { ToastProvider } from './components/Toast';
import { AuthProvider } from './context/AuthContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { defaultSocialStats, defaultThemeSettings, defaultConnectSettings, socialPlatforms as defaultPlatforms } from './data/mockData';
import type { LinkAnalytics, ConnectSettings, SocialPlatform } from './types';

const queryClient = new QueryClient();

function AppContent() {
  const [isLive, setIsLive] = useLocalStorage('parrot-live', false);
  const [followerGoal, setFollowerGoal] = useLocalStorage('parrot-follower-goal', 15000);
  const [mainGame, setMainGame] = useLocalStorage('parrot-main-game', 'Minecraft');
  const [primaryColor, setPrimaryColor] = useLocalStorage('parrot-primary', defaultThemeSettings.primaryColor);
  const [secondaryColor, setSecondaryColor] = useLocalStorage('parrot-secondary', defaultThemeSettings.secondaryColor);
  const [socialStats, setSocialStats] = useLocalStorage('parrot-social-stats', defaultSocialStats);
  const [analytics, setAnalytics] = useLocalStorage<LinkAnalytics[]>('parrot-analytics', [
    { platform: 'tiktok', clicks: 0 },
    { platform: 'discord', clicks: 0 },
    { platform: 'twitch', clicks: 0 },
    { platform: 'youtube', clicks: 0 },
  ]);
  const [connectSettings, setConnectSettings] = useLocalStorage<ConnectSettings>('parrot-connect', defaultConnectSettings);
  const migratedConnectSettings = { ...defaultConnectSettings, ...connectSettings };
  useEffect(() => {
    if (JSON.stringify(migratedConnectSettings) !== JSON.stringify(connectSettings)) {
      setConnectSettings(migratedConnectSettings);
    }
  }, []);
  const [socialPlatforms, setSocialPlatforms] = useLocalStorage<SocialPlatform[]>('parrot-social-platforms', defaultPlatforms);
  useEffect(() => {
    localStorage.removeItem('parrot-social-platforms');
    setSocialPlatforms(defaultPlatforms);
  }, []);

  const handleToggleLive = useCallback(() => {
    setIsLive((prev) => !prev);
  }, [setIsLive]);

  const handlePrimaryChange = useCallback(
    (color: string) => setPrimaryColor(color),
    [setPrimaryColor],
  );

  const handleSecondaryChange = useCallback(
    (color: string) => setSecondaryColor(color),
    [setSecondaryColor],
  );

  const handleSocialStatsUpdate = useCallback(
    (stats: Record<string, number>) => setSocialStats(stats as typeof defaultSocialStats),
    [setSocialStats],
  );

  const handleAnalyticsClick = useCallback(
    (platformId: string) => {
      setAnalytics((prev) =>
        prev.map((a) =>
          a.platform === platformId ? { ...a, clicks: a.clicks + 1 } : a,
        ),
      );
    },
    [setAnalytics],
  );

  const handleAnalyticsReset = useCallback(() => {
    setAnalytics([
      { platform: 'tiktok', clicks: 0 },
      { platform: 'discord', clicks: 0 },
      { platform: 'twitch', clicks: 0 },
      { platform: 'youtube', clicks: 0 },
    ]);
  }, [setAnalytics]);

  const handleConnectSettingsUpdate = useCallback(
    (settings: ConnectSettings) => setConnectSettings(settings),
    [setConnectSettings],
  );

  const handleSocialPlatformsUpdate = useCallback(
    (platforms: SocialPlatform[]) => setSocialPlatforms(platforms),
    [setSocialPlatforms],
  );

  const handleFollowerGoalChange = useCallback(
    (goal: number) => setFollowerGoal(goal),
    [setFollowerGoal],
  );

  const handleMainGameChange = useCallback(
    (game: string) => setMainGame(game),
    [setMainGame],
  );

  return (
    <>
      <LoadingScreen />
      <Routes>
        <Route element={<Layout />}>
          <Route
            index
            element={
              <HomePage
                isLive={isLive}
                followerGoal={followerGoal}
                mainGame={mainGame}
                primaryColor={primaryColor}
                secondaryColor={secondaryColor}
                socialStats={socialStats}
                socialPlatforms={socialPlatforms}
                connectSettings={connectSettings}
                onAnalyticsClick={handleAnalyticsClick}
              />
            }
          />
        </Route>
        <Route
          path="control"
          element={
            <AdminPage
              isLive={isLive}
              onToggleLive={handleToggleLive}
              followerGoal={followerGoal}
              mainGame={mainGame}
              onFollowerGoalChange={handleFollowerGoalChange}
              onMainGameChange={handleMainGameChange}
              primaryColor={primaryColor}
              secondaryColor={secondaryColor}
              onPrimaryChange={handlePrimaryChange}
              onSecondaryChange={handleSecondaryChange}
              socialStats={socialStats}
              onSocialStatsUpdate={handleSocialStatsUpdate}
              analytics={analytics}
              onAnalyticsReset={handleAnalyticsReset}
              connectSettings={connectSettings}
              onConnectSettingsUpdate={handleConnectSettingsUpdate}
              socialPlatforms={socialPlatforms}
              onSocialPlatformsUpdate={handleSocialPlatformsUpdate}
            />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ToastProvider>
            <AppContent />
          </ToastProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
