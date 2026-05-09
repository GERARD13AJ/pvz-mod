import React from 'react';
import { modConfigJson } from '../data/allGameData';

export const ConfigPage: React.FC = () => {
  const [copied, setCopied] = React.useState(false);
  const jsonStr = JSON.stringify(modConfigJson, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mod_config.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Generate example plant config
  const rollingNutConfig = {
    plant_id: "rolling_nut",
    name: "Nuez Rodadora",
    type: "projectile_plant",
    sun_cost: 75,
    cooldown_frames: 300,
    toughness: 1500,
    behavior: "rolling",
    roll_speed_pixels_per_frame: 2.5,
    damage_per_hit: 30,
    max_hits_before_destroy: 9,
    knockback_cells: 1,
    sprite: "resources/IMAGES/plants/rolling_nut.png",
    sprite_size: { width: 40, height: 40 },
    seed_packet_icon: "resources/IMAGES/ui/seed_rolling_nut.png",
    impact_sound: "resources/SOUND/rolling_impact.wav",
    lane_restricted: true,
    can_be_placed_on: ["grass", "pool_with_lily_pad"],
  };

  const allyConfig = {
    ally_id: "ally_conehead",
    name: "Zombi Cono Aliado",
    type: "ally_zombie",
    sun_cost: 75,
    cooldown_frames: 300,
    hp: 650,
    shield_hp: 370,
    damage_per_bite: 20,
    attack_interval_frames: 30,
    movement_speed: 0.35,
    sprite: "resources/IMAGES/zombies/ally_conehead.png",
    is_flying: false,
    can_jump: false,
    ribbon_color: "#4caf50",
    targeting: "nearest_enemy_zombie",
    friendly_fire: false,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">⚙️ Configuración JSON</h2>
        <p className="text-gray-400 text-sm">
          Archivos de configuración del mod. Todos los valores son editables sin necesidad de recompilar código.
        </p>
      </div>

      {/* Main config */}
      <div className="bg-gray-800/60 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="text-white font-bold">📄 mod.json — Configuración Principal</h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-lg text-xs transition-colors"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar'}
            </button>
            <button
              onClick={handleDownload}
              className="bg-pvz-green hover:bg-pvz-green-light text-white px-3 py-1 rounded-lg text-xs transition-colors"
            >
              ⬇️ Descargar
            </button>
          </div>
        </div>
        <pre className="p-4 text-xs text-gray-300 overflow-x-auto max-h-96 bg-black/30">
          {jsonStr}
        </pre>
      </div>

      {/* Plant config example */}
      <div className="bg-gray-800/60 rounded-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-bold">🥜 Ejemplo: rolling_nut.json</h3>
          <p className="text-gray-400 text-xs mt-1">Configuración completa de la Nuez Rodadora</p>
        </div>
        <pre className="p-4 text-xs text-gray-300 overflow-x-auto max-h-80 bg-black/30">
          {JSON.stringify(rollingNutConfig, null, 2)}
        </pre>
      </div>

      {/* Ally config example */}
      <div className="bg-gray-800/60 rounded-xl border border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-white font-bold">🧟 Ejemplo: ally_conehead.json</h3>
          <p className="text-gray-400 text-xs mt-1">Configuración completa del Zombi Cono Aliado</p>
        </div>
        <pre className="p-4 text-xs text-gray-300 overflow-x-auto max-h-80 bg-black/30">
          {JSON.stringify(allyConfig, null, 2)}
        </pre>
      </div>

      {/* Config schema */}
      <div className="bg-gray-800/60 rounded-xl border border-gray-700 p-6">
        <h3 className="text-white font-bold mb-3">📋 Schema de Configuración</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="text-green-400 font-bold mb-2">Plantas (data/plants/*.json)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {[
                ['plant_id', 'string', 'ID único de la planta'],
                ['name', 'string', 'Nombre visible'],
                ['type', 'string', 'projectile_plant, rolling, exploding, etc.'],
                ['sun_cost', 'number', 'Coste en soles'],
                ['cooldown_frames', 'number', 'Frames de recarga (60 = 1 segundo)'],
                ['toughness', 'number', 'Puntos de vida'],
                ['behavior', 'string', 'Comportamiento principal'],
                ['damage_per_hit', 'number', 'Daño por impacto'],
                ['sprite', 'string', 'Ruta al archivo de sprite'],
              ].map(([key, type, desc]) => (
                <div key={key} className="flex gap-2 bg-black/20 rounded-lg p-2">
                  <code className="text-green-300 shrink-0">{key}</code>
                  <code className="text-yellow-300 shrink-0">[{type}]</code>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-purple-400 font-bold mb-2">Zombis Aliados (data/allies/*.json)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              {[
                ['ally_id', 'string', 'ID único del aliado'],
                ['name', 'string', 'Nombre visible'],
                ['sun_cost', 'number', 'Coste en soles'],
                ['hp', 'number', 'Puntos de vida totales'],
                ['shield_hp', 'number', 'HP del escudo (cono, cubo, etc.)'],
                ['damage_per_bite', 'number', 'Daño por mordida'],
                ['movement_speed', 'number', 'Velocidad en celdas/segundo'],
                ['sprite', 'string', 'Ruta al sprite'],
                ['is_flying', 'boolean', 'Si vuela sobre el terreno'],
                ['targeting', 'string', 'Estrategia de targeting'],
              ].map(([key, type, desc]) => (
                <div key={key} className="flex gap-2 bg-black/20 rounded-lg p-2">
                  <code className="text-purple-300 shrink-0">{key}</code>
                  <code className="text-yellow-300 shrink-0">[{type}]</code>
                  <span className="text-gray-400">{desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
