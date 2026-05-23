import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import type { ScheduleDay } from '../types';

interface ScheduleTabProps {
  schedule: ScheduleDay[];
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function ScheduleTab({ schedule }: ScheduleTabProps) {
  const todayName = dayNames[new Date().getDay()];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="schedule"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
        className="px-4 pb-8"
      >
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-5 mb-4 gradient-border"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Calendar size={18} className="text-purple-400" />
            </div>
            <h3 className="font-semibold text-white">Weekly Stream Schedule</h3>
          </div>

          <div className="space-y-2">
            {schedule.map((day, index) => {
              const isToday = day.day === todayName;
              return (
                <motion.div
                  key={day.day}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className={`flex items-center justify-between p-3 rounded-xl transition-all ${
                    isToday
                      ? 'bg-purple-500/10 border border-purple-500/20'
                      : day.isOff
                        ? 'bg-white/5 opacity-60'
                        : 'bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{day.emoji}</span>
                    <div>
                      <p className={`text-sm font-medium ${isToday ? 'text-purple-300' : 'text-white'}`}>
                        {day.day}
                        {isToday && <span className="ml-2 text-xs text-purple-400">• Today</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-gray-500" />
                    <span className={`text-sm ${day.isOff ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                      {day.time}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-500">All times in Eastern Standard Time (EST)</p>
      </motion.div>
    </AnimatePresence>
  );
}
