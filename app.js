/* =====================================================================
   APP.JS  ·  La lógica de la página. Computación puede mejorarla;
   los demás NO necesitan tocar este archivo.
   Qué hace:
     1) Escribe los textos de contenido.js en la página.
     2) Arma el menú, las tarjetas y la lista de fuentes.
     3) Al tocar una zona del cuerpo, muestra su información en el panel.
   ===================================================================== */

// 1) Textos: cada elemento con data-texto="clave" recibe TEXTOS[clave]
document.querySelectorAll("[data-texto]").forEach((el) => {
  const clave = el.dataset.texto;
  if (TEXTOS[clave] !== undefined) el.textContent = TEXTOS[clave];
});
document.title = PROYECTO.nombre;

// 2a) Menú
const menu = document.getElementById("menu");
SECCIONES.forEach((s) => {
  const a = document.createElement("a");
  a.href = "#" + s.id;
  a.textContent = s.texto;
  menu.appendChild(a);
});

// Etiqueta de estado (texto + color)
function etiquetaEstado(estado) {
  const span = document.createElement("span");
  span.className = "estado estado--" + estado;
  span.textContent = ETIQUETAS_ESTADO[estado] || estado;
  return span;
}

// Enlace de fuente
function enlaceFuente(f) {
  const a = document.createElement("a");
  a.href = f.url;
  a.target = "_blank";
  a.rel = "noopener";
  a.textContent = f.texto;
  return a;
}

// 2b) Tarjetas de riesgos (una por zona)
const tarjetas = document.getElementById("tarjetas");
Object.values(ZONAS).forEach((z) => {
  const t = document.createElement("article");
  t.className = "tarjeta";
  const h = document.createElement("h3");
  h.textContent = z.titulo;
  const p = document.createElement("p");
  p.textContent = z.explicacion;
  t.append(h, etiquetaEstado(z.estado), p);
  tarjetas.appendChild(t);
});

// 2c) Fuentes
const listaFuentes = document.getElementById("listaFuentes");
FUENTES.forEach((f) => {
  const li = document.createElement("li");
  li.appendChild(enlaceFuente(f));
  listaFuentes.appendChild(li);
});

// 3) Clic en una zona del cuerpo -> panel
const panel = document.getElementById("panel");

function mostrarZona(id) {
  const z = ZONAS[id];
  if (!z) return;

  document.querySelectorAll(".zona").forEach((g) =>
    g.classList.toggle("activa", g.dataset.zona === id)
  );

  const h = document.createElement("h3");
  h.textContent = z.titulo;
  const dato = document.createElement("p");
  dato.className = "panel__dato";
  dato.textContent = z.dato + " " + z.unidad;
  const expl = document.createElement("p");
  expl.textContent = z.explicacion;
  const fuente = document.createElement("p");
  fuente.className = "panel__fuente";
  fuente.append("Source: ", enlaceFuente(z.fuente));

  panel.replaceChildren(h, etiquetaEstado(z.estado), dato, expl, fuente);
}

document.querySelectorAll(".zona").forEach((g) => {
  g.addEventListener("click", () => mostrarZona(g.dataset.zona));
  g.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      mostrarZona(g.dataset.zona);
    }
  });
});
