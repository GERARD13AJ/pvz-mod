import React from 'react';
import { TabId } from '../types';

interface NavigationProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  completionPercent: number;
  unlockedPlants: number;
  unlockedZombies: number;
  completedLevels: number;
}

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'home', label: 'Inicio', icon: '🏠' },
  { id: 'plants', label: 'Plantas Base', icon: '🌱' },
  { id: 'mod-plants', label: 'Plantas Mods', icon: '🥜' },
  { id: 'allies', label: 'Zombis Aliados', icon: '🧟' },
  { id: 'levels', label: 'Niveles', icon: '🗺️' },
  { id: 'battle', label: 'Simulador', icon: '⚔️' },
  { id: 'architecture', label: 'Arquitectura', icon: '📐' },
  { id: 'config', label: 'Config JSON', icon: '⚙️' },
  { id: 'install', label: 'Instalación', icon: '📦' },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  completionPercent,
}) => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-pvz-green-dark text-white p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <span className="text-xl">☰</span>
      </button>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-64 bg-pvz-green-dark shadow-2xl z-50 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 overflow-y-auto`}>
        <div className="p-6 border-b border-green-800">
          <h1 className="pvz-font text-sm text-pvz-sun leading-relaxed">
            🌻 PvZ Mod<br />Framework
          </h1>
          <p className="text-xs text-green-300 mt-2">Bowling Nuts &<br />Ally Zombies</p>
          <div className="mt-3 bg-green-900/50 rounded-full h-2 overflow-hidden">
            <div className="progress-bar" style={{ width: `${completionPercent}%` }} />
          </div>
          <p className="text-xs text-green-400 mt-1">{completionPercent}% completado</p>
        </div>

        <div className="py-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { onTabChange(tab.id); setSidebarOpen(false); }}
              className={`w-full text-left px-6 py-3 flex items-center gap-3 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-pvz-green text-white border-r-4 border-pvz-sun'
                  : 'text-green-200 hover:bg-green-800/50 hover:text-white'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-4 mt-auto border-t border-green-800">
          <p className="text-xs text-green-500">v1.0.0 · PvZ 1 Original</p>
          <p className="text-xs text-green-600">Mod Framework</p>
        </div>
      </nav>
    </>
  );
};
