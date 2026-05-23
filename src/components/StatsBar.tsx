import { motion } from 'framer-motion';
import { Users, Gamepad2 } from 'lucide-react';

interface StatsBarProps {
  followerGoal: number;
  mainGame: string;
  primaryColor: string;
  secondaryColor: string;
}

export default function StatsBar({ followerGoal, mainGame, primaryColor, secondaryColor }: StatsBarProps) {
  const stats = [
    { icon: Users, label: 'Follower Goal', value: `${followerGoal.toLocaleString()}`, color: primaryColor },
    { icon: Gamepad2, label: 'Main Game', value: mainGame, color: secondaryColor },
  ];

  return (
    <div className="flex gap-2 sm:gap-4 px-4 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          whileHover={{ scale: 1.03, y: -2 }}
          className="flex-1 glass rounded-2xl p-4 gradient-border cursor-default group"
          style={{ '--hover-color': stat.color } as React.CSSProperties}
        >
          <div className="flex items-center gap-3 mb-2">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${stat.color}15` }}
            >
              <stat.icon size={18} style={{ color: stat.color }} />
            </div>
            <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">{stat.label}</span>
          </div>
          <p className="text-lg font-bold text-white">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
