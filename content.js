// All the text of the page is in this file.
// Change the strings (the part inside quotes), don't rename the keys on the left.
// Everything visible should be in English.

const project = {
  name: "Star Chance"
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
  homeTitle: "Star Chance: daily health check for astronauts",
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
    value: "70",
    unit: "lpm",
    description: "The heart is a vital cardiovascular organ affected by weightlessness when about two liters of fluid shift to the upper body, making its monitoring crucial because cardiovascular disease and post-landing dizziness pose significant risks to astronaut health.",
    source: { name: "NASA cardiovascular and vision", url: "https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/" }
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
    value: "7-9",
    unit: "Hrs of sleep",
    description: "Rest is essential for maintaining a strong and healthy immune system. It helps the body recover, regenerate cells, produce immune cells, fight infections, and strengthen its natural defenses against viruses and bacteria.",
    source: { name: "NASA Immune System Research", url: "https://humanresearchroadmap.nasa.gov/risks/" }
  }
};

// RISKS: one entry per risk card. Only the Risks view uses this (it does NOT read zones).
// system: where the risk lives, one of "Skeletal", "Muscular", "Organs" or "Whole body"
// figure: the number with its unit, copied exactly from the source. If the source has no number, write "No figure in source".
// A risk can exist without a body zone, and a zone without a risk.
const risks = [
  {
    title: "Inadequate food and nutrition",
    system: "Whole body",
    figure: "200+ foods and beverages on the Space Station",
    description: "Meals must be nutritious, safe, long-lasting and varied. Poor nutrition can lower performance and cause illness on long missions.",
    source: { name: "NASA: Risk of Inadequate Food and Nutrition", url: "https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/" }
  },
  {
    title: "Inadequate sleep and irregular schedules",
    system: "Whole body",
    figure: "16 sunrises and sunsets per day",
    description: "Sleep loss, a disrupted body clock and work overload take a toll on health and performance. LED lighting that copies Earth's day and night helps.",
    source: { name: "NASA: Risk from Inadequate Sleep and Irregular Schedules", url: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/" }
  },
  {
    title: "Spaceflight-induced bone changes",
    system: "Skeletal",
    figure: "1% to 1.5% of density lost per month",
    description: "Bones weaken without gravity, mostly the spine and hips, and become more prone to fractures. Resistance exercise and bone scans before and after flight are the main tools.",
    source: { name: "NASA: Risk of Spaceflight-Induced Bone Changes", url: "https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/" }
  },
  {
    title: "Altered immune system responses",
    system: "Whole body",
    figure: "No figure in source",
    description: "Spaceflight stress can awaken dormant viruses, which can cause symptoms like cold sores and shingles. NASA studies blood, saliva and urine samples to find the triggers.",
    source: { name: "NASA: Risk of Altered Immune System Responses", url: "https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/" }
  }
  // Add the other risks here (muscles, heart, eyes, radiation).
  // Copy figures and links from the summary doc "Astronaut health: what NASA sources say".
];

// Every source we really used. No source, no data.
const sources = [
  { name: "NASA Human Research Roadmap: health risks", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  { name: "NASA Twins Study", url: "https://www.nasa.gov/humans-in-space/twins-study/" },
  { name: "NASA Open Science Data Repository", url: "https://osdr.nasa.gov/bio/" },
  { name: "NASA cardiovascular and vision", url: "https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/" },
  { name: "NASA: Risk of Spaceflight-Induced Bone Changes", url: "https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/" },
  { name: "NASA: Risk of Altered Immune System Responses", url: "https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/" },
  { name: "NASA: Risk of Inadequate Food and Nutrition", url: "https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/" },
  { name: "NASA: Risk from Inadequate Sleep and Irregular Schedules", url: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/" }
];

const statusLabels = { ok: "Normal", warning: "Attention", danger: "Critical" };