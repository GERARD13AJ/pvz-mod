import React from 'react';
import { BattleSimulator } from '../components/BattleSimulator';
import { modPlants, allyZombies } from '../data/allGameData';

interface BattleSimPageProps {
  unlockedPlantIds: string[];
  unlockedZombieIds: string[];
}

export const BattleSimPage: React.FC<BattleSimPageProps> = ({ unlockedPlantIds, unlockedZombieIds }) => {
  const [selectedScenario, setSelectedScenario] = React.useState(0);

  const scenarios = [
    {
      name: '🌱 Tutorial de Plantas',
      description: 'Practica con las Nueces Rodadoras contra zombis básicos.',
      plants: modPlants.filter(p => unlockedPlantIds.includes(p.id)),
      allies: [],
      waves: 3,
    },
    {
      name: '🥜 Bolera Completa',
      description: 'Usa las 3 Nueces Rodadoras contra oleadas medias.',
      plants: modPlants.filter(p => unlockedPlantIds.includes(p.id)),
      allies: allyZombies.filter(z => unlockedZombieIds.includes(z.id)),
      waves: 5,
    },
    {
      name: '🧟 Ejército Aliado',
      description: 'Despliega zombis aliados junto con plantas.',
      plants: modPlants.filter(p => unlockedPlantIds.includes(p.id)),
      allies: allyZombies.filter(z => unlockedZombieIds.includes(z.id)),
      waves: 7,
    },
    {
      name: '⭐ Desafío Final',
      description: '¡Todo mezclado! 10 oleadas de zombis.',
      plants: modPlants.filter(p => unlockedPlantIds.includes(p.id)),
      allies: allyZombies.filter(z => unlockedZombieIds.includes(z.id)),
      waves: 10,
    },
  ];

  const current = scenarios[selectedScenario];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">⚔️ Simulador de Batalla</h2>
        <p className="text-gray-400 text-sm">
          Simula batallas con las plantas y zombis aliados desbloqueados.
          Selecciona un escenario y ¡defiende tu casa!
        </p>
      </div>

      {/* Scenario selector */}
      <div className="flex gap-2 flex-wrap">
        {scenarios.map((scenario, i) => (
          <button
            key={i}
            onClick={() => setSelectedScenario(i)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedScenario === i
                ? 'bg-pvz-green text-white scale-105'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {scenario.name}
          </button>
        ))}
      </div>

      <p className="text-gray-400 text-sm">{current.description}</p>

      {/* Battle Simulator */}
      <BattleSimulator
        availablePlants={current.plants}
        availableAllies={current.allies}
        waves={current.waves}
      />

      {/* Available units summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-green-900/20 border border-green-800 rounded-xl p-4">
          <h4 className="text-green-300 font-bold text-sm mb-2">🌱 Plantas en este escenario ({current.plants.length})</h4>
          <div className="flex flex-wrap gap-2">
            {current.plants.map(p => (
              <span key={p.id} className="flex items-center gap-1 bg-green-900/30 rounded-lg px-2 py-1 text-xs">
                <span>{p.emoji}</span>
                <span className="text-green-200">{p.name}</span>
                <span className="text-yellow-400">☀️{p.sunCost}</span>
              </span>
            ))}
            {current.plants.length === 0 && (
              <span className="text-gray-500 text-xs">No hay plantas desbloqueadas aún. Completa niveles para desbloquear.</span>
            )}
          </div>
        </div>
        <div className="bg-purple-900/20 border border-purple-800 rounded-xl p-4">
          <h4 className="text-purple-300 font-bold text-sm mb-2">🧟 Aliados en este escenario ({current.allies.length})</h4>
          <div className="flex flex-wrap gap-2">
            {current.allies.map(z => (
              <span key={z.id} className="flex items-center gap-1 bg-purple-900/30 rounded-lg px-2 py-1 text-xs">
                <span>{z.emoji}</span>
                <span className="text-purple-200">{z.name.replace('Zombi ', '').replace(' aliado', '').replace(' Aliado', '')}</span>
                <span className="text-yellow-400">☀️{z.sunCost}</span>
              </span>
            ))}
            {current.allies.length === 0 && (
              <span className="text-gray-500 text-xs">No hay zombis aliados desbloqueados aún. Completa la campaña de aliados.</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
