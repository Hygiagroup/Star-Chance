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
  return '<a href="' + s.url + '" target="_blank" rel="noopener">' + s.name + "</a>";
}

// risk cards (one per zone)
var cards = document.getElementById("cards");
Object.keys(zones).forEach(function (id) {
  var z = zones[id];
  cards.innerHTML +=
    '<article class="card">' +
    "<h3>" + z.title + "</h3>" +
    badge(z.status) +
    "<p>" + z.description + "</p>" +
    "</article>";
});

// sources list
var sourceList = document.getElementById("source-list");
sources.forEach(function (s) {
  sourceList.innerHTML += "<li>" + sourceLink(s) + "</li>";
});

// body map: click a zone and show its info in the panel
var panel = document.getElementById("panel");
var bodyZones = document.querySelectorAll(".zone");

function showZone(id) {
  var z = zones[id];
  if (!z) return;

  bodyZones.forEach(function (g) {
    g.classList.toggle("active", g.dataset.zone === id);
  });

  panel.innerHTML =
    "<h3>" + z.title + "</h3>" +
    badge(z.status) +
    '<p class="panel-value">' + z.value + " " + z.unit + "</p>" +
    "<p>" + z.description + "</p>" +
    '<p class="panel-source">Source: ' + sourceLink(z.source) + "</p>";
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

// open the view from the url (#body) or the first one
showView(location.hash.slice(1));
