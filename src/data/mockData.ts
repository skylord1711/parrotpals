import type { SocialPlatform, ScheduleDay, ConnectSettings } from '../types';

export const socialPlatforms: SocialPlatform[] = [
  {
    id: 'tiktok',
    name: 'TikTok',
    username: '@captionthism8',
    description: 'Main platform of streaming!',
    icon: 'music',
    followerCount: 12500,
    url: 'https://tiktok.com/@captionthism8',
  },
  {
    id: 'discord',
    name: 'Discord',
    username: 'parrotpals',
    description: 'Join the community!',
    icon: 'message-circle',
    followerCount: 3200,
    url: 'https://discord.gg/parrotpals',
  },
  {
    id: 'twitch',
    name: 'Twitch',
    username: 'captionthism8',
    description: 'Not streaming on twitch currently!',
    icon: 'twitch',
    followerCount: 5800,
    url: 'https://twitch.tv/captionthism8',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    username: '@CaptionThisM8',
    description: 'Not streaming on youtube currently!',
    icon: 'youtube',
    followerCount: 8900,
    url: 'https://youtube.com/@CaptionThisM8',
  },
];

export const scheduleData: ScheduleDay[] = [
  { day: 'Monday', time: '7PM EST', isOff: false, emoji: '🎮' },
  { day: 'Tuesday', time: 'OFF', isOff: true, emoji: '😴' },
  { day: 'Wednesday', time: '2PM / 9PM EST', isOff: false, emoji: '🎮' },
  { day: 'Thursday', time: '7PM EST', isOff: false, emoji: '🎮' },
  { day: 'Friday', time: '7PM EST', isOff: false, emoji: '🎮' },
  { day: 'Saturday', time: '4PM EST', isOff: false, emoji: '🔥' },
  { day: 'Sunday', time: '4PM EST', isOff: false, emoji: '🎮' },
];

export const defaultThemeSettings = {
  primaryColor: '#a855f7',
  secondaryColor: '#22d3ee',
};

export const defaultSocialStats = {
  tiktok: 12500,
  discord: 3200,
  twitch: 5800,
  youtube: 8900,
};

export const defaultConnectSettings: ConnectSettings = {
  welcomeTitle: 'Connect With Joey',
  welcomeMessage: "Hey there! Welcome to the Parrot Pals community. I stream regularly, play Minecraft, and love hanging out with everyone. Whether you're here for the streams, the builds, or just to chill — you're always welcome!",
  button1Text: 'Send a Message',
  button1Icon: 'message-circle',
  button2Text: 'Join Community',
  button2Icon: 'users',
  realmSectionTitle: 'Minecraft Server Info',
  serverIP: 'parrotpals.net',
  bedrockPort: '25615',
  serverStatus: 'Online',
  supportMessage: 'Need support? Contact us on Discord',
};
