// All the text of the page is in this file.
// Change the strings (the part inside quotes), don't rename the keys on the left.
// Everything visible should be in English.

const project = {
  name: "[Project name]"
};

const texts = {
  name: project.name,
  tagline: "your health kit for long missions",
  notice: "Simulated data \u00b7 Not medical advice \u00b7 Sources listed in the Sources tab",

  // bottom menu, one word each
  menuHome: "Home",
  menuBody: "Body",
  menuRisks: "Risks",
  menuSources: "Sources",

  homeEyebrow: "Mission health kit",
  homeTitle: "[Project name]: daily health check for astronauts",
  homeText: "Our project helps [user] to [do what] using [data] to [benefit].",
  homeButton: "Explore the body map",

  bodyEyebrow: "Body scan",
  bodyTitle: "Body map",
  bodyText: "Tap a body zone to see its status and what it means.",
  panelEmpty: "Select a zone on the body to see its details.",

  risksEyebrow: "Health risks",
  risksTitle: "Health risks in long missions",
  risksText: "Each risk comes from a cited source.",

  sourcesEyebrow: "Data sources",
  sourcesTitle: "Sources"
};

// One entry per body part (max 6).
// The name (heart, bones, immune) has to match data-zone in the svg inside index.html.
// status: "ok", "warning" or "danger"
// value / unit: copy them exactly from the source. If the data is made up, say it's simulated.
const zones = {
  heart: {
    title: "Heart",
    status: "ok",
    value: "[simulated value]",
    unit: "[unit]",
    description: "[One or two short sentences: what this zone is and why it matters.]",
    source: { name: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" }
  },
  bones: {
    title: "Bones",
    status: "warning",
    value: "[simulated value]",
    unit: "[unit]",
    description: "[One or two short sentences.]",
    source: { name: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" }
  },
  immune: {
    title: "Immune system",
    status: "ok",
    value: "[simulated value]",
    unit: "[unit]",
    description: "[One or two short sentences.]",
    source: { name: "[Source name]", url: "https://humanresearchroadmap.nasa.gov/risks/" }
  }
};

// Every source we really used. No source, no data.
const sources = [
  { name: "NASA Human Research Roadmap: health risks", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  { name: "NASA Twins Study", url: "https://www.nasa.gov/humans-in-space/twins-study/" },
  { name: "NASA Open Science Data Repository", url: "https://osdr.nasa.gov/bio/" }
];

const statusLabels = { ok: "Normal", warning: "Attention", danger: "Critical" };
