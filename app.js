// puts the text from content.js into the page and handles the menu + body map

// texts
document.querySelectorAll("[data-text]").forEach(function (el) {
  var key = el.dataset.text;
  if (texts[key] !== undefined) {
    el.textContent = texts[key];
  }
});
document.title = project.name;

// menu: only one view is visible at a time
var tabs = document.querySelectorAll(".tab");

function showView(name) {
  if (!document.getElementById("view-" + name)) {
    name = tabs[0].dataset.go;
  }
  tabs.forEach(function (tab) {
    var view = document.getElementById("view-" + tab.dataset.go);
    if (view) view.hidden = tab.dataset.go !== name;
    tab.classList.toggle("active", tab.dataset.go === name);
  });
  window.scrollTo(0, 0);
}

document.querySelectorAll("[data-go]").forEach(function (el) {
  el.addEventListener("click", function () {
    showView(el.dataset.go);
  });
});

// helpers
function badge(status) {
  return '<span class="badge badge-' + status + '">' + (statusLabels[status] || status) + "</span>";
}

function sourceLink(s) {
  if (!s.url) return s.name;  // a reference without a link is shown as plain text
  return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.name + "</a>";
}

// risk cards (one per entry in risks, not related to the body zones)
var cards = document.getElementById("cards");
risks.forEach(function (r) {
  cards.innerHTML +=
    '<article class="card">' +
    '<div class="card-head">' +
    '<img class="card-icon" src="img/icon-' + r.system.toLowerCase().replace(" ", "-") + '.png" alt="" onerror="this.remove()">' +
    '<span class="tag">' + r.system + "</span></div>" +
    "<h3>" + r.title + "</h3>" +
    '<p class="card-figure">' + r.figure + "</p>" +
    "<p>" + r.description + "</p>" +
    '<p class="card-source">Source: ' + sourceLink(r.source) + "</p>" +
    "</article>";
});

// sources list
var sourceList = document.getElementById("source-list");
sources.forEach(function (s) {
  sourceList.innerHTML += "<li>" + sourceLink(s) + "</li>";
});

// body map: pick a layer, click a zone and show its info in the panel
var panel = document.getElementById("panel");
var bodyZones = document.querySelectorAll(".zone");
var layerNames = Object.keys(layers);
var layerTabs = document.getElementById("layer-tabs");

layerTabs.innerHTML = layerNames.map(function (name) {
  return '<button type="button" class="layer-tab" data-layer="' + name + '">' + layers[name] + "</button>";
}).join("");

// "Whole body" buttons: zones that do not live in one place
document.getElementById("whole").innerHTML = Object.keys(zones).filter(function (id) {
  return zones[id].layer === "whole";
}).map(function (id) {
  return '<button type="button" class="chip" data-zone-chip="' + id + '">' + zones[id].title + "</button>";
}).join("");

// shows one layer and hides the others (drawing and zones)
function showLayer(name) {
  layerNames.forEach(function (n) {
    document.getElementById("layer-" + n).classList.toggle("is-off", n !== name);
  });
  document.querySelectorAll(".zones").forEach(function (g) {
    g.classList.toggle("is-off", g.dataset.layer !== name);
  });
  layerTabs.querySelectorAll(".layer-tab").forEach(function (b) {
    b.classList.toggle("active", b.dataset.layer === name);
  });
}

layerTabs.addEventListener("click", function (e) {
  var b = e.target.closest(".layer-tab");
  if (b) showLayer(b.dataset.layer);
});

function showZone(id) {
  var z = zones[id];
  if (!z) return;

  bodyZones.forEach(function (g) {
    g.classList.toggle("active", g.dataset.zone === id);
  });
  document.querySelectorAll("[data-zone-chip]").forEach(function (b) {
    b.classList.toggle("active", b.dataset.zoneChip === id);
  });

  panel.innerHTML =
    "<h3>" + z.title + "</h3>" +
    (z.status ? badge(z.status) : "") +
    (z.value ? '<p class="panel-value">' + z.value + " " + z.unit +
      (z.simulated ? ' <span class="panel-sim">simulated</span>' : "") + "</p>" : "") +
    "<p>" + z.description + "</p>" +
    '<p class="panel-source">Source: ' + sourceLink(z.source) + "</p>";

  // on a phone the panel is below the body: bring it into view
  if (window.innerWidth <= 640) panel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

bodyZones.forEach(function (g) {
  g.addEventListener("click", function () {
    showZone(g.dataset.zone);
  });
  g.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      showZone(g.dataset.zone);
    }
  });
});

