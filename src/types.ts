export interface SocialPlatform {
  id: string;
  name: string;
  username: string;
  description: string;
  icon: string;
  followerCount: number;
  url: string;
  isLive?: boolean;
}

export interface ScheduleDay {
  day: string;
  time: string;
  isOff: boolean;
  emoji: string;
}

export interface LinkAnalytics {
  platform: string;
  clicks: number;
}

export interface ThemeSettings {
  primaryColor: string;
  secondaryColor: string;
}

export interface StreamStatus {
  isLive: boolean;
}

export interface ConnectSettings {
  welcomeTitle: string;
  welcomeMessage: string;
  button1Text: string;
  button1Icon: string;
  button2Text: string;
  button2Icon: string;
  realmSectionTitle: string;
  serverIP: string;
  bedrockPort: string;
  serverStatus: string;
  supportMessage: string;
}

export type TabId = 'links' | 'schedule' | 'connect' | 'apply';
