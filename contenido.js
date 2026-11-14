/* =====================================================================
   CONTENIDO.JS  ·  Aquí se cambian TODOS los textos de la página.
   Cambien solo lo que está entre "comillas". No borren las comas.
   Todo el texto visible va en INGLÉS (la demo del reto es en inglés).
   ===================================================================== */

/* ---------- 1. DATOS DEL PROYECTO ---------- */
const PROYECTO = {
  nombre: "Star Chance",                 // CAMBIAR: nombre del proyecto
};

/* ---------- 2. MENÚ (máximo 5 secciones) ----------
   "id" tiene que coincidir con el id de la sección en index.html. */
const SECCIONES = [
  { id: "inicio",  texto: "Home" },
  { id: "mapa",    texto: "Body map" },
  { id: "riesgos", texto: "Risks" },
  { id: "fuentes", texto: "Sources" },
];

/* ---------- 3. TEXTOS DE LA PÁGINA ----------
   La palabra de la izquierda NO se cambia (la usa index.html).
   Cambien el texto de la derecha. */
const TEXTOS = {
  nombre:         PROYECTO.nombre,
  titulo:         "Star Chance: daily health check for astronauts",       // CAMBIAR
  frase:          "Our project helps astronauts to check their health using data obtained from the astronauts bodies to improve their well-being.", // CAMBIAR: la frase del proyecto
  botonInicio:    "Explore the body map",

  tituloMapa:     "Body map",
  introMapa:      "Tap a body zone to see its status and what it means.",    // CAMBIAR
  panelVacio:     "Select a zone on the body to see its details.",

  tituloRiesgos:  "Health risks in long missions",                           // CAMBIAR
  introRiesgos:   "Each risk comes from a cited source.",                    // CAMBIAR

  tituloFuentes:  "Sources",

  aviso:          "Simulated data · Not medical advice · Sources listed above", // NO quitar
};

/* ---------- 4. ZONAS DEL CUERPO ----------
   Cada zona = una parte del cuerpo con su información.
   El nombre de la zona (corazon, huesos, defensas) debe ser IGUAL al
   data-zona del dibujo en index.html.
   estado: "ok" (normal) | "alerta" (atención) | "peligro" (crítico)
   Datos de biológicas: copien el número y la unidad EXACTOS de la fuente. */
const ZONAS = {
  corazon: {
    titulo: "Heart",                                  // CAMBIAR
    estado: "ok",
    dato: "[simulated value]",                        // CAMBIAR: valor (simulado)
    unidad: "[unit]",                                 // CAMBIAR: unidad
    explicacion: "[Explain in one or two short sentences what this zone is and why it matters.]",
    fuente: { texto: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  },
  huesos: {
    titulo: "Bones",
    estado: "alerta",
    dato: "[simulated value]",
    unidad: "[unit]",
    explicacion: "[Explain in one or two short sentences.]",
    fuente: { texto: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  },
  defensas: {
    titulo: "Immune system",
    estado: "ok",
    dato: "[simulated value]",
    unidad: "[unit]",
    explicacion: "[Explain in one or two short sentences.]",
    fuente: { texto: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  },
  // Para agregar una zona, copien un bloque completo (con su coma al final)
  // y agreguen su <g data-zona="..."> en el dibujo de index.html. Máximo 6.
};

/* ---------- 5. FUENTES ----------
   Una línea por fuente usada. Sin fuente, el dato no entra. */
const FUENTES = [
  { texto: "NASA Human Research Roadmap: health risks", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  { texto: "NASA Twins Study",                           url: "https://www.nasa.gov/humans-in-space/twins-study/" },
  { texto: "NASA Open Science Data Repository",          url: "https://osdr.nasa.gov/bio/" },
  // { texto: "[Otra fuente]", url: "https://..." },
];

/* Texto que se muestra en la etiqueta de cada estado (también se puede traducir) */
const ETIQUETAS_ESTADO = { ok: "Normal", alerta: "Attention", peligro: "Critical" };