document.getElementById("whole").addEventListener("click", function (e) {
  var b = e.target.closest("[data-zone-chip]");
  if (b) showZone(b.dataset.zoneChip);
});

showLayer("organs");

// check-in: one vital sign per step, then a summary and a report for the flight surgeon
var stepsBar = document.getElementById("steps");
var panels = document.getElementById("panels");
var step = 0;            // 0 to vitals.length - 1 are the vital signs, vitals.length is the summary
var scenarioUsed = "";   // label of the simulated day, empty when the user typed the numbers
var lastCheckin = null;
var summaryStep = vitals.length;

// position (0 to 100) of a number on the bar of a field
function meterPct(f, x) {
  return Math.max(0, Math.min(100, (x - f.meter.min) / (f.meter.max - f.meter.min) * 100));
}

function fieldHTML(f) {
  var from = meterPct(f, f.meter.from);
  var to = meterPct(f, f.meter.to);
  return '<div class="reading">' +
    '<span class="reading-label">' + f.label + "</span>" +
    '<div class="stepper">' +
    '<button type="button" class="step" data-field="' + f.id + '" data-dir="-1" aria-label="Decrease ' + f.label + '">−</button>' +
    '<input type="number" inputmode="decimal" id="f-' + f.id + '" placeholder="—" min="' + f.min +
    '" max="' + f.max + '" step="' + f.step + '" aria-label="' + f.label + '">' +
    '<button type="button" class="step" data-field="' + f.id + '" data-dir="1" aria-label="Increase ' + f.label + '">+</button>' +
    "</div>" +
    '<span class="reading-unit">' + f.unit + "</span>" +
    '<div class="meter" data-field="' + f.id + '"><span class="meter-zone" style="left:' + from + "%;width:" + (to - from) + '%"></span>' +
    '<span class="meter-dot" id="dot-' + f.id + '" hidden></span></div>' +
    "</div>";
}

// progress bar: one segment per vital sign + one for the summary
stepsBar.innerHTML = vitals.map(function (v, i) {
  return '<button type="button" class="seg" data-step="' + i + '" aria-label="' + v.name + '"></button>';
}).join("") + '<button type="button" class="seg" data-step="' + summaryStep + '" aria-label="Summary"></button>';

// one card per vital sign
var cardsHTML = vitals.map(function (v, i) {
  var shortSource = { name: v.source.name.split(":")[0], url: v.source.url };
  var last = i === vitals.length - 1;
  return '<div class="step-card" id="card-' + i + '" hidden>' +
    '<p class="step-count">Step ' + (i + 1) + " of " + vitals.length + "</p>" +
    "<h3>" + v.name + "</h3>" +
    '<div class="readings">' + v.fields.map(fieldHTML).join("") + "</div>" +
    '<p class="step-status"><span class="badge badge-na" id="badge-' + v.id + '">No reading</span> <span>' + v.short + "</span></p>" +
    '<p class="step-source">Source: ' + sourceLink(shortSource) + "</p>" +
    '<div class="step-nav">' +
    '<button type="button" class="btn btn-light" data-nav="-1"' + (i === 0 ? " hidden" : "") + ">" + texts.stepBack + "</button>" +
    '<button type="button" class="btn" data-nav="1">' + (last ? texts.stepFinish : texts.stepNext) + "</button>" +
    "</div></div>";
}).join("");

// the summary card (filled by renderSummary) and the report
cardsHTML += '<div class="step-card step-summary" id="card-' + summaryStep + '" hidden>' +
  '<div id="summary-body"></div>' +
  '<div class="report" id="report" hidden>' +
  '<h3>' + texts.reportTitle + "</h3>" +
  '<p class="report-who" id="report-who"></p>' +
  '<textarea id="report-text" readonly rows="14"></textarea>' +
  '<div class="form-actions">' +
  '<button class="btn btn-light" type="button" id="copy-report">' + texts.reportCopy + "</button>" +
  '<button class="btn" type="button" id="send-report">' + texts.reportSend + "</button>" +
  "</div>" +
  '<p class="report-status" id="report-status" aria-live="polite"></p>' +
  "</div></div>";
