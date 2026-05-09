import React from 'react';
import { ModPlantCard } from '../components/Cards';
import { modPlants } from '../data/allGameData';

interface ModPlantsPageProps {
  unlockedPlantIds: string[];
}

export const ModPlantsPage: React.FC<ModPlantsPageProps> = ({ unlockedPlantIds }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">🥜 Plantas del Mod — Bowling Nuts</h2>
        <p className="text-gray-400 text-sm">
          Nuevas plantas basadas en la mecánica de Wall-Nut Bowling.
          Se desbloquean completando niveles de la campaña de Plantas Mods.
        </p>
      </div>

      {/* Mod Plants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modPlants.map(plant => (
          <ModPlantCard
            key={plant.id}
            plant={plant}
            unlocked={unlockedPlantIds.includes(plant.id)}
          />
        ))}
      </div>

      {/* Architecture info */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-bold mb-3">📐 Implementación Técnica en PvZ 1</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <div>
            <h4 className="text-pvz-green font-bold mb-1">Mecánica de Rodamiento</h4>
            <p className="leading-relaxed">
              Las Nueces Rodadoras implementan un comportamiento de "proyectil con cuerpo".
              En el motor original de PvZ, esto se logra extendiendo la clase de Wall-Nut pero
              añadiendo velocidad horizontal en el eje X. Cada frame, la posición X se incrementa
              según la velocidad configurada. La colisión con zombis se detecta mediante
              bounding-box overlap en el mismo lane.
            </p>
          </div>
          <div>
            <h4 className="text-pvz-green font-bold mb-1">Explosión (Nuez Roja)</h4>
            <p className="leading-relaxed">
              La variante explosiva funciona similar al Jalapeño pero con detonación por contacto.
              Se usa el sistema de explosión del juego original (como el Cherry Bomb) pero
              con trigger de contacto en lugar de timer. El radio de 1.5 casillas se implementa
              verificando la distancia en píxeles de cada zombi en la fila.
            </p>
          </div>
          <div>
            <h4 className="text-pvz-green font-bold mb-1">Nuez Gigante</h4>
            <p className="leading-relaxed">
              Similar a la Nuez Rodadora estándar pero con stats superiores y un sprite más grande.
              Usa la misma lógica de colisión pero con knockback de 2 casillas (40 píxeles extra)
              y capacidad de aplastar zombis pequeños (Imps) al instante.
            </p>
          </div>
        </div>
      </div>

      {/* Placeholder note */}
      <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-xl p-4">
        <p className="text-yellow-300 text-xs font-bold mb-2">🖼️ Sprites Placeholder</p>
        <p className="text-yellow-200/70 text-xs leading-relaxed">
          Los emojis mostrados son placeholders. Para el mod real, necesitas crear o adaptar sprites
          basados en los assets originales de PvZ. Los archivos de sprite deben colocarse en:
          <code className="bg-black/30 px-1.5 py-0.5 rounded mx-1">resources/IMAGES/plants/</code>
          con las dimensiones indicadas en cada planta.
        </p>
      </div>
    </div>
  );
};
