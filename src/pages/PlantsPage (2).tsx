import React from 'react';
import { BasePlantCard } from '../components/Cards';
import { basePlants } from '../data/allGameData';

export const PlantsPage: React.FC = () => {
  const [search, setSearch] = React.useState('');

  const filtered = basePlants.filter(
    p => p.name.toLowerCase().includes(search.toLowerCase()) ||
         p.nameEn.toLowerCase().includes(search.toLowerCase()) ||
         p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">🌱 Plantas Base de PvZ 1</h2>
        <p className="text-gray-400 text-sm">
          Referencia de todas las plantas originales del juego. Estas plantas están disponibles
          desde el inicio en el mod, pero se listan aquí como referencia de diseño.
        </p>
      </div>

      <input
        type="text"
        placeholder="🔍 Buscar planta..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-pvz-green focus:ring-1 focus:ring-pvz-green transition-colors"
      />

      <p className="text-xs text-gray-500">{filtered.length} plantas mostradas</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(plant => (
          <BasePlantCard key={plant.id} plant={plant} />
        ))}
      </div>
    </div>
  );
};