panels.innerHTML = cardsHTML;

var reportBox = document.getElementById("report");
var reportText = document.getElementById("report-text");
var reportStatus = document.getElementById("report-status");
var sendButton = document.getElementById("send-report");

document.getElementById("scenarios").innerHTML = Object.keys(scenarios).map(function (k) {
  return '<button type="button" class="chip" data-scenario="' + k + '">' + scenarios[k].label + "</button>";
}).join("");

function allFields() {
  var list = [];
  vitals.forEach(function (v) { v.fields.forEach(function (f) { list.push(f); }); });
  return list;
}

// a number outside min and max counts as "not filled in"
function readField(f) {
  var raw = document.getElementById("f-" + f.id).value;
  if (raw === "") return NaN;
  var x = parseFloat(raw);
  return (x >= f.min && x <= f.max) ? x : NaN;
}

function isInvalid(f) {
  return document.getElementById("f-" + f.id).value !== "" && !isFinite(readField(f));
}

// returns { vital, status, detail, reading } or null if the vital is not filled in
function evaluateVital(v) {
  var vals = {};
  v.fields.forEach(function (f) { vals[f.id] = readField(f); });
  var filled = v.fields.every(function (f) { return isFinite(vals[f.id]); });
  if (!filled) return null;

  var l = v.limits;
  var status = "ok";
  var detail = "";

  if (v.id === "pulse") {
    if (vals.pulse < l.low || vals.pulse > l.high) status = "warning";
  } else if (v.id === "bp") {
    var s = vals.sys, d = vals.dia;
    if (s > l.crisisSys || d > l.crisisDia) { status = "danger"; detail = "Hypertensive crisis"; }
    else if (s >= l.stage2Sys || d >= l.stage2Dia) { status = "warning"; detail = "Stage 2 hypertension"; }
    else if (s >= l.stage1Sys || d >= l.stage1Dia) { status = "warning"; detail = "Stage 1 hypertension"; }
    else if (s >= l.elevatedSys) { status = "warning"; detail = "Elevated"; }
    else { detail = "Normal"; }
  } else if (v.id === "temp") {
    if (vals.temp < l.hypo) { status = "warning"; detail = "Low body temperature (hypothermia range)"; }
    else if (vals.temp >= l.fever) { status = "warning"; detail = "Fever"; }
  } else if (v.id === "sleep") {
    if (vals.sleep < l.min) status = "warning";
  }

  var reading = v.fields.map(function (f) { return vals[f.id]; }).join(" / ") + " " + v.fields[0].unit;
  return { vital: v, status: status, detail: detail, reading: reading };
}

var severity = { ok: 0, warning: 1, danger: 2 };

// "na" = no reading, "invalid" = number outside the allowed range, or ok / warning / danger
function stateOf(v, r) {
  if (v.fields.some(isInvalid)) return "invalid";
  return r ? r.status : "na";
}

// updates badges, bars and the progress segments from the numbers in the inputs
function refresh() {
  var results = [];

  vitals.forEach(function (v, i) {
    var r = evaluateVital(v);
    var state = stateOf(v, r);
    if (r) results.push(r);

    var b = document.getElementById("badge-" + v.id);
    b.className = "badge badge-" + (state === "invalid" ? "warning" : state);
    b.textContent = state === "invalid" ? "Check value" : (state === "na" ? "No reading" : statusLabels[state]);

    stepsBar.children[i].className = "seg seg--" + state + (i === step ? " current" : "");

    v.fields.forEach(function (f) {
      var dot = document.getElementById("dot-" + f.id);
      var x = readField(f);
      dot.hidden = !isFinite(x);
      if (isFinite(x)) {
        dot.style.left = meterPct(f, x) + "%";
        dot.className = "meter-dot meter-dot--" + state;
      }
    });
  });
  stepsBar.children[summaryStep].className = "seg" + (step === summaryStep ? " current" : "");

  var overall = "ok";
  var outside = results.filter(function (r) { return r.status !== "ok"; });
  results.forEach(function (r) {
    if (severity[r.status] > severity[overall]) overall = r.status;
  });
  lastCheckin = results.length ? { results: results, overall: overall, outside: outside } : null;
}

