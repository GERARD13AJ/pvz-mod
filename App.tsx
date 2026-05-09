import React from 'react';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { PlantsPage } from './pages/PlantsPage';
import { ModPlantsPage } from './pages/ModPlantsPage';
import { AllyZombiesPage } from './pages/AllyZombiesPage';
import { LevelsPage } from './pages/LevelsPage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { ConfigPage } from './pages/ConfigPage';
import { InstallPage } from './pages/InstallPage';
import { BattleSimPage } from './pages/BattleSimPage';
import { useProgress, getUnlockedModPlants, getUnlockedAllyZombies } from './hooks/useProgress';
import { TabId } from './types';
import { modPlants, allyZombies, modLevels } from './data/allGameData';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState<TabId>('home');
  const {
    progress,
    completeLevel,
    resetProgress,
    completionPercentage,
  } = useProgress();

  const unlockedPlants = React.useMemo(
    () => getUnlockedModPlants(progress.unlockedPlants),
    [progress.unlockedPlants]
  );
  const unlockedZombies = React.useMemo(
    () => getUnlockedAllyZombies(progress.unlockedZombies),
    [progress.unlockedZombies]
  );

  const renderPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            progress={progress}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
            completionPercent={completionPercentage()}
            unlockedPlantCount={unlockedPlants.length}
            unlockedZombieCount={unlockedZombies.length}
            totalPlants={modPlants.length}
            totalZombies={allyZombies.length}
            totalLevels={modLevels.length}
          />
        );
      case 'plants':
        return <PlantsPage />;
      case 'mod-plants':
        return (
          <ModPlantsPage
            unlockedPlantIds={progress.unlockedPlants}
          />
        );
      case 'allies':
        return (
          <AllyZombiesPage
            unlockedZombieIds={progress.unlockedZombies}
          />
        );
      case 'levels':
        return (
          <LevelsPage
            completedLevels={progress.completedLevels}
            unlockedPlantIds={progress.unlockedPlants}
            unlockedZombieIds={progress.unlockedZombies}
            onCompleteLevel={completeLevel}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
          />
        );
      case 'battle':
        return (
          <BattleSimPage
            unlockedPlantIds={progress.unlockedPlants}
            unlockedZombieIds={progress.unlockedZombies}
          />
        );
      case 'architecture':
        return <ArchitecturePage />;
      case 'config':
        return <ConfigPage />;
      case 'install':
        return <InstallPage />;
      default:
        return <HomePage
            progress={progress}
            onNavigate={(tab) => setActiveTab(tab as TabId)}
            completionPercent={completionPercentage()}
            unlockedPlantCount={unlockedPlants.length}
            unlockedZombieCount={unlockedZombies.length}
            totalPlants={modPlants.length}
            totalZombies={allyZombies.length}
            totalLevels={modLevels.length}
          />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        completionPercent={completionPercentage()}
        unlockedPlants={unlockedPlants.length}
        unlockedZombies={unlockedZombies.length}
        completedLevels={progress.completedLevels.length}
      />

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-white font-bold text-lg lg:ml-0 ml-8">
              {activeTab === 'home' && '🏠 Inicio'}
              {activeTab === 'plants' && '🌱 Plantas Base'}
              {activeTab === 'mod-plants' && '🥜 Plantas del Mod'}
              {activeTab === 'allies' && '🧟 Zombis Aliados'}
              {activeTab === 'levels' && '🗺️ Niveles'}
              {activeTab === 'battle' && '⚔️ Simulador de Batalla'}
              {activeTab === 'architecture' && '📐 Arquitectura'}
              {activeTab === 'config' && '⚙️ Configuración'}
              {activeTab === 'install' && '📦 Instalación'}
            </h2>
            <div className="flex items-center gap-3">
              <div className="text-xs text-gray-400 hidden sm:block">
                🌱 {unlockedPlants.length}/{modPlants.length} plantas ·
                🧟 {unlockedZombies.length}/{allyZombies.length} aliados
              </div>
              <button
                onClick={resetProgress}
                className="bg-red-900/30 hover:bg-red-900/50 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-xs transition-colors border border-red-800/50"
                title="Reiniciar todo el progreso"
              >
                🗑️ Reset
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 md:p-6 lg:p-8 max-w-6xl">
          {renderPage()}
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-800 px-6 py-4 text-center">
          <p className="text-xs text-gray-600">
            PvZ 1 Mod Framework — Bowling Nuts & Ally Zombies v1.0.0
          </p>
          <p className="text-xs text-gray-700 mt-1">
            No redistribuye archivos con copyright. Placeholders incluidos.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default App;
