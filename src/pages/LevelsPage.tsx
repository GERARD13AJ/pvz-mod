import React from 'react';
import { ModLevel } from '../types';
import { modLevels, modPlants, allyZombies } from '../data/allGameData';

interface LevelsPageProps {
  completedLevels: string[];
  unlockedPlantIds: string[];
  unlockedZombieIds: string[];
  onCompleteLevel: (levelId: string, unlockId: string, type: 'plant' | 'zombie' | 'mode') => void;
  onNavigate: (tab: string) => void;
}

const campaignColors: Record<string, string> = {
  plants: 'border-green-600 bg-green-900/20',
  allies: 'border-purple-600 bg-purple-900/20',
  final: 'border-yellow-600 bg-yellow-900/20',
};

const campaignLabels: Record<string, string> = {
  plants: '🌱 Campaña Plantas',
  allies: '🧟 Campaña Aliados',
  final: '⭐ Desafío Final',
};

const difficultyStars = (d: number) => '⭐'.repeat(d);

export const LevelsPage: React.FC<LevelsPageProps> = ({
  completedLevels,
  unlockedPlantIds,
  unlockedZombieIds,
  onCompleteLevel,
  onNavigate,
}) => {
  const [selectedLevel, setSelectedLevel] = React.useState<ModLevel | null>(null);

  const isUnlocked = (level: ModLevel) => {
    if (level.campaign === 'plants') return true; // Plant levels always visible
    if (level.campaign === 'allies') {
      // Need at least one plant mod unlocked
      return unlockedPlantIds.length >= 1;
    }
    if (level.campaign === 'final') {
      // Need all ally zombies
      return unlockedZombieIds.length >= allyZombies.length - 1;
    }
    return false;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">🗺️ Niveles del Mod</h2>
        <p className="text-gray-400 text-sm">
          {modLevels.length} niveles organizados en 3 campañas. Completa niveles para desbloquear
          plantas, zombis aliados y el desafío final.
        </p>
      </div>

      {/* Campaign Tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['plants', 'allies', 'final'] as const).map(campaign => (
          <div
            key={campaign}
            className={`px-4 py-2 rounded-lg text-sm font-bold ${campaignColors[campaign]} border`}
          >
            {campaignLabels[campaign]}
          </div>
        ))}
      </div>

      {/* Levels List */}
      <div className="space-y-3">
        {modLevels.map((level, index) => {
          const completed = completedLevels.includes(level.id);
          const unlocked = isUnlocked(level);
          const unlockName = level.unlockType === 'plant'
            ? modPlants.find(p => p.id === level.unlocks)?.name
            : level.unlockType === 'zombie'
            ? allyZombies.find(z => z.id === level.unlocks)?.name
            : level.unlocks;

          return (
            <div
              key={level.id}
              className={`rounded-xl border-2 p-5 transition-all ${
                completed
                  ? 'border-pvz-green bg-green-900/30'
                  : unlocked
                  ? 'border-gray-600 bg-gray-800/50 hover:border-gray-500 cursor-pointer'
                  : 'border-gray-800 bg-gray-900/30 opacity-60'
              }`}
              onClick={() => unlocked && setSelectedLevel(level)}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shrink-0 ${
                  completed ? 'bg-pvz-green text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {completed ? '✅' : `${index + 1}`}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-white font-bold">{level.name}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-400">
                      {campaignLabels[level.campaign]}
                    </span>
                    {completed && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-800 text-green-300">
                        Completado
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mt-1">{level.description}</p>

                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 flex-wrap">
                    <span>Dificultad: {difficultyStars(level.difficulty)}</span>
                    <span>🌊 {level.waves} oleadas</span>
                    <span>🎁 Desbloquea: <span className="text-pvz-sun">{unlockName}</span></span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Level Detail Modal */}
      {selectedLevel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setSelectedLevel(null)}>
          <div
            className="bg-gray-800 rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto border border-gray-700"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-xl font-bold text-white">{selectedLevel.name}</h3>
              <button
                onClick={() => setSelectedLevel(null)}
                className="text-gray-400 hover:text-white text-xl"
              >
                ✕
              </button>
            </div>

            <p className="text-gray-300 text-sm mb-4">{selectedLevel.description}</p>

            <div className="space-y-3 text-sm">
              <div>
                <h4 className="text-yellow-400 font-bold mb-1">🌊 Oleadas: {selectedLevel.waves}</h4>
                <p className="text-gray-400 text-xs">Preview: {selectedLevel.previewWave}</p>
              </div>

              <div>
                <h4 className="text-green-400 font-bold mb-1">🌱 Plantas Disponibles</h4>
                <div className="flex flex-wrap gap-1">
                  {selectedLevel.availablePlants.map(pid => {
                    const plant = modPlants.find(p => p.id === pid);
                    if (plant) return <span key={pid} className="text-lg" title={plant.name}>{plant.emoji}</span>;
                    return <span key={pid} className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{pid}</span>;
                  })}
                </div>
              </div>

              {selectedLevel.availableAllies.length > 0 && (
                <div>
                  <h4 className="text-purple-400 font-bold mb-1">🧟 Aliados Disponibles</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedLevel.availableAllies.map(zid => {
                      const zombie = allyZombies.find(z => z.id === zid);
                      if (zombie) return <span key={zid} className="text-lg" title={zombie.name}>{zombie.emoji}</span>;
                      return <span key={zid} className="text-xs bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded">{zid}</span>;
                    })}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-pvz-sun font-bold mb-1">🎁 Recompensa</h4>
                <p className="text-gray-300">
                  Desbloquea: <strong className="text-white">{
                    selectedLevel.unlockType === 'plant'
                      ? modPlants.find(p => p.id === selectedLevel.unlocks)?.name
                      : selectedLevel.unlockType === 'zombie'
                      ? allyZombies.find(z => z.id === selectedLevel.unlocks)?.name
                      : selectedLevel.unlocks
                  }</strong>
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => {
                  onCompleteLevel(selectedLevel.id, selectedLevel.unlocks, selectedLevel.unlockType);
                  setSelectedLevel(null);
                }}
                className="flex-1 bg-pvz-green hover:bg-pvz-green-light text-white font-bold py-3 px-6 rounded-xl text-sm transition-all hover:scale-105"
              >
                ✅ Simular Completado
              </button>
              <button
                onClick={() => {
                  setSelectedLevel(null);
                  onNavigate('battle');
                }}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all"
              >
                ⚔️ Jugar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
