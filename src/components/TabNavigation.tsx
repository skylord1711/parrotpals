import { motion } from 'framer-motion';
import type { TabId } from '../types';

interface TabNavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  primaryColor: string;
  secondaryColor: string;
}

const tabs: { id: TabId; label: string }[] = [
  { id: 'links', label: 'Links' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'connect', label: 'Connect' },
  { id: 'apply', label: 'Apply' },
];

export default function TabNavigation({ activeTab, onTabChange, primaryColor, secondaryColor }: TabNavigationProps) {
  return (
    <div className="flex gap-1 px-4 mb-6">
      <div className="glass rounded-2xl p-1.5 w-full flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="relative flex-1 py-2.5 text-sm font-medium transition-colors rounded-xl"
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}25, ${secondaryColor}25)`,
                  border: `1px solid ${primaryColor}30`,
                }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              />
            )}
            <span className={`relative z-10 ${activeTab === tab.id ? 'text-white' : 'text-gray-400'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
