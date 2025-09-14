'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Star, Award, Target, Zap, Users, Code, Coffee } from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const achievements: Achievement[] = [
  {
    id: 'first-visit',
    title: 'Welcome Visitor',
    description: 'Visited the portfolio for the first time',
    icon: Star,
    unlocked: false,
    rarity: 'common'
  },
  {
    id: 'code-explorer',
    title: 'Code Explorer',
    description: 'Viewed 3 different code files',
    icon: Code,
    unlocked: false,
    progress: 0,
    maxProgress: 3,
    rarity: 'common'
  },
  {
    id: 'project-enthusiast',
    title: 'Project Enthusiast',
    description: 'Explored all featured projects',
    icon: Trophy,
    unlocked: false,
    progress: 0,
    maxProgress: 4,
    rarity: 'rare'
  },
  {
    id: 'ai-conversationalist',
    title: 'AI Conversationalist',
    description: 'Had a conversation with the AI assistant',
    icon: Zap,
    unlocked: false,
    rarity: 'rare'
  },
  {
    id: 'playground-master',
    title: 'Playground Master',
    description: 'Ran code in the playground',
    icon: Target,
    unlocked: false,
    rarity: 'epic'
  },
  {
    id: 'coffee-lover',
    title: 'Coffee Lover',
    description: 'Spent more than 5 minutes on the site',
    icon: Coffee,
    unlocked: false,
    rarity: 'legendary'
  }
];

export function AchievementSystem() {
  const [userAchievements, setUserAchievements] = useState<Achievement[]>(achievements);
  const [newAchievement, setNewAchievement] = useState<Achievement | null>(null);
  const [visitTime, setVisitTime] = useState(0);

  useEffect(() => {
    // Track visit time
    const timer = setInterval(() => {
      setVisitTime(prev => prev + 1);
    }, 1000);

    // Unlock first visit achievement
    setTimeout(() => {
      unlockAchievement('first-visit');
    }, 2000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Coffee lover achievement (5 minutes)
    if (visitTime >= 300) {
      unlockAchievement('coffee-lover');
    }
  }, [visitTime]);

  const unlockAchievement = (id: string) => {
    setUserAchievements(prev => {
      const updated = prev.map(achievement => {
        if (achievement.id === id && !achievement.unlocked) {
          const unlockedAchievement = { ...achievement, unlocked: true };
          setNewAchievement(unlockedAchievement);
          
          // Hide notification after 5 seconds
          setTimeout(() => setNewAchievement(null), 5000);
          
          return unlockedAchievement;
        }
        return achievement;
      });
      return updated;
    });
  };

  const updateProgress = (id: string, increment: number = 1) => {
    setUserAchievements(prev => {
      return prev.map(achievement => {
        if (achievement.id === id && !achievement.unlocked && achievement.maxProgress) {
          const newProgress = Math.min((achievement.progress || 0) + increment, achievement.maxProgress);
          const updated = { ...achievement, progress: newProgress };
          
          if (newProgress >= achievement.maxProgress) {
            updated.unlocked = true;
            setNewAchievement(updated);
            setTimeout(() => setNewAchievement(null), 5000);
          }
          
          return updated;
        }
        return achievement;
      });
    });
  };

  // Expose functions globally for other components to use
  useEffect(() => {
    (window as any).achievementSystem = {
      unlock: unlockAchievement,
      updateProgress
    };
  }, []);

  const getRarityColor = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-yellow-400 border-yellow-400';
    }
  };

  const getRarityBg = (rarity: Achievement['rarity']) => {
    switch (rarity) {
      case 'common': return 'bg-gray-900/90';
      case 'rare': return 'bg-blue-900/90';
      case 'epic': return 'bg-purple-900/90';
      case 'legendary': return 'bg-yellow-900/90';
    }
  };

  return (
    <>
      {/* Achievement Notification */}
      <AnimatePresence>
        {newAchievement && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            className={`fixed top-20 right-6 z-50 p-4 rounded-lg border-2 ${getRarityColor(newAchievement.rarity)} ${getRarityBg(newAchievement.rarity)} backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${getRarityBg(newAchievement.rarity)}`}>
                <newAchievement.icon size={24} className={getRarityColor(newAchievement.rarity).split(' ')[0]} />
              </div>
              <div>
                <h4 className="font-bold text-white">Achievement Unlocked!</h4>
                <p className="text-sm text-gray-300">{newAchievement.title}</p>
                <p className="text-xs text-gray-400">{newAchievement.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Achievement Progress Indicator */}
      <div className="fixed bottom-20 left-6 z-40">
        <div className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
          <div className="flex items-center space-x-2 mb-2">
            <Trophy size={16} className="text-yellow-400" />
            <span className="text-sm font-semibold text-white">
              {userAchievements.filter(a => a.unlocked).length}/{userAchievements.length}
            </span>
          </div>
          
          <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ 
                width: `${(userAchievements.filter(a => a.unlocked).length / userAchievements.length) * 100}%` 
              }}
              className="h-full bg-gradient-to-r from-blue-500 to-yellow-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </>
  );
}