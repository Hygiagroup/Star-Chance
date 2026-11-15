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
  menuCheckin: "Check-in",
  menuRisks: "Risks",
  menuSources: "Sources",

  homeEyebrow: "Mission health kit",
  homeTitle: "Star Chance: daily health check for astronauts",
  homeText: "Our project helps astronauts check their health using data from their own bodies to improve their well-being.",
  homeButton: "Explore the body map",

  bodyEyebrow: "Body scan",
  bodyTitle: "Body map",
  bodyText: "Pick a layer, then tap a body part to see its status and what it means.",
  bodyWhole: "Whole body:",
  panelEmpty: "Select a zone on the body to see its details.",

  checkinEyebrow: "Daily check-in",
  checkinTitle: "Vital signs check-in",
  checkinText: "One reading at a time. The result is a summary, not a diagnosis.",
  checkinTry: "Demo:",
  stepBack: "Back",
  stepNext: "Next",
  stepFinish: "See summary",
  stepStartOver: "Start over",
  summaryMeaning: "What this means",
  reportOpen: "Prepare report for the flight surgeon",

  reportTitle: "Report for the flight surgeon",
  reportText: "Share what is happening with the person who follows the crew's health.",
  reportCopy: "Copy report",
  reportSend: "Send to flight surgeon (simulated)",
  reportUrgent: "Send urgent report (simulated)",

  risksEyebrow: "Health risks",
  risksTitle: "Health risks in long missions",
  risksText: "Each risk comes from a cited source.",

  sourcesEyebrow: "Data sources",
  sourcesTitle: "Sources"
};

// BODY MAP: layers and zones. Only the body map uses this.
// layers: the three drawings (img/bones.svg, img/muscles.svg, img/organs.svg). The key matches the layer in index.html.
const layers = { skeletal: "Skeletal", muscular: "Muscular", organs: "Organs" };

// One entry per body part. Only the body map uses this.
// The name (heart, bones, ...) has to match data-zone in the svg inside index.html.
// layer: "skeletal", "muscular" or "organs" (a part of that drawing) or "whole" (shown in the Whole body buttons).
// status (optional): "ok", "warning" or "danger". Leave it out if the source gives no status.
// value / unit: copy them exactly from the source. If the data is made up, add simulated: true.
const zones = {
  heart: {
    layer: "organs",
    title: "Heart",
    value: " ",
    unit: "Fluids shift to the head; dizziness after landing",
    simulated: false,  // shows a "simulated" tag next to the value in the panel
    description: "The heart is a vital cardiovascular organ affected by weightlessness when about two liters of fluid shift to the upper body, making its monitoring crucial because cardiovascular disease and post-landing dizziness pose significant risks to astronaut health.",
    source: { name: "NASA cardiovascular and vision", url: "https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/" }
  },
  kidneys: {
    layer: "organs",
    title: "Kidneys",
    value: "2+ liters of urine",
    unit: "per day",
    description: "Spaceflight raises the risk of kidney stones. Stones have been found in astronauts after landing and in one cosmonaut during flight. Bone loss is a major contributor.",
    source: { name: "NASA: Evidence Report, Risk of Renal Stone Formation", url: "https://ntrs.nasa.gov/citations/20170004709" }
  },
  eyes: {
    layer: "organs",
    title: "Eyes and brain (SANS)",
    value: "70",
    unit: "% of Space Station astronauts with swelling at the back of the eye",
    description: "In weightlessness, fluids shift toward the head. This can swell the back of the eye and the optic nerve (SANS). The long-term effects are still under study.",
    source: { name: "NASA: Risk of Spaceflight Associated Neuro-ocular Syndrome", url: "https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans" }
  },
  bones: {
    layer: "skeletal",
    title: "Bones",
    status: "warning",
    value: "1 to 1.5",
    unit: "% of density lost per month (4 to 6-month missions)",
    description: "Without gravity, bones lose density, most in the weight-bearing ones like the spine and hips. This can lead to fractures and early-onset osteoporosis.",
    source: { name: "NASA: Risk of Spaceflight-Induced Bone Changes", url: "https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/" }
  },
  muscles: {
    layer: "muscular",
    title: "Muscles",
    value: "0% to 30% decline in physical tests",
    description: "Weightlessness makes muscles lose size, strength and endurance. Crew who follow the exercise schedule return with minimal losses on average.",
    source: { name: "NASA: Muscle Risk", url: "https://www.nasa.gov/directorates/esdmd/hhp/risk-of-impaired-performance-due-to-reduced-muscle-size-strength-and-endurance/" }
  },
  immune: {
    layer: "whole",
    title: "Immune system",
    status: "ok",
    value: "7-9",
    unit: "Hrs of sleep",
    description: "Rest is essential for maintaining a strong and healthy immune system. It helps the body recover, regenerate cells, produce immune cells, fight infections, and strengthen its natural defenses against viruses and bacteria.",
    source: { name: "NASA Immune System Research", url: "https://humanresearchroadmap.nasa.gov/risks/" }
  },
  nutrition: {
    layer: "whole",
    title: "Nutrition",
    value: "200+",
    unit: "foods and beverages on the Space Station",
    description: "Meals must be nutritious, safe, long-lasting and varied. Poor nutrition can lower performance and cause illness on long missions.",
    source: { name: "NASA: Risk of Inadequate Food and Nutrition", url: "https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/" }
  },
  sleep: {
    layer: "whole",
    title: "Sleep",
    value: "16",
    unit: "sunrises and sunsets per day",
    description: "Sleep loss, a disrupted body clock and work overload take a toll on health and performance. LED lighting that copies Earth's day and night helps.",
    source: { name: "NASA: Risk from Inadequate Sleep and Irregular Schedules", url: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/" }
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
  },
  {
    title: "Cardiovascular adaptations",
    system: "Organs",
    figure: "More than 60% of astronauts can faint after landing without countermeasures",
    description: "About 2 liters of fluid move from the lower to the upper body in weightlessness and total blood volume drops. Many crew members feel faint when they return to Earth. Compression garments and fluid loading help.",
    source: { name: "NASA cardiovascular and vision", url: "https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/" }
  },
  {
    title: "Spaceflight Associated Neuro-ocular Syndrome (SANS)",
    system: "Organs",
    figure: "About 70% of Space Station astronauts with swelling at the back of the eye",
    description: "Fluid shifting toward the head changes the eyes, including optic nerve swelling. The risk is higher on longer missions, and the long-term outcome is still under study.",
    source: { name: "NASA: Risk of Spaceflight Associated Neuro-ocular Syndrome (SANS)", url: "https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans" }
  }
  // Add the other risks here (muscles, radiation).
  // Copy figures and links from the summary doc "Astronaut health: what NASA sources say".
];

// CHECK-IN: one entry per vital sign. Only the Check-in view uses this.
// The limits come from the cited source. If a source gives no number, we do not invent one.
// fields: what the person types (start = value after the first tap on +, meter = scale and green zone of the bar).
// short: the reference shown on the tile. messages: the text shown for each status.
// related: shown only when the reading is outside the reference range.
const vitals = [
  {
    id: "pulse",
    name: "Resting heart rate",
    fields: [{ id: "pulse", label: "Heart rate", unit: "bpm", min: 20, max: 220, step: 1, start: 72, meter: { min: 40, max: 140, from: 60, to: 100 } }],
    short: "Normal: 60 to 100",
    reference: "Normal at rest: 60 to 100 beats per minute",
    limits: { low: 60, high: 100 },
    messages: {
      ok: "Within the normal resting range.",
      warning: "Outside the normal resting range. A rate that is often outside it is worth talking about with a doctor, especially with dizziness, fainting or shortness of breath."
    },
    related: { text: "NASA lists cardiovascular adaptations as a spaceflight risk.", source: { name: "NASA risks list", url: "https://www.nasa.gov/hrp/risks/" } },
    source: { name: "Mayo Clinic: Heart rate", url: "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/heart-rate" }
  },
  {
    id: "temp",
    name: "Body temperature",
    fields: [{ id: "temp", label: "Temperature", unit: "\u00b0C", min: 33, max: 42, step: 0.1, start: 36.6, meter: { min: 35, max: 40, from: 35, to: 38 } }],
    short: "Fever: 38 \u00b0C or higher",
    reference: "Fever: 38 \u00b0C or higher (oral). Typical range: 36.1 to 37.2 \u00b0C",
    limits: { fever: 38 },
    messages: {
      ok: "Below the fever threshold.",
      warning: "This is a fever. Seek medical care if it comes with trouble breathing, chest pain, a bad headache, a stiff neck or confusion."
    },
    related: { text: "NASA says spaceflight stress can awaken dormant viruses.", source: { name: "NASA: Altered Immune System Responses", url: "https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/" } },
    source: { name: "Mayo Clinic: Fever first aid", url: "https://www.mayoclinic.org/first-aid/first-aid-fever/basics/art-20056685" }
  },
  {
    id: "bp",
    name: "Blood pressure",
    fields: [
      { id: "sys", label: "Systolic (top)", unit: "mmHg", min: 50, max: 260, step: 1, start: 118, meter: { min: 80, max: 200, from: 80, to: 120 } },
      { id: "dia", label: "Diastolic (bottom)", unit: "mmHg", min: 30, max: 160, step: 1, start: 76, meter: { min: 40, max: 130, from: 40, to: 80 } }
    ],
    short: "Normal: under 120 / 80",
    reference: "Normal: under 120 / 80 mmHg. Unusually low readings should also be evaluated by a professional.",
    // American Heart Association categories
    limits: { elevatedSys: 120, stage1Sys: 130, stage1Dia: 80, stage2Sys: 140, stage2Dia: 90, crisisSys: 180, crisisDia: 120 },
    messages: {
      ok: "Normal blood pressure category.",
      warning: "Above the normal category. Repeat the reading after resting and share it with a doctor.",
      danger: "In the hypertensive crisis range. Seek medical help right away."
    },
    related: { text: "NASA lists cardiovascular adaptations as a spaceflight risk.", source: { name: "NASA risks list", url: "https://www.nasa.gov/hrp/risks/" } },
    source: { name: "American Heart Association: Understanding Blood Pressure Readings", url: "https://www.heart.org/bplevels" }
  },
  {
    id: "sleep",
    name: "Sleep last night",
    fields: [{ id: "sleep", label: "Hours slept", unit: "hours", min: 0, max: 16, step: 0.1, start: 7, meter: { min: 0, max: 12, from: 7, to: 12 } }],
    short: "Adults need 7 or more",
    reference: "Adults need 7 or more hours a night",
    limits: { min: 7 },
    messages: {
      ok: "Enough sleep for an adult.",
      warning: "Less than 7 hours. Regularly sleeping under 7 hours is linked with poor health outcomes."
    },
    related: { text: "NASA lists sleep loss and irregular schedules as a spaceflight risk.", source: { name: "NASA: Inadequate Sleep and Irregular Schedules", url: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/" } },
    source: { name: "Mayo Clinic: How many hours of sleep are enough?", url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/expert-answers/how-many-hours-of-sleep-are-enough/faq-20057898" }
  }
];

// Simulated days for the demo buttons (made up, not real data). Add or remove entries freely.
const scenarios = {
  normal:    { label: "Normal", values: { pulse: 72, sys: 112, dia: 72, temp: 36.6, sleep: 7.8 } },
  attention: { label: "Needs attention", values: { pulse: 104, sys: 132, dia: 84, temp: 37.1, sleep: 5.5 } },
  urgent:    { label: "Urgent", values: { pulse: 118, sys: 186, dia: 122, temp: 38.4, sleep: 3 } }
};

// Text of the summary. {n} is replaced with the number of readings outside the range.
const summaryTitles = { ok: "All in range", warning: "Needs attention", danger: "Urgent" };

const summaryTexts = {
  ok: "Every reading is inside its reference range. Check in again tomorrow.",
  warning: "{n} reading(s) outside the reference range. Consider sharing a report with the flight surgeon.",
  danger: "A reading is in a range that needs medical help right away. Send the report now.",
  none: "Add a reading to see your summary.",
  note: "Made by comparing your numbers with cited ranges. Not a diagnosis."
};

// Who receives the report (role description from NASA)
const surgeon = {
  title: "Who follows the crew's health?",
  text: "In Mission Control Houston, the flight surgeon monitors the crew's medical status. A biomedical engineer (BME) handles medical, exercise and radiation equipment. The flight surgeon also holds weekly 15-minute private medical conferences with each astronaut about sleep, eating and well-being.",
  source: { name: "NASA: Mission Control crew health consoles", url: "https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles" }
};

// Every source we really used. No source, no data.
const sources = [
  { name: "NASA Human Research Roadmap: health risks", url: "https://humanresearchroadmap.nasa.gov/risks/" },
  { name: "NASA Twins Study", url: "https://www.nasa.gov/humans-in-space/twins-study/" },
  { name: "NASA Open Science Data Repository", url: "https://osdr.nasa.gov/bio/" },
  { name: "NASA cardiovascular and vision", url: "https://www.nasa.gov/directorates/esdmd/hhp/cardiovascular-and-vision/" },
  { name: "NASA: Risk of Spaceflight-Induced Bone Changes", url: "https://www.nasa.gov/reference/risk-of-spaceflight-induced-bone-changes/" },
  { name: "NASA: Risk of Altered Immune System Responses", url: "https://www.nasa.gov/reference/risk-of-altered-immune-system-responses/" },
  { name: "NASA: Risk of Inadequate Food and Nutrition", url: "https://www.nasa.gov/reference/risk-of-inadequate-food-and-nutrition/" },
  { name: "NASA: Risk from Inadequate Sleep and Irregular Schedules", url: "https://www.nasa.gov/reference/risk-from-inadequate-sleep-and-irregular-schedules/" },
  { name: "NASA: Risk of Spaceflight Associated Neuro-ocular Syndrome", url: "https://www.nasa.gov/reference/risk-of-spaceflight-associated-neuro-ocular-syndrome-sans" },
  { name: "NASA: Muscle Risk", url: "https://www.nasa.gov/directorates/esdmd/hhp/risk-of-impaired-performance-due-to-reduced-muscle-size-strength-and-endurance/" },
  { name: "NASA: Evidence Report, Risk of Renal Stone Formation", url: "https://ntrs.nasa.gov/citations/20170004709" },
  { name: "NASA: Human Research Program risks list", url: "https://www.nasa.gov/hrp/risks/" },
  { name: "NASA: Mission Control crew health consoles", url: "https://www.nasa.gov/podcasts/houston-we-have-a-podcast/mission-control-crew-health-consoles" },
  { name: "Mayo Clinic: Heart rate", url: "https://www.mayoclinic.org/healthy-lifestyle/fitness/expert-answers/heart-rate" },
  { name: "American Heart Association: Understanding Blood Pressure Readings", url: "https://www.heart.org/bplevels" },
  { name: "Mayo Clinic: Fever first aid", url: "https://www.mayoclinic.org/first-aid/first-aid-fever/basics/art-20056685" },
  { name: "Mayo Clinic: How many hours of sleep are enough?", url: "https://www.mayoclinic.org/healthy-lifestyle/adult-health/expert-answers/how-many-hours-of-sleep-are-enough/faq-20057898" }
];

const statusLabels = { ok: "Normal", warning: "Attention", danger: "Critical" };
