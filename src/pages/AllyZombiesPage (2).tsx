import React from 'react';
import { AllyZombieCard } from '../components/Cards';
import { allyZombies } from '../data/allGameData';

interface AllyZombiesPageProps {
  unlockedZombieIds: string[];
}

export const AllyZombiesPage: React.FC<AllyZombiesPageProps> = ({ unlockedZombieIds }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">🧟 Zombis Aliados</h2>
        <p className="text-gray-400 text-sm">
          Desbloquea zombis clásicos como unidades aliadas después del modo aventura.
          Cada zombi tiene estadísticas únicas y habilidades especiales.
        </p>
      </div>

      <div className="bg-purple-900/30 rounded-xl p-4 border border-purple-700">
        <h3 className="text-purple-300 font-bold text-sm mb-2">¿Cómo funcionan los Zombis Aliados?</h3>
        <p className="text-purple-200/70 text-xs leading-relaxed">
          Los zombis aliados se despliegan desde el lado izquierdo del césped (como las plantas)
          pero se mueven hacia la derecha, atacando a los zombis enemigos en su camino.
          Tienen coste en sol, cooldown y estadísticas balanceadas para no romper la jugabilidad.
          Se seleccionan desde una barra especial que aparece junto a la barra de plantas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allyZombies.map(zombie => (
          <AllyZombieCard
            key={zombie.id}
            zombie={zombie}
            unlocked={unlockedZombieIds.includes(zombie.id)}
          />
        ))}
      </div>

      {/* Tech note */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-bold mb-3">📐 Implementación Técnica</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <p>
            <strong className="text-pvz-green">Inversión de dirección:</strong> En el motor de PvZ, los zombis
            enemigos se mueven de derecha a izquierda (X decreciente). Los zombis aliados invierten
            esta lógica: se spawn en columna 0 y su velocidad X es positiva. Usan el sistema de
            targeting inverso — buscan zombis enemigos a su derecha.
          </p>
          <p>
            <strong className="text-pvz-green">Sprite indicator:</strong> Para diferenciarlos visualmente de
            los zombis enemigos, se añade una cinta/ribbon verde sobre la cabeza en el sprite.
            Esto se logra con un overlay en el renderizado o modificando el sprite base.
          </p>
          <p>
            <strong className="text-pvz-green">Balance:</strong> Los zombis aliados son deliberadamente más
            lentos y con menos daño que sus contrapartes enemigas para evitar romper el juego.
            Su valor está en el tanking y la capacidad de interceptar zombis.
          </p>
        </div>
      </div>
    </div>
  );
};
