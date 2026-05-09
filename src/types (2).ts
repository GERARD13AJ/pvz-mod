// ============================================
// PVZ 1 MOD - TYPES & INTERFACES
// ============================================

// --- BASE PLANT ---
export interface BasePlant {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  sunCost: number;
  recharge: 'fast' | 'medium' | 'slow' | 'very-slow';
  toughness: number;
  behavior: string;
  emoji: string;
  color: string;
}

// --- MOD PLANT ---
export interface ModPlant {
  id: string;
  name: string;
  description: string;
  sunCost: number;
  recharge: 'fast' | 'medium' | 'slow' | 'very-slow';
  toughness: number;
  damage: number;
  speed: number; // rolling speed in cells per second
  behavior: 'roll' | 'explode' | 'block' | 'shield' | 'area-damage';
  specialAbility: string;
  unlockLevel: string; // level ID that unlocks this plant
  emoji: string;
  color: string;
  placeholderNote: string;
  configurable: Record<string, unknown>;
}

// --- ALLY ZOMBIE ---
export interface AllyZombie {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  sunCost: number;
  recharge: 'fast' | 'medium' | 'slow' | 'very-slow';
  hp: number;
  damage: number;
  attackSpeed: number; // attacks per second
  movementSpeed: number; // cells per second
  specialAbility: string;
  unlockLevel: string;
  emoji: string;
  color: string;
  placeholderNote: string;
  configurable: Record<string, unknown>;
}

// --- LEVEL ---
export interface ModLevel {
  id: string;
  name: string;
  description: string;
  campaign: 'plants' | 'allies' | 'final';
  waves: number;
  zombies: string[];
  availablePlants: string[]; // plant IDs available in this level
  availableAllies: string[]; // ally zombie IDs available
  unlocks: string; // ID of what this level unlocks
  unlockType: 'plant' | 'zombie' | 'mode';
  difficulty: 1 | 2 | 3 | 4 | 5;
  previewWave: string;
}

// --- PROGRESS / SAVE DATA ---
export interface ProgressData {
  completedLevels: string[];
  unlockedPlants: string[];
  unlockedZombies: string[];
  currentCampaign: 'adventure' | 'plants-mod' | 'allies' | 'final';
  sunCollected: number;
  zombiesDefeated: number;
  gamesPlayed: number;
  firstVisit: number;
  lastVisit: number;
}

// --- BATTLE SIM STATE ---
export interface BattleEntity {
  id: string;
  lane: number;
  x: number; // position in pixels from left
  hp: number;
  maxHp: number;
  speed: number; // positive = right to left (zombie), negative = left to right (plant projectile)
  damage: number;
  attackCooldown: number;
  emoji: string;
  type: 'plant' | 'zombie' | 'projectile' | 'ally' | 'rolling-nut';
  isPlayer: boolean;
  behavior?: string;
  explodeRange?: number;
}

export interface BattleState {
  running: boolean;
  paused: boolean;
  lane: number; // 5 lanes
  laneWidth: number;
  entities: BattleEntity[];
  sun: number;
  wave: number;
  maxWaves: number;
  selectedPlant: string | null;
  gameOver: boolean;
  victory: boolean;
  message: string;
}

export type TabId =
  | 'home'
  | 'plants'
  | 'mod-plants'
  | 'allies'
  | 'levels'
  | 'architecture'
  | 'config'
  | 'battle'
  | 'install';

export const DEFAULT_PROGRESS: ProgressData = {
  completedLevels: [],
  unlockedPlants: ['peashooter', 'sunflower', 'wall-nut', 'potato-mine', 'snow-pea', 'chomper', 'repeater', 'puff-shroom', 'sun-shroom', 'fume-shroom', 'grave-buster', 'hypno-shroom', 'scaredy-shroom', 'ice-shroom', 'doom-shroom', 'lily-pad', 'squash', 'threepeater', 'tangle-kelp', 'jalapeno', 'spikeweed', 'torchwood', 'tall-nut', 'sea-shroom', 'plantern', 'cactus', 'bloomerang', 'split-pea', 'starfruit', 'pumpkin', 'magnet-shroom', 'cabbage-pult', 'flower-pot', 'kernel-pult', 'coffee-bean', 'garlic', 'umbrella-leaf', 'marigold', 'melon-pult', 'gatling-pea', 'twin-sunflower', 'gloom-shroom', 'cattail', 'winter-melon', 'gold-magnet', 'spikerock', 'cob-cannon'],
  unlockedZombies: [],
  currentCampaign: 'adventure',
  sunCollected: 0,
  zombiesDefeated: 0,
  gamesPlayed: 0,
  firstVisit: Date.now(),
  lastVisit: Date.now(),
};
