import React from 'react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">📐 Arquitectura del Mod</h2>
        <p className="text-gray-400 text-sm">
          Explicación detallada de la arquitectura elegida, por qué es la mejor para PvZ 1 original,
          y cómo extender el mod.
        </p>
      </div>

      {/* Architecture Choice */}
      <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">🏗️ Arquitectura Elegida: Capa de Datos + Mod Loader</h3>
        <div className="space-y-4 text-sm text-gray-300 leading-relaxed">
          <p>
            Para PvZ 1 original de PC (versión 1.2.0.1073 GOTY), el motor del juego está escrito en C++
            con archivos de recursos empaquetados en <code className="bg-black/40 px-1.5 py-0.5 rounded text-green-300">.PAK</code>.
            No existe un sistema oficial de mods como en juegos modernos, pero la comunidad ha desarrollado
            varias herramientas de modificación.
          </p>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-yellow-400 font-bold mb-2">¿Por qué esta arquitectura?</h4>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-pvz-green mt-0.5">✅</span>
                <span><strong>RePvZ</strong> es el framework de modding más estable para PvZ 1 GOTY.
                  Permite hooking de funciones del juego sin modificar el .exe directamente.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pvz-green mt-0.5">✅</span>
                <span><strong>JSON externo</strong> para configuraciones. El mod lee datos de plantas,
                  zombis y niveles desde archivos JSON, permitiendo balancear sin recompilar.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pvz-green mt-0.5">✅</span>
                <span><strong>Modularidad</strong>: cada planta/zombi es un objeto independiente.
                  Añadir nuevo contenido = añadir entrada JSON + sprite, sin tocar código.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-pvz-green mt-0.5">✅</span>
                <span><strong>Sin redistribución de copyright</strong>: los sprites se referencian
                  pero no se incluyen. El usuario coloca sus propios archivos.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Folder Structure */}
      <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">📁 Estructura de Carpetas</h3>
        <pre className="bg-black/40 rounded-xl p-4 text-xs text-gray-300 overflow-x-auto leading-relaxed">
{`PvZ_BowlingNuts_AllyZombies/
├── mod.json                    # Configuración principal del mod
├── README.md                   # Instrucciones de instalación
│
├── data/
│   ├── plants/
│   │   ├── rolling_nut.json    # Config de Nuez Rodadora
│   │   ├── rolling_nut_red.json # Config de Nuez Roja
│   │   └── rolling_nut_giant.json # Config de Nuez Gigante
│   │
│   ├── allies/
│   │   ├── conehead.json
│   │   ├── buckethead.json
│   │   ├── pole_vaulter.json
│   │   ├── balloon.json
│   │   ├── football.json
│   │   ├── digger.json
│   │   ├── dancer.json
│   │   └── gargantuar.json
│   │
│   ├── levels/
│   │   ├── campaign_plants.json   # Niveles 1-5
│   │   ├── campaign_allies.json   # Niveles 6-9
│   │   └── final_challenge.json   # Nivel final
│   │
│   └── balance.json            # Valores globales de balance
│
├── resources/
│   ├── IMAGES/
│   │   ├── plants/
│   │   │   ├── rolling_nut.png       # 40x40, animado (rotación)
│   │   │   ├── rolling_nut_red.png   # 44x44, con brillo
│   │   │   └── rolling_nut_giant.png # 60x60, textura roca
│   │   │
│   │   ├── zombies/
│   │   │   ├── ally_conehead.png     # Sprite + cinta verde
│   │   │   ├── ally_buckethead.png
│   │   │   ├── ally_pole_vaulter.png
│   │   │   ├── ally_balloon.png
│   │   │   ├── ally_football.png
│   │   │   ├── ally_digger.png
│   │   │   ├── ally_dancer.png
│   │   │   └── ally_gargantuar.png
│   │   │
│   │   └── ui/
│   │       ├── seed_rolling_nut.png  # 26x26 (icono seed packet)
│   │       ├── seed_rolling_nut_red.png
│   │       ├── seed_rolling_nut_giant.png
│   │       └── ally_zombie_bar.png   # UI barra de aliados
│   │
│   └── SOUND/
│       ├── rolling_impact.wav
│       ├── rolling_explosion.wav
│       ├── rolling_giant_impact.wav
│       └── ally_deploy.wav
│
├── save/
│   └── mod_progress.json       # Guardado de progreso
│
├── logs/
│   └── mod_debug.log           # Log de depuración
│
└── loader/
    ├── mod_loader.dll          # DLL de RePvZ
    ├── hooks.cpp               # Hooks de funciones
    ├── plant_system.cpp        # Sistema de plantas rodantes
    ├── ally_system.cpp         # Sistema de zombis aliados
    ├── level_system.cpp        # Sistema de niveles nuevos
    └── save_system.cpp         # Sistema de guardado`}
        </pre>
      </div>

      {/* How Mod Loader Works */}
      <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">⚙️ Cómo Funciona el Mod Loader</h3>
        <div className="space-y-4 text-sm text-gray-300">
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">1. Inyección de DLL (RePvZ)</h4>
            <p>
              El mod_loader.dll se inyecta en el proceso de PlantsVsZombies.exe usando RePvZ.
              Esto permite interceptar llamadas a funciones del juego sin modificar el ejecutable.
              El hook principal intercepta la función de carga de plantas y añade las nuevas al registro.
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">2. Registro de Nuevas Plantas</h4>
            <p>
              Cada planta del mod se registra en la tabla interna de plantas del juego (gPlantDatabase).
              Se asigna un ID único (&gt; 100 para evitar colisiones). El motor lee los datos desde JSON:
              coste en sol, cooldown, toughness, y un puntero a la función de comportamiento personalizada.
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">3. Comportamiento de Rodamiento</h4>
            <p>
              La función de comportamiento de la Nuez Rodadora se ejecuta cada tick del juego:
            </p>
            <pre className="bg-black/40 rounded-lg p-3 mt-2 text-xs text-green-300 overflow-x-auto">
{`// Pseudocódigo del comportamiento
void RollingNutBehavior(Plant* self) {
  // Mover horizontalmente
  self->x += self->speed * dt;

  // Detectar colisión con zombis en el mismo lane
  for (Zombie* z : GetZombiesInLane(self->lane)) {
    if (Distance(self->x, z->x) < COLLISION_RADIUS) {
      // Impacto
      z->TakeDamage(self->damage);
      z->KnockBack(self->knockback);
      self->hitsTaken++;

      if (self->behavior == EXPLODE) {
        Explode(self, self->explodeRadius);
        self->hp = 0; // Destruirse
      }
      else if (self->hitsTaken >= self->maxHits) {
        self->hp = 0; // Destruirse tras N hits
      }
      break;
    }
  }

  // Fuera de pantalla
  if (self->x > LAWN_WIDTH) {
    self->hp = 0;
  }
}`}
            </pre>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">4. Sistema de Zombis Aliados</h4>
            <p>
              Los zombis aliados se implementan como una clase derivada de Zombie con una bandera
              <code className="text-purple-300 bg-purple-900/30 px-1.5 py-0.5 rounded mx-1">isAlly = true</code>.
              Esto invierte su comportamiento: se mueven hacia la derecha, atacan zombis enemigos,
              y pueden ser dañados por zombis enemigos (pero no por plantas del jugador).
            </p>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">5. Guardado de Progreso</h4>
            <p>
              El progreso se guarda en <code className="text-yellow-300 bg-yellow-900/30 px-1.5 py-0.5 rounded mx-1">save/mod_progress.json</code>
              usando el sistema de archivos del juego. Se guarda después de cada nivel completado.
              El archivo es legible y editable manualmente para debugging.
            </p>
          </div>
        </div>
      </div>

      {/* Extensibility */}
      <div className="bg-gray-800/60 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">🔧 Cómo Añadir Nuevo Contenido</h3>
        <div className="space-y-4">
          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">Añadir una nueva planta:</h4>
            <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
              <li>Crear <code className="bg-black/40 px-1 rounded">data/plants/mi_planta.json</code> con las estadísticas</li>
              <li>Colocar el sprite en <code className="bg-black/40 px-1 rounded">resources/IMAGES/plants/</code></li>
              <li>Crear el icono seed packet en <code className="bg-black/40 px-1 rounded">resources/IMAGES/ui/</code></li>
              <li>Definir la función de comportamiento en el código (si es nueva)</li>
              <li>Añadir la referencia en el nivel correspondiente</li>
              <li>¡Listo! No hace falta recompilar si usas JSON loading dinámico</li>
            </ol>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">Añadir un nuevo zombi aliado:</h4>
            <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
              <li>Crear <code className="bg-black/40 px-1 rounded">data/allies/mi_zombi.json</code></li>
              <li>Sprite con cinta verde en <code className="bg-black/40 px-1 rounded">resources/IMAGES/zombies/</code></li>
              <li>Asignar un nivel de desbloqueo</li>
              <li>Definir comportamiento si es único</li>
            </ol>
          </div>

          <div className="bg-black/30 rounded-xl p-4">
            <h4 className="text-green-400 font-bold mb-2">Añadir un nuevo nivel:</h4>
            <ol className="space-y-1 text-sm text-gray-300 list-decimal list-inside">
              <li>Añadir entrada JSON en <code className="bg-black/40 px-1 rounded">data/levels/</code></li>
              <li>Definir oleadas, plantas disponibles, recompensa</li>
              <li>El sistema de niveles lo carga automáticamente</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div className="bg-red-900/20 border border-red-700/50 rounded-xl p-5">
        <h3 className="text-red-400 font-bold mb-3">⚠️ Limitaciones del Motor Original</h3>
        <div className="space-y-3 text-sm text-gray-300">
          <div>
            <h4 className="text-yellow-400 font-bold">Límite de plantas en pantalla</h4>
            <p>El motor original tiene un límite de ~50 plantas simultáneas. Las nueces rodadoras cuentan en este límite.</p>
          </div>
          <div>
            <h4 className="text-yellow-400 font-bold">No se pueden modificar niveles originales</h4>
            <p>Los niveles nuevos se añaden como "niveles extra" en un menú separado. No se pueden editar los niveles del modo aventura original sin herramientas avanzadas de unpacking.</p>
          </div>
          <div>
            <h4 className="text-yellow-400 font-bold">Sprites tienen formato propietario</h4>
            <p>Los archivos de imagen de PvZ usan un formato comprimido .PTX. Se necesitan herramientas como <code className="bg-black/40 px-1 rounded">PTX Editor</code> o <code className="bg-black/40 px-1 rounded">ImagePak</code> para extraer y reempaquetar.</p>
          </div>
          <div>
            <h4 className="text-yellow-400 font-bold">Los zombis aliados no pueden "comer" plantas aliadas</h4>
            <p>El sistema de targeting del motor original no diferencia entre plantas "aliadas" y "enemigas". Los zombis aliados atacan por proximidad al zombi enemigo más cercano, ignorando todas las plantas.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
