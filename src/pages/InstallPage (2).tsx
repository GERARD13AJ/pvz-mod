import React from 'react';

export const InstallPage: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      title: 'Prerrequisitos',
      icon: '📦',
      content: `Antes de instalar el mod, necesitas:

1. Plants vs. Zombies GOTY Edition (versión 1.2.0.1073) instalado en tu PC
   - Se puede obtener en Steam, GOG, o EA App
   - VERSIÓN IMPORTANTE: Debe ser la versión GOTY, NO la remasterizada

2. Herramientas de modding:
   - RePvZ (framework de modding para PvZ 1)
   - PTX Editor o ImagePak (para extraer/reempaquetar sprites)
   - Un editor de texto (VS Code recomendado)

3. Conocimientos básicos:
   - Cómo copiar archivos en carpetas
   - Cómo editar archivos JSON
   - Cómo ejecutar programas como administrador`,
    },
    {
      title: 'Descargar e Instalar RePvZ',
      icon: '🔧',
      content: `RePvZ es el framework de modding más estable para PvZ 1.

Pasos:
1. Descarga RePvZ desde el repositorio oficial de GitHub
   - Buscar "RePvZ framework PvZ modding"
2. Extrae los archivos en una carpeta
3. Copia mod_loader.dll en la carpeta principal de PvZ
   - Normalmente: C:\\Program Files\\Plants vs Zombies GOTY\\
4. Ejuta PlantsVsZombies.exe UNA VEZ para verificar que el loader se carga
   - Deberías ver un mensaje de consola o log

NOTA: Si usas Steam, el juego puede estar en:
  steamapps/common/Plants vs Zombies GOTY/`,
    },
    {
      title: 'Instalar el Mod',
      icon: '📂',
      content: `1. Copia la carpeta del mod en el directorio de PvZ:
   PvZ_BowlingNuts_AllyZombies/ → C:\\Program Files\\Plants vs Zombies GOTY\\

2. El mod_loader.dll debe estar configurado para cargar mod.json automáticamente.
   Esto se hace editando el archivo de configuración de RePvZ.

3. Verifica que la estructura de carpetas es correcta:
   - data/plants/ → Archivos JSON de plantas
   - data/allies/ → Archivos JSON de zombis aliados
   - data/levels/ → Archivos JSON de niveles
   - resources/IMAGES/ → Sprites
   - resources/SOUND/ → Sonidos
   - save/ → Guardado de progreso

4. Ejecuta el juego. Si todo funciona, verás un nuevo botón
   "Bowling Nuts & Allies" en el menú principal.`,
    },
    {
      title: 'Colocar Sprites (Placeholders)',
      icon: '🎨',
      content: `Los sprites deben colocarse en la carpeta resources/IMAGES/

Formato: Los sprites de PvZ usan formato .PTX comprimido.
Tienes dos opciones:

OPCIÓN A — Usar PNG convertidos (recomendado para empezar):
1. Usa ImagePak o PTX Editor para extraer los sprites originales
2. Edita los sprites (añade cinta verde a zombis aliados, etc.)
3. Reconvierte a formato PTX con la herramienta
4. Coloca en la carpeta correcta

OPCIÓN B — Usar sprites placeholder:
1. Crea imágenes PNG del tamaño correcto
2. El mod loader puede cargar PNG directamente si está configurado
3. Reemplaza gradualmente con arte final

Sprites requeridos:
- rolling_nut.png (40x40, animación de rotación)
- rolling_nut_red.png (44x44, efecto de brillo rojo)
- rolling_nut_giant.png (60x60, textura de roca)
- ally_*.png (varios, con cinta verde indicadora)
- seed_*.png (26x26, iconos para seed packets)`,
    },
    {
      title: 'Probar el Mod',
      icon: '🎮',
      content: `Pasos para verificar que todo funciona:

1. Abre PvZ con el mod cargado
2. Busca el botón "Bowling Nuts & Allies" en el menú
3. Entra en "Nivel 1: Prueba de Rodamiento"
4. Verifica que:
   - ✅ La Nuez Rodadora aparece en la barra de plantas
   - ✅ Puedes colocarla en el césped
   - ✅ Rueda por la fila
   - ✅ Golpea zombis al pasar
   - ✅ El progreso se guarda al completar

5. Verifica el guardado:
   - Abre save/mod_progress.json
   - Deberías ver "completedLevels": ["mod-plant-lvl-1"]

6. Si algo falla, revisa logs/mod_debug.log`,
    },
    {
      title: 'Posibles Errores y Soluciones',
      icon: '🐛',
      content: `ERROR: "mod_loader.dll no se carga"
SOLUCIÓN: Ejecuta como administrador. Verifica que RePvZ está instalado.

ERROR: "Las plantas no aparecen en la barra"
SOLUCIÓN: Verifica que los archivos JSON están en data/plants/ y tienen formato correcto.

ERROR: "El juego crashea al colocar una nuez rodadora"
SOLUCIÓN: Verifica que el sprite existe en resources/IMAGES/plants/. Un sprite faltante causa crash.

ERROR: "Los zombis aliados no se mueven"
SOLUCIÓN: Verifica que movement_speed > 0 en el JSON del aliado.

ERROR: "El progreso no se guarda"
SOLUCIÓN: Verifica permisos de escritura en la carpeta save/. Ejecuta como administrador.

ERROR: "Sprites se ven mal/corruptos"
SOLUCIÓN: Verifica que los archivos PTX fueron generados correctamente con la herramienta adecuada.

ERROR: "Conflicto con otro mod"
SOLUCIÓN: Los mods de PvZ no son compatibles entre sí fácilmente. Desactiva otros mods.`,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">📦 Guía de Instalación</h2>
        <p className="text-gray-400 text-sm">
          Instrucciones paso a paso para instalar el mod en PvZ 1 original de PC.
        </p>
      </div>

      {/* Step Navigator */}
      <div className="flex gap-2 flex-wrap">
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActiveStep(i)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeStep === i
                ? 'bg-pvz-green text-white scale-105'
                : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            {step.icon} {i + 1}. {step.title}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      <div className="bg-gray-800/60 rounded-2xl border border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-pvz-green-dark to-green-900 p-4">
          <h3 className="text-white font-bold text-lg">
            {steps[activeStep].icon} Paso {activeStep + 1}: {steps[activeStep].title}
          </h3>
        </div>
        <div className="p-6">
          <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">
            {steps[activeStep].content}
          </pre>
        </div>
        <div className="flex justify-between p-4 border-t border-gray-700">
          <button
            onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
            disabled={activeStep === 0}
            className="bg-gray-700 hover:bg-gray-600 disabled:opacity-30 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            ← Anterior
          </button>
          <button
            onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
            disabled={activeStep === steps.length - 1}
            className="bg-pvz-green hover:bg-pvz-green-light disabled:opacity-30 text-white px-4 py-2 rounded-lg text-sm transition-colors"
          >
            Siguiente →
          </button>
        </div>
      </div>

      {/* Tools list */}
      <div className="bg-gray-800/60 rounded-xl p-6 border border-gray-700">
        <h3 className="text-white font-bold mb-4">🛠️ Herramientas Necesarias</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { name: 'RePvZ', desc: 'Framework de modding principal', icon: '🔧' },
            { name: 'PTX Editor / ImagePak', desc: 'Extraer y reempaquetar sprites', icon: '🖼️' },
            { name: 'VS Code', desc: 'Editor de texto para JSON', icon: '📝' },
            { name: 'GIMP / Aseprite', desc: 'Editar sprites', icon: '🎨' },
            { name: 'PvZ GOTY Edition', desc: 'El juego base (v1.2.0.1073)', icon: '🌻' },
            { name: 'JSON Validator', desc: 'Validar archivos de configuración', icon: '✅' },
          ].map((tool, i) => (
            <div key={i} className="flex items-center gap-3 bg-black/20 rounded-lg p-3">
              <span className="text-2xl">{tool.icon}</span>
              <div>
                <div className="text-white font-bold text-sm">{tool.name}</div>
                <div className="text-gray-400 text-xs">{tool.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
