import { motion } from 'framer-motion';
import { Target, Gamepad2 } from 'lucide-react';

interface StreamSettingsProps {
  followerGoal: number;
  mainGame: string;
  onFollowerGoalChange: (goal: number) => void;
  onMainGameChange: (game: string) => void;
}

export default function StreamSettings({
  followerGoal,
  mainGame,
  onFollowerGoalChange,
  onMainGameChange,
}: StreamSettingsProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="glass rounded-2xl p-5 gradient-border"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-amber-500/10">
          <Target size={18} className="text-amber-400" />
        </div>
        <h3 className="font-semibold text-white">Stream Settings</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">Follower Goal</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={followerGoal}
              onChange={(e) => onFollowerGoalChange(parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
              min={0}
            />
            <span className="text-xs text-gray-400">K</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-300 mb-1.5">Main Game</label>
          <div className="flex items-center gap-3">
            <Gamepad2 size={16} className="text-gray-400" />
            <input
              type="text"
              value={mainGame}
              onChange={(e) => onMainGameChange(e.target.value)}
              className="flex-1 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-amber-500/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