function showStep(n) {
  step = Math.max(0, Math.min(summaryStep, n));
  for (var i = 0; i <= summaryStep; i++) {
    document.getElementById("card-" + i).hidden = i !== step;
  }
  if (step === summaryStep) renderSummary();
  refresh();
}

function renderSummary() {
  refresh();
  var body = document.getElementById("summary-body");
  var r = lastCheckin;

  if (!r) {
    body.innerHTML = '<p class="summary-empty">' + summaryTexts.none + "</p>" +
      '<button type="button" class="btn" data-step="0" data-clear="1">' + texts.stepStartOver + "</button>";
    reportBox.hidden = true;
    return;
  }

  var rows = vitals.map(function (v, i) {
    var item = r.results.filter(function (x) { return x.vital === v; })[0];
    return '<button type="button" class="row" data-step="' + i + '"><span class="row-dot row-dot--' + stateOf(v, item) + '"></span>' +
      '<span class="row-name">' + v.name + '</span><span class="row-val">' + (item ? item.reading : "—") + "</span></button>";
  }).join("");

  var html = '<p class="verdict-line">' + badge(r.overall) + '</p>' +
    '<h3 class="verdict">' + summaryTitles[r.overall] + "</h3>" +
    "<p>" + summaryTexts[r.overall].replace("{n}", r.outside.length) + "</p>" +
    '<div class="rows">' + rows + "</div>";

  if (r.outside.length) {
    html += '<details class="meaning"><summary>' + texts.summaryMeaning + '</summary><ul class="notes">' +
      r.outside.map(function (x) {
        var v = x.vital;
        return "<li><strong>" + v.name + ":</strong> " + (x.detail ? x.detail + ". " : "") + v.messages[x.status] +
          " " + v.related.text + " " + sourceLink(v.related.source) + "</li>";
      }).join("") + "</ul></details>";
  }

  html += '<p class="summary-note">' + summaryTexts.note + "</p>" +
    '<div class="form-actions">' +
    '<button type="button" class="btn' + (r.overall === "danger" ? " btn-urgent" : "") + '" id="toggle-report">' + texts.reportOpen + "</button>" +
    '<button type="button" class="btn btn-light" data-step="0" data-clear="1">' + texts.stepStartOver + "</button></div>";
  body.innerHTML = html;

  buildReport();
}

function buildReport() {
  var r = lastCheckin;
  var lines = [];
  lines.push("STAR CHANCE - HEALTH CHECK-IN REPORT");
  lines.push("To: Flight surgeon");
  lines.push(scenarioUsed ? "Data: SIMULATED (" + scenarioUsed + ")" : "Data: typed in by the user (demo, not medical data)");
  lines.push("Date and time: " + new Date().toLocaleString("en-US"));
  lines.push("");
  lines.push("Readings:");
  var missing = [];
  vitals.forEach(function (v) {
    var item = r.results.filter(function (x) { return x.vital === v; })[0];
    if (!item) {
      missing.push(v.name);
    } else {
      var state = item.status === "ok" ? "in range" : (item.status === "danger" ? "URGENT" : "outside range");
      lines.push("- " + v.name + ": " + item.reading + (item.detail ? " (" + item.detail + ")" : "") +
        " - " + state + ". " + v.reference.replace(/\.$/, "") + ".");
    }
  });
  if (missing.length) lines.push("Not measured: " + missing.join(", ") + ".");
  lines.push("");
  lines.push("Summary: " + (r.outside.length === 0 ? "all measured readings are inside the reference ranges."
    : r.outside.length + " reading(s) outside the reference range."));
  lines.push("Note: automatic comparison with general medical reference ranges. Not a diagnosis.");
  reportText.value = lines.join("\n");

  document.getElementById("report-who").innerHTML = surgeon.text + " " + sourceLink(surgeon.source);
  sendButton.textContent = r.overall === "danger" ? texts.reportUrgent : texts.reportSend;
  sendButton.classList.toggle("btn-urgent", r.overall === "danger");
  reportStatus.textContent = "";
}

