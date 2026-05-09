import React from 'react';
import { ProgressData } from '../types';

interface HomePageProps {
  progress: ProgressData;
  onNavigate: (tab: string) => void;
  completionPercent: number;
  unlockedPlantCount: number;
  unlockedZombieCount: number;
  totalPlants: number;
  totalZombies: number;
  totalLevels: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  progress,
  onNavigate,
  completionPercent,
  unlockedPlantCount,
  unlockedZombieCount,
  totalPlants,
  totalZombies,
  totalLevels,
}) => {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative bg-gradient-to-br from-pvz-green-dark via-green-900 to-pvz-brown-dark rounded-3xl p-8 md:p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 text-9xl animate-float">🌻</div>
          <div className="absolute bottom-5 left-10 text-7xl animate-float" style={{ animationDelay: '1s' }}>🧟</div>
          <div className="absolute top-20 left-1/2 text-6xl animate-float" style={{ animationDelay: '2s' }}>🥜</div>
        </div>
        <div className="relative z-10">
          <div className="inline-block bg-yellow-600/30 text-yellow-300 text-xs px-3 py-1 rounded-full mb-4">
            MOD FRAMEWORK v1.0.0
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            🌻 Plants vs. Zombies 1
            <br />
            <span className="text-pvz-sun">Bowling Nuts & Ally Zombies</span>
          </h1>
          <p className="text-green-200 text-base md:text-lg max-w-2xl mb-6">
            Un mod completo que añade plantas de bolera rodantes, zombis aliados jugables,
            niveles de desbloqueo y un sistema de progresión. Compatible con PvZ 1 original de PC.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('levels')}
              className="bg-pvz-green hover:bg-pvz-green-light text-white font-bold py-3 px-6 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
            >
              🗺️ Ver Niveles
            </button>
            <button
              onClick={() => onNavigate('battle')}
              className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
            >
              ⚔️ Simulador
            </button>
            <button
              onClick={() => onNavigate('architecture')}
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
            >
              📐 Arquitectura
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Progreso', value: `${completionPercent}%`, icon: '📊', color: 'from-blue-900/50 to-blue-950/50', border: 'border-blue-700' },
          { label: 'Plantas Mods', value: `${unlockedPlantCount}/${totalPlants}`, icon: '🥜', color: 'from-green-900/50 to-green-950/50', border: 'border-green-700' },
          { label: 'Zombis Aliados', value: `${unlockedZombieCount}/${totalZombies}`, icon: '🧟', color: 'from-purple-900/50 to-purple-950/50', border: 'border-purple-700' },
          { label: 'Niveles', value: `${progress.completedLevels.length}/${totalLevels}`, icon: '🗺️', color: 'from-yellow-900/50 to-yellow-950/50', border: 'border-yellow-700' },
        ].map((stat, i) => (
          <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 border ${stat.border}`}>
            <div className="text-2xl mb-2">{stat.icon}</div>
            <div className="text-white font-bold text-xl">{stat.value}</div>
            <div className="text-gray-400 text-xs">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          onClick={() => onNavigate('plants')}
          className="card-hover bg-gradient-to-br from-green-900/30 to-green-950/50 rounded-xl p-6 border border-green-800 cursor-pointer"
        >
          <div className="text-4xl mb-3">🌱</div>
          <h3 className="text-white font-bold text-lg mb-2">Plantas Base</h3>
          <p className="text-gray-400 text-sm">Las {totalPlants + 46} plantas originales de PvZ 1 con sus estadísticas y comportamientos.</p>
        </div>
        <div
          onClick={() => onNavigate('mod-plants')}
          className="card-hover bg-gradient-to-br from-red-900/30 to-red-950/50 rounded-xl p-6 border border-red-800 cursor-pointer"
        >
          <div className="text-4xl mb-3">🥜</div>
          <h3 className="text-white font-bold text-lg mb-2">Plantas del Mod</h3>
          <p className="text-gray-400 text-sm">Nuez Rodadora, Nuez Roja Explosiva y Nuez Gigante. Desbloquéalas jugando niveles.</p>
        </div>
        <div
          onClick={() => onNavigate('allies')}
          className="card-hover bg-gradient-to-br from-purple-900/30 to-purple-950/50 rounded-xl p-6 border border-purple-800 cursor-pointer"
        >
          <div className="text-4xl mb-3">🧟</div>
          <h3 className="text-white font-bold text-lg mb-2">Zombis Aliados</h3>
          <p className="text-gray-400 text-sm">Desbloquea Conehead, Buckethead, Pértiga, Globo, Futbolista y más como unidades aliadas.</p>
        </div>
      </div>

      {/* Feature highlights */}
      <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-white font-bold text-lg mb-4">📋 Características del Mod</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            '🥜 3 nuevas plantas tipo bolera rodante',
            '🧟 8 zombis aliados jugables',
            '🗺️ 10 niveles de campaña con desbloqueos',
            '💾 Sistema de guardado de progreso (localStorage)',
            '⚙️ Archivos de configuración JSON modulares',
            '📐 Arquitectura extensible y documentada',
            '🎨 Placeholders para sprites (no redistribuye copyright)',
            '📦 Instrucciones completas de instalación',
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-pvz-green mt-0.5">✅</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture note */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <h4 className="text-yellow-300 font-bold text-sm mb-1">Nota Importante</h4>
            <p className="text-yellow-200/70 text-xs leading-relaxed">
              Esta aplicación web documenta y simula el mod. Para instalarlo en PvZ 1 real, se necesita
              el framework de modding <strong>RePvZ</strong> o un patcher de memoria. Las instrucciones
              completas están en la pestaña "Instalación". Los sprites mostrados son emojis como
              placeholders — no redistribuyen archivos con copyright del juego.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
