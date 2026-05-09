import { useState, useCallback } from 'react';
import { ProgressData, DEFAULT_PROGRESS, ModPlant, AllyZombie } from '../types';

const STORAGE_KEY = 'pvz_mod_progress';

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_PROGRESS, ...parsed, lastVisit: Date.now() };
      }
    } catch (e) {
      console.error('[ModProgress] Error loading save data:', e);
    }
    return { ...DEFAULT_PROGRESS };
  });

  const save = useCallback((data: ProgressData) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      console.log('[ModProgress] Progress saved:', {
        completedLevels: data.completedLevels.length,
        unlockedPlants: data.unlockedPlants.length,
        unlockedZombies: data.unlockedZombies.length,
      });
    } catch (e) {
      console.error('[ModProgress] Error saving:', e);
    }
  }, []);

  const completeLevel = useCallback((levelId: string, unlockId: string, unlockType: 'plant' | 'zombie' | 'mode') => {
    setProgress(prev => {
      if (prev.completedLevels.includes(levelId)) return prev;
      const newData: ProgressData = {
        ...prev,
        completedLevels: [...prev.completedLevels, levelId],
        gamesPlayed: prev.gamesPlayed + 1,
      };

      if (unlockType === 'plant' && !newData.unlockedPlants.includes(unlockId)) {
        newData.unlockedPlants = [...newData.unlockedPlants, unlockId];
        console.log(`[ModProgress] 🌱 Planta desbloqueada: ${unlockId}`);
      } else if (unlockType === 'zombie' && !newData.unlockedZombies.includes(unlockId)) {
        newData.unlockedZombies = [...newData.unlockedZombies, unlockId];
        console.log(`[ModProgress] 🧟 Zombi aliado desbloqueado: ${unlockId}`);
      } else if (unlockType === 'mode') {
        console.log(`[ModProgress] 🎮 Modo desbloqueado: ${unlockId}`);
      }

      save(newData);
      return newData;
    });
  }, [save]);

  const resetProgress = useCallback(() => {
    const fresh = { ...DEFAULT_PROGRESS };
    setProgress(fresh);
    save(fresh);
    console.log('[ModProgress] Progress reset to defaults.');
  }, [save]);

  const isLevelCompleted = useCallback((levelId: string) => {
    return progress.completedLevels.includes(levelId);
  }, [progress.completedLevels]);

  const isPlantUnlocked = useCallback((plantId: string) => {
    return progress.unlockedPlants.includes(plantId);
  }, [progress.unlockedPlants]);

  const isZombieUnlocked = useCallback((zombieId: string) => {
    return progress.unlockedZombies.includes(zombieId);
  }, [progress.unlockedZombies]);

  const completionPercentage = useCallback(() => {
    const totalItems = 3 + allyZombies.length + modLevels.length;
    const completedItems = progress.completedLevels.length;
    return Math.round((completedItems / totalItems) * 100);
  }, [progress.completedLevels]);

  return {
    progress,
    save,
    completeLevel,
    resetProgress,
    isLevelCompleted,
    isPlantUnlocked,
    isZombieUnlocked,
    completionPercentage,
  };
}

import { modPlants, allyZombies, modLevels } from '../data/allGameData';

export function getUnlockedModPlants(unlockedPlantIds: string[]): ModPlant[] {
  return modPlants.filter(p => unlockedPlantIds.includes(p.id));
}

export function getUnlockedAllyZombies(unlockedZombieIds: string[]): AllyZombie[] {
  return allyZombies.filter(z => unlockedZombieIds.includes(z.id));
}
