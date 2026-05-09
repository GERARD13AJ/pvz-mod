import React from 'react';
import { useBattleSimulator } from '../hooks/useBattle';
import { ModPlant, AllyZombie } from '../types';

const CELL_WIDTH = 80;
const CELL_HEIGHT = 70;
const LANES = 5;
const COLS = 9;
const LAWN_WIDTH = COLS * CELL_WIDTH;
const LAWN_HEIGHT = LANES * CELL_HEIGHT;

interface BattleSimulatorProps {
  availablePlants: ModPlant[];
  availableAllies: AllyZombie[];
  waves: number;
  _onComplete?: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars

export const BattleSimulator: React.FC<BattleSimulatorProps> = ({
  availablePlants,
  availableAllies,
  waves,
  _onComplete: _onComplete,
}) => {
  const { state, startBattle, placePlant, placeAlly, selectPlant, togglePause, stopBattle, collectSun } = useBattleSimulator();
  const [mode, setMode] = React.useState<'plant' | 'ally'>('plant');
  // _onComplete is reserved for future use

  const handleLawnClick = (lane: number, col: number) => {
    if (!state.selectedPlant) return;
    const plant = modPlants.find(p => p.id === state.selectedPlant);
    const zombie = allyZombies.find(z => z.id === state.selectedPlant);
    if (plant && mode === 'plant') {
      placePlant(lane, col, plant.id);
    } else if (zombie && mode === 'ally') {
      placeAlly(lane, col, zombie.id);
    }
  };

  if (!state.running) {
    return (
      <div className="bg-gray-900/80 rounded-2xl p-8 text-center border border-gray-700">
        <div className="text-5xl mb-4">🌻</div>
        <h3 className="text-xl font-bold text-white mb-2">Simulador de Batalla PvZ</h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Simula una partida simplificada con las plantas y zombis desbloqueados.
          Coloca plantas y zombis aliados en el césped para defender tu casa.
        </p>

        <div className="grid grid-cols-2 gap-3 mb-6 max-w-lg mx-auto">
          {availablePlants.length > 0 && (
            <div className="bg-green-900/30 rounded-xl p-4">
              <p className="text-sm text-green-300 font-bold mb-2">🌱 Plantas Disponibles</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {availablePlants.map(p => (
                  <span key={p.id} className="text-lg" title={p.name}>{p.emoji}</span>
                ))}
              </div>
            </div>
          )}
          {availableAllies.length > 0 && (
            <div className="bg-purple-900/30 rounded-xl p-4">
              <p className="text-sm text-purple-300 font-bold mb-2">🧟 Aliados Disponibles</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {availableAllies.map(z => (
                  <span key={z.id} className="text-lg" title={z.name}>{z.emoji}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => startBattle([], [], waves)}
          className="bg-pvz-green hover:bg-pvz-green-light text-white font-bold py-3 px-8 rounded-xl text-sm transition-all duration-200 hover:scale-105 active:scale-95"
        >
          ⚔️ ¡INICIAR BATALLA!
        </button>
        <p className="text-xs text-gray-500 mt-3">{waves} oleadas de zombis enemigos</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="bg-gray-800 rounded-xl p-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-xl">☀️</span>
            <span className="text-yellow-300 font-bold text-lg">{state.sun}</span>
          </div>
          <button
            onClick={collectSun}
            className="bg-yellow-600/30 hover:bg-yellow-600/50 text-yellow-300 px-3 py-1 rounded-lg text-xs transition-colors"
          >
            + Recoger sol
          </button>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-white text-sm">
            Oleada {state.wave}/{state.maxWaves}
          </span>
          <button
            onClick={togglePause}
            className="bg-gray-600 hover:bg-gray-500 text-white px-3 py-1 rounded-lg text-xs transition-colors"
          >
            {state.paused ? '▶ Reanudar' : '⏸ Pausar'}
          </button>
          <button
            onClick={stopBattle}
            className="bg-red-600/50 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition-colors"
          >
            ✖ Salir
          </button>
        </div>
      </div>

      {/* Message */}
      {state.message && (
        <div className={`text-center text-sm py-1 rounded-lg ${state.gameOver ? 'bg-red-900/50 text-red-300' : state.victory ? 'bg-green-900/50 text-green-300' : 'bg-gray-800 text-gray-300'}`}>
          {state.message}
        </div>
      )}

      {/* Victory/Game Over */}
      {(state.victory || state.gameOver) && (
        <div className={`text-center p-6 rounded-xl border-2 ${state.victory ? 'bg-green-900/30 border-green-500' : 'bg-red-900/30 border-red-500'}`}>
          <div className="text-5xl mb-3">{state.victory ? '🏆' : '💀'}</div>
          <h3 className="text-xl font-bold text-white mb-2">
            {state.victory ? '¡VICTORIA!' : '¡DERROTA!'}
          </h3>
          <p className="text-gray-300 mb-4">{state.message}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => startBattle([], [], waves)}
              className="bg-pvz-green hover:bg-pvz-green-light text-white font-bold py-2 px-6 rounded-lg text-sm transition-all"
            >
              🔄 Reintentar
            </button>
            <button
              onClick={stopBattle}
              className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded-lg text-sm transition-all"
            >
              ✖ Salir
            </button>
          </div>
        </div>
      )}

      {/* Selection bar */}
      {!state.gameOver && !state.victory && (
        <div className="bg-gray-800/80 rounded-xl p-3">
          <div className="flex gap-2 mb-2">
            <button
              onClick={() => setMode('plant')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${mode === 'plant' ? 'bg-pvz-green text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
            >
              🌱 Plantas
            </button>
            <button
              onClick={() => setMode('ally')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${mode === 'ally' ? 'bg-purple-600 text-white' : 'bg-gray-700 text-gray-400 hover:text-white'}`}
            >
              🧟 Aliados
            </button>
          </div>

          <div className="flex gap-2 flex-wrap">
            {mode === 'plant' && availablePlants.map(p => (
              <button
                key={p.id}
                onClick={() => selectPlant(state.selectedPlant === p.id ? null : p.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                  state.selectedPlant === p.id
                    ? 'bg-pvz-green text-white ring-2 ring-pvz-green-light'
                    : state.sun >= p.sunCost
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-lg">{p.emoji}</span>
                <div className="text-left">
                  <div className="font-bold">{p.name}</div>
                  <div className="text-yellow-400">☀️ {p.sunCost}</div>
                </div>
              </button>
            ))}
            {mode === 'ally' && availableAllies.map(z => (
              <button
                key={z.id}
                onClick={() => selectPlant(state.selectedPlant === z.id ? null : z.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${
                  state.selectedPlant === z.id
                    ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                    : state.sun >= z.sunCost
                    ? 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                    : 'bg-gray-800 text-gray-500 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-lg">{z.emoji}</span>
                <div className="text-left">
                  <div className="font-bold">{z.name.replace('Zombi ', '').replace(' aliado', '').replace(' Aliado', '')}</div>
                  <div className="text-yellow-400">☀️ {z.sunCost}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Lawn */}
      <div
        className="relative rounded-xl overflow-hidden border-2 border-green-800 shadow-2xl"
        style={{ width: LAWN_WIDTH, height: LAWN_HEIGHT, maxWidth: '100%' }}
      >
        {/* Sky background */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 15%, #4CAF50 15%, #388E3C 100%)' }}>
          {/* Grid */}
          {Array.from({ length: LANES }).map((_, lane) =>
            Array.from({ length: COLS }).map((_, col) => (
              <div
                key={`${lane}-${col}`}
                className={`absolute cursor-pointer transition-colors hover:bg-white/10 ${
                  (lane + col) % 2 === 0 ? 'bg-white/5' : 'bg-black/5'
                }`}
                style={{
                  left: col * CELL_WIDTH,
                  top: 15 + lane * CELL_HEIGHT,
                  width: CELL_WIDTH,
                  height: CELL_HEIGHT,
                }}
                onClick={() => handleLawnClick(lane, col)}
              />
            ))
          )}
        </div>

        {/* Entities */}
        {state.entities.map(entity => (
          <div
            key={entity.id}
            className="absolute transition-none select-none pointer-events-none flex items-center justify-center"
            style={{
              left: entity.x - 15,
              top: 15 + entity.lane * CELL_HEIGHT + 10,
              width: 30,
              height: 50,
            }}
          >
            <span className="text-2xl">{entity.emoji}</span>
            {/* HP bar */}
            {entity.hp < entity.maxHp && (
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-red-900 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-400 rounded-full"
                  style={{ width: `${(entity.hp / entity.maxHp) * 100}%` }}
                />
              </div>
            )}
          </div>
        ))}

        {/* House line */}
        <div className="absolute left-0 top-[15px] w-1 h-full bg-red-600/50" />
        <div className="absolute left-0 top-[15px] text-xs text-red-400 px-1">🏠</div>
      </div>

      <p className="text-xs text-gray-500 text-center">
        Selecciona una planta/aliado y haz clic en el césped para colocarla. Recoge soles para comprar más.
      </p>
    </div>
  );
};

import { modPlants, allyZombies } from '../data/allGameData';