// one click listener for the whole check-in view
document.getElementById("view-checkin").addEventListener("click", function (e) {
  var t = e.target;

  var stepper = t.closest(".step");
  if (stepper) {
    var f = allFields().filter(function (x) { return x.id === stepper.dataset.field; })[0];
    var input = document.getElementById("f-" + f.id);
    var x = parseFloat(input.value);
    var next = isFinite(x) ? x + Number(stepper.dataset.dir) * f.step : f.start;  // first tap starts from a typical value
    next = Math.round(next * 10) / 10;
    input.value = Math.max(f.min, Math.min(f.max, next));
    scenarioUsed = "";
    refresh();
    return;
  }

  var nav = t.closest("[data-nav]");
  if (nav) { showStep(step + Number(nav.dataset.nav)); stepsBar.scrollIntoView({ behavior: "smooth", block: "start" }); return; }

  var go = t.closest("[data-step]");
  if (go) {
    if (go.dataset.clear) {  // "Start over" also clears the numbers
      allFields().forEach(function (f) { document.getElementById("f-" + f.id).value = ""; });
      scenarioUsed = "";
    }
    showStep(Number(go.dataset.step));
    stepsBar.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  var scenario = t.closest("[data-scenario]");
  if (scenario) {
    var s = scenarios[scenario.dataset.scenario];
    Object.keys(s.values).forEach(function (id) { document.getElementById("f-" + id).value = s.values[id]; });
    scenarioUsed = s.label;
    showStep(summaryStep);
    return;
  }

  if (t.closest("#toggle-report")) {
    reportBox.hidden = !reportBox.hidden;
    if (!reportBox.hidden) reportBox.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (t.closest("#copy-report")) {
    var copyFallback = function () {
      reportText.select();
      try { document.execCommand("copy"); reportStatus.textContent = "Report copied."; }
      catch (err) { reportStatus.textContent = "Select the text and copy it."; }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(reportText.value).then(function () { reportStatus.textContent = "Report copied."; }, copyFallback);
    } else {
      copyFallback();
    }
    return;
  }

  // the demo does not send anything: it only shows what the flow would look like
  if (t.closest("#send-report")) {
    reportStatus.textContent = "Simulated: report sent to the flight surgeon at " +
      new Date().toLocaleTimeString("en-US") + ". Nothing left this device.";
  }
});

// typing a number, Enter goes to the next step
panels.addEventListener("input", function () {
  scenarioUsed = "";
  refresh();
});
panels.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && e.target.tagName === "INPUT") {
    e.preventDefault();
    showStep(step + 1);
  }
});

// drag on the bar: the dot follows the finger and fills in the number
var dragField = null;

function setFromBar(e) {
  var f = dragField;
  var box = document.querySelector('.meter[data-field="' + f.id + '"]').getBoundingClientRect();
  var pct = Math.max(0, Math.min(1, (e.clientX - box.left) / box.width));
  var x = f.meter.min + pct * (f.meter.max - f.meter.min);
  x = Math.round(Math.round(x / f.step) * f.step * 10) / 10;
  document.getElementById("f-" + f.id).value = Math.max(f.min, Math.min(f.max, x));
  scenarioUsed = "";
  refresh();
}

function stopDrag() {
  var bar = document.querySelector(".meter.dragging");
  if (bar) bar.classList.remove("dragging");
  dragField = null;
}

panels.addEventListener("pointerdown", function (e) {
  var bar = e.target.closest(".meter");
  if (!bar) return;
  dragField = allFields().filter(function (f) { return f.id === bar.dataset.field; })[0];
  bar.setPointerCapture(e.pointerId);
  bar.classList.add("dragging");
  setFromBar(e);
});
panels.addEventListener("pointermove", function (e) {
  if (dragField) setFromBar(e);
});
panels.addEventListener("pointerup", stopDrag);
panels.addEventListener("pointercancel", stopDrag);

showStep(0);

// open the view from the url (#body) or the first one
showView(location.hash.slice(1));

// header ECG line: redrawn to the real width, so it never breaks or stretches
var pulse = document.querySelector(".pulse");

function drawPulse() {
  var w = Math.round(pulse.getBoundingClientRect().width) || 200;
  var x = Math.round(w * 0.3);
  pulse.setAttribute("viewBox", "0 0 " + w + " 30");
  pulse.querySelector("path").setAttribute("d", "M0 15H" + x + "l7-12 9 24 8-17 5 5H" + w);
}

drawPulse();
window.addEventListener("resize", drawPulse);
