import { useState, useEffect, useCallback, useRef } from 'react';
import { BattleState, BattleEntity } from '../types';
import { modPlants, allyZombies } from '../data/allGameData';

const CELL_WIDTH = 80;
const LANES = 5;
const COLS = 9;
const TICK_MS = 50;

export function useBattleSimulator() {
  const [state, setState] = useState<BattleState>({
    running: false,
    paused: false,
    lane: LANES,
    laneWidth: COLS * CELL_WIDTH,
    entities: [],
    sun: 150,
    wave: 0,
    maxWaves: 3,
    selectedPlant: null,
    gameOver: false,
    victory: false,
    message: '',
  });

  const intervalRef = useRef<number | null>(null);
  const stateRef = useRef(state);
  stateRef.current = state;

  const startBattle = useCallback((_availablePlants: string[], _availableAllies: string[], waves: number) => {
    setState(prev => ({
      ...prev,
      running: true,
      paused: false,
      entities: [],
      sun: 150,
      wave: 1,
      maxWaves: waves,
      selectedPlant: null,
      gameOver: false,
      victory: false,
      message: `¡Oleada 1 de ${waves}!`,
    }));
  }, []);

  const placePlant = useCallback((lane: number, col: number, plantId: string) => {
    setState(prev => {
      if (!prev.running || prev.paused || prev.gameOver) return prev;

      const plant = modPlants.find(p => p.id === plantId);
      if (!plant) return prev;

      const sunCost = plant.sunCost;
      if (prev.sun < sunCost) {
        return { ...prev, message: '¡No tienes suficiente sol!' };
      }

      const alreadyThere = prev.entities.find(
        e => e.type === 'plant' && e.lane === lane && Math.floor(e.x / CELL_WIDTH) === col && e.isPlayer
      );
      if (alreadyThere) return prev;

      const x = col * CELL_WIDTH + CELL_WIDTH / 2;
      const newEntity: BattleEntity = {
        id: `${plantId}-${lane}-${col}-${Date.now()}`,
        lane,
        x,
        hp: plant.toughness,
        maxHp: plant.toughness,
        speed: 0,
        damage: plant.damage,
        attackCooldown: 0,
        emoji: plant.emoji,
        type: 'plant',
        isPlayer: true,
        behavior: plant.behavior,
      };

      // For rolling nuts, they move right
      if (plant.behavior === 'roll' || plant.behavior === 'explode') {
        newEntity.type = 'rolling-nut';
        newEntity.speed = plant.speed * 2; // pixels per tick
      }

      return {
        ...prev,
        sun: prev.sun - sunCost,
        entities: [...prev.entities, newEntity],
        message: `${plant.name} colocada en fila ${lane + 1}`,
      };
    });
  }, []);

  const placeAlly = useCallback((lane: number, col: number, zombieId: string) => {
    setState(prev => {
      if (!prev.running || prev.paused || prev.gameOver) return prev;

      const zombie = allyZombies.find(z => z.id === zombieId);
      if (!zombie) return prev;

      const sunCost = zombie.sunCost;
      if (prev.sun < sunCost) {
        return { ...prev, message: '¡No tienes suficiente sol!' };
      }

      const x = col * CELL_WIDTH + CELL_WIDTH / 2;
      const newEntity: BattleEntity = {
        id: `${zombieId}-${lane}-${col}-${Date.now()}`,
        lane,
        x,
        hp: zombie.hp,
        maxHp: zombie.hp,
        speed: zombie.movementSpeed * 2, // moves right
        damage: zombie.damage,
        attackCooldown: 0,
        emoji: zombie.emoji,
        type: 'ally',
        isPlayer: true,
        behavior: 'ally',
      };

      return {
        ...prev,
        sun: prev.sun - sunCost,
        entities: [...prev.entities, newEntity],
        message: `${zombie.name} desplegado en fila ${lane + 1}`,
      };
    });
  }, []);

  const selectPlant = useCallback((plantId: string | null) => {
    setState(prev => ({ ...prev, selectedPlant: plantId }));
  }, []);

  const togglePause = useCallback(() => {
    setState(prev => ({ ...prev, paused: !prev.paused }));
  }, []);

  const stopBattle = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    setState(prev => ({ ...prev, running: false, gameOver: false, entities: [], message: '' }));
  }, []);

  const collectSun = useCallback(() => {
    setState(prev => ({ ...prev, sun: prev.sun + 25, message: '+25 sol' }));
  }, []);

  // Game tick
  useEffect(() => {
    if (!state.running || state.paused || state.gameOver) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = window.setInterval(() => {
      setState(prev => {
        if (!prev.running || prev.paused || prev.gameOver) return prev;

        let entities = prev.entities.map(e => ({ ...e }));
        let sun = prev.sun;
        let message = prev.message;
        let gameOver = false;
        let victory = false;

        // Spawn enemy zombies
        if (Math.random() < 0.02 * prev.wave) {
          const lane = Math.floor(Math.random() * LANES);
          const enemyTypes = ['basic', 'cone', 'bucket'];
          const type = enemyTypes[Math.floor(Math.random() * Math.min(enemyTypes.length, prev.wave + 1))];
          const hpMap: Record<string, number> = { basic: 200, cone: 570, bucket: 1300 };
          const emojiMap: Record<string, string> = { basic: '🧟', cone: '🔶', bucket: '🪣' };

          entities.push({
            id: `enemy-${Date.now()}-${Math.random()}`,
            lane,
            x: prev.laneWidth + 20,
            hp: hpMap[type] || 200,
            maxHp: hpMap[type] || 200,
            speed: -1.5 - Math.random() * 0.5, // moves left
            damage: 10,
            attackCooldown: 0,
            emoji: emojiMap[type],
            type: 'zombie',
            isPlayer: false,
          });
        }

        // Auto sun generation
        if (Math.random() < 0.03) {
          sun += 25;
        }

        // Update entities
        entities = entities.map(e => {
          const updated = { ...e };

          // Rolling nuts move right
          if (updated.type === 'rolling-nut') {
            updated.x += updated.speed;

            // Check collision with enemy zombies
            for (let i = 0; i < entities.length; i++) {
              const other = entities[i];
              if (other.isPlayer || other.type !== 'zombie' || other.lane !== updated.lane) continue;
              if (Math.abs(other.x - updated.x) < 30) {
                other.hp -= updated.damage;
                if (updated.behavior === 'explode') {
                  // Explode: damage nearby zombies
                  entities.forEach(ent => {
                    if (!ent.isPlayer && ent.type === 'zombie' && ent.lane === updated.lane) {
                      if (Math.abs(ent.x - updated.x) < 120) {
                        ent.hp -= 80;
                      }
                    }
                  });
                  updated.hp = 0; // Destroy self
                } else {
                  updated.x += 40; // Knockback
                }
                break;
              }
            }

            // Remove if off screen
            if (updated.x > prev.laneWidth + 50) updated.hp = 0;
          }

          // Plants shoot
          if (updated.type === 'plant' && updated.behavior === 'roll' !== true) {
            updated.attackCooldown -= 1;
            if (updated.attackCooldown <= 0) {
              // Check if there's a zombie in this lane
              const hasZombie = entities.some(e => e.type === 'zombie' && e.lane === updated.lane && e.x > updated.x);
              if (hasZombie && Math.random() < 0.04) {
                entities.push({
                  id: `proj-${Date.now()}-${Math.random()}`,
                  lane: updated.lane,
                  x: updated.x + 20,
                  hp: 1,
                  maxHp: 1,
                  speed: 4,
                  damage: 20,
                  attackCooldown: 0,
                  emoji: '🟢',
                  type: 'projectile',
                  isPlayer: true,
                });
                updated.attackCooldown = 30;
              }
            }
          }

          // Allies move right and attack
          if (updated.type === 'ally') {
            // Check for enemy zombies ahead
            const enemyAhead = entities.find(e => e.type === 'zombie' && e.lane === updated.lane && e.x > updated.x && e.x < updated.x + 60);
            if (enemyAhead) {
              updated.attackCooldown -= 1;
              if (updated.attackCooldown <= 0) {
                enemyAhead.hp -= updated.damage;
                updated.attackCooldown = 40;
              }
            } else {
              updated.x += updated.speed;
            }

            if (updated.x > prev.laneWidth + 50) updated.hp = 0;
          }

          // Projectiles move right
          if (updated.type === 'projectile') {
            updated.x += updated.speed;
            // Hit zombies
            for (const other of entities) {
              if (other.type === 'zombie' && other.lane === updated.lane && Math.abs(other.x - updated.x) < 20) {
                other.hp -= updated.damage;
                updated.hp = 0;
                break;
              }
            }
            if (updated.x > prev.laneWidth) updated.hp = 0;
          }

          // Zombies move left and attack
          if (updated.type === 'zombie') {
            const plantAhead = entities.find(e => e.isPlayer && e.lane === updated.lane && e.x > updated.x - 20 && e.x < updated.x + 20);
            if (plantAhead) {
              updated.attackCooldown -= 1;
              if (updated.attackCooldown <= 0) {
                plantAhead.hp -= updated.damage;
                updated.attackCooldown = 20;
              }
            } else {
              updated.x += updated.speed;
            }

            // Reached the left side = game over
            if (updated.x < -20) {
              gameOver = true;
              message = '¡Los zombis han llegado a tu casa!';
            }
          }

          return updated;
        });

        // Remove dead entities
        entities = entities.filter(e => e.hp > 0);

        // Check victory: wave timer
        if (!gameOver) {
          const enemyCount = entities.filter(e => e.type === 'zombie').length;
          const timeToAdvance = Math.random() < 0.001;
          if (timeToAdvance && prev.wave < prev.maxWaves && enemyCount === 0) {
            const nextWave = prev.wave + 1;
            if (nextWave > prev.maxWaves) {
              victory = true;
              message = '¡VICTORIA! ¡Has sobrevivido a todas las oleadas!';
            } else {
              message = `¡Oleada ${nextWave} de ${prev.maxWaves}!`;
            }
          }

          // Auto-advance wave after time
          if (prev.wave < prev.maxWaves) {
            const shouldAdvance = Math.random() < 0.0005;
            if (shouldAdvance) {
              const nextWave = prev.wave + 1;
              message = `¡Oleada ${nextWave} de ${prev.maxWaves}!`;
              return { ...prev, entities, sun, wave: nextWave, message };
            }
          }

          // Victory after enough time
          const isVictory = Math.random() < 0.0002 && prev.wave >= prev.maxWaves && enemyCount === 0;
          if (isVictory) {
            victory = true;
            message = '¡VICTORIA! ¡Has sobrevivido a todas las oleadas!';
          }
        }

        return { ...prev, entities, sun, gameOver, victory, message };
      });
    }, TICK_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [state.running, state.paused, state.gameOver]);

  return {
    state,
    startBattle,
    placePlant,
    placeAlly,
    selectPlant,
    togglePause,
    stopBattle,
    collectSun,
  };
}
