import React from 'react';
import { ModPlant, AllyZombie } from '../types';

// ============================================
// PLANT CARD
// ============================================
interface PlantCardProps {
  plant: ModPlant;
  unlocked: boolean;
  onClick?: () => void;
  compact?: boolean;
}

export const ModPlantCard: React.FC<PlantCardProps> = ({ plant, unlocked, onClick, compact }) => {
  return (
    <div
      className={`card-hover relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${
        unlocked
          ? 'border-pvz-green bg-gradient-to-br from-green-900/40 to-green-950/60 cursor-pointer'
          : 'border-gray-700 bg-gray-900/60 cursor-not-allowed'
      } ${compact ? 'p-3' : 'p-5'}`}
      onClick={unlocked ? onClick : undefined}
    >
      {!unlocked && (
        <div className="absolute inset-0 locked-overlay flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-gray-400 mt-1">Desbloquea en nivel</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
          style={{ background: `${plant.color}33`, border: `2px solid ${plant.color}66` }}
        >
          {plant.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'text-base'}`}>
            {plant.name}
          </h3>
          <p className={`text-gray-400 mt-1 ${compact ? 'text-xs' : 'text-sm'} line-clamp-2`}>
            {plant.description}
          </p>
        </div>
      </div>

      {unlocked && !compact && (
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
          <div className="bg-yellow-900/30 rounded-lg p-2 text-center">
            <span className="text-yellow-400 font-bold">☀️</span>
            <span className="text-yellow-300 ml-1">{plant.sunCost}</span>
          </div>
          <div className="bg-red-900/30 rounded-lg p-2 text-center">
            <span className="text-red-400 font-bold">❤️</span>
            <span className="text-red-300 ml-1">{plant.toughness} HP</span>
          </div>
          <div className="bg-orange-900/30 rounded-lg p-2 text-center">
            <span className="text-orange-400 font-bold">⚔️</span>
            <span className="text-orange-300 ml-1">{plant.damage} DMG</span>
          </div>
          <div className="bg-blue-900/30 rounded-lg p-2 text-center">
            <span className="text-blue-400 font-bold">🔄</span>
            <span className="text-blue-300 ml-1 capitalize">{plant.recharge}</span>
          </div>
        </div>
      )}

      {unlocked && !compact && (
        <div className="mt-3 bg-pvz-green-dark/40 rounded-lg p-3">
          <p className="text-xs text-green-300 font-semibold mb-1">🎯 Habilidad Especial:</p>
          <p className="text-xs text-gray-300 leading-relaxed">{plant.specialAbility}</p>
        </div>
      )}

      {unlocked && !compact && (
        <details className="mt-2">
          <summary className="text-xs text-pvz-green-light cursor-pointer hover:text-pvz-green-pale">
            📋 Datos Configurables
          </summary>
          <div className="mt-2 bg-black/30 rounded-lg p-3">
            <pre className="text-xs text-gray-400 overflow-x-auto">
              {JSON.stringify(plant.configurable, null, 2)}
            </pre>
          </div>
        </details>
      )}

      {!unlocked && (
        <div className="mt-3 text-center">
          <span className="inline-block bg-yellow-900/50 text-yellow-300 text-xs px-3 py-1 rounded-full">
            🔒 Nivel: {plant.unlockLevel}
          </span>
        </div>
      )}
    </div>
  );
};

// ============================================
// ZOMBIE CARD
// ============================================
interface ZombieCardProps {
  zombie: AllyZombie;
  unlocked: boolean;
  compact?: boolean;
}

export const AllyZombieCard: React.FC<ZombieCardProps> = ({ zombie, unlocked, compact }) => {
  return (
    <div
      className={`card-hover relative rounded-xl border-2 overflow-hidden transition-all duration-300 ${
        unlocked
          ? 'border-pvz-zombie-green bg-gradient-to-br from-green-900/30 to-purple-950/40'
          : 'border-gray-700 bg-gray-900/60'
      } ${compact ? 'p-3' : 'p-5'}`}
    >
      {!unlocked && (
        <div className="absolute inset-0 locked-overlay flex items-center justify-center z-10 rounded-xl">
          <div className="text-center">
            <span className="text-3xl">🔒</span>
            <p className="text-xs text-gray-400 mt-1">Desbloquea en nivel</p>
          </div>
        </div>
      )}

      <div className="flex items-start gap-3">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
          style={{ background: `${zombie.color}33`, border: `2px solid ${zombie.color}66` }}
        >
          {zombie.emoji}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className={`font-bold text-white ${compact ? 'text-sm' : 'text-base'}`}>
            {zombie.name}
          </h3>
          <p className={`text-gray-400 mt-1 ${compact ? 'text-xs' : 'text-sm'} line-clamp-2`}>
            {zombie.description}
          </p>
        </div>
      </div>

      {unlocked && !compact && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
          <div className="bg-yellow-900/30 rounded-lg p-2 text-center">
            <span className="text-yellow-400">☀️</span>
            <span className="text-yellow-300 ml-1">{zombie.sunCost}</span>
          </div>
          <div className="bg-red-900/30 rounded-lg p-2 text-center">
            <span className="text-red-400">❤️</span>
            <span className="text-red-300 ml-1">{zombie.hp} HP</span>
          </div>
          <div className="bg-orange-900/30 rounded-lg p-2 text-center">
            <span className="text-orange-400">⚔️</span>
            <span className="text-orange-300 ml-1">{zombie.damage}</span>
          </div>
          <div className="bg-purple-900/30 rounded-lg p-2 text-center">
            <span className="text-purple-400">🏃</span>
            <span className="text-purple-300 ml-1">{zombie.movementSpeed}</span>
          </div>
          <div className="bg-blue-900/30 rounded-lg p-2 text-center">
            <span className="text-blue-400">⚡</span>
            <span className="text-blue-300 ml-1">{zombie.attackSpeed}/s</span>
          </div>
          <div className="bg-green-900/30 rounded-lg p-2 text-center">
            <span className="text-green-400">🔄</span>
            <span className="text-green-300 ml-1 capitalize">{zombie.recharge}</span>
          </div>
        </div>
      )}

      {unlocked && !compact && (
        <div className="mt-3 bg-pvz-zombie-dark/30 rounded-lg p-3">
          <p className="text-xs text-green-300 font-semibold mb-1">⭐ Habilidad Especial:</p>
          <p className="text-xs text-gray-300 leading-relaxed">{zombie.specialAbility}</p>
        </div>
      )}
    </div>
  );
};

// ============================================
// BASE PLANT CARD
// ============================================
interface BasePlantCardProps {
  plant: {
    id: string;
    name: string;
    nameEn: string;
    description: string;
    sunCost: number;
    recharge: string;
    toughness: number;
    behavior: string;
    emoji: string;
    color: string;
  };
}

export const BasePlantCard: React.FC<BasePlantCardProps> = ({ plant }) => {
  return (
    <div className="card-hover rounded-xl border border-gray-700 bg-gradient-to-br from-green-900/20 to-green-950/30 p-4">
      <div className="flex items-start gap-3">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
          style={{ background: `${plant.color}33`, border: `2px solid ${plant.color}66` }}
        >
          {plant.emoji}
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-white text-sm">{plant.name}</h3>
          <p className="text-xs text-gray-500">{plant.nameEn}</p>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2">{plant.description}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-3 text-xs">
        <span className="text-yellow-400">☀️ {plant.sunCost}</span>
        <span className="text-red-400">❤️ {plant.toughness}</span>
        <span className="text-blue-400 capitalize">🔄 {plant.recharge}</span>
      </div>
    </div>
  );
};
