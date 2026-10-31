(function () {
  "use strict";

  var MODELS = window.HONDA_MODELS || [];
  var TABS = [
    { id: "compare", label: "Compare Trims" },
    { id: "stepup", label: "What Each Trim Adds" },
    { id: "history", label: "Model-Year History" },
    { id: "answers", label: "Quick Answers" }
  ];
  var HISTORY_TYPES = {
    generation: { label: "New Generation", cls: "t-gen" },
    refresh: { label: "Major Refresh", cls: "t-refresh" },
    update: { label: "Update", cls: "t-update" },
    carryover: { label: "Carryover", cls: "t-carry" },
    gap: { label: "No Model Year", cls: "t-gap" },
    news: { label: "Upcoming / Unconfirmed", cls: "t-news" }
  };
  // Customer words -> words used in the feature list
  var SYNONYMS = {
    hud: "head-up", "heads up": "head-up", "heads-up": "head-up",
    sunroof: "moonroof|panoramic", "glass roof": "panoramic|moonroof", roof: "moonroof|panoramic|roof",
    cooled: "ventilated", "a/c seat": "ventilated", vented: "ventilated",
    "heated wheel": "heated steering", "steering heat": "heated steering",
    "360": "surround", "bird": "surround", "camera": "camera",
    carplay: "carplay", "android": "android", "apple": "carplay",
    "remote start": "remote engine start", stereo: "audio", speakers: "audio", sound: "audio", bose: "bose",
    leather: "seat material|leather", cloth: "seat material", seats: "seat",
    tow: "towing|hitch", towing: "towing|hitch", mpg: "fuel economy", range: "range",
    "wireless charging": "phone charger|qi", "phone charger": "phone charger|qi", qi: "qi|phone charger",
    "parking sensor": "parking sensors", sensors: "sensors", awd: "awd|drivetrain|i-vtm4", "4wd": "awd|i-vtm4",
    "skid": "skid|underbody", "all terrain": "all-terrain", "a/t": "all-terrain", tires: "tires",
    outlet: "outlet", "plug": "outlet", "bed": "bed|tailgate|trunk", memory: "memory", mirrors: "mirror"
  };

  var state = {
    modelId: MODELS.length ? MODELS[0].id : null,
    tab: "compare",
    selected: {},     // modelId -> array of trim indexes being compared
    diffOnly: true,
    filter: "",
    colorIdx: {},     // modelId -> swatch index
    showCarryover: true,
    historyType: "all",
    sinceYear: "",
    highlight: ""
  };

  // ---------- helpers ----------
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function money(n) { return "$" + Math.round(n).toLocaleString("en-US"); }
  function getModel(id) {
    for (var i = 0; i < MODELS.length; i++) if (MODELS[i].id === id) return MODELS[i];
    return null;
  }
  function selectedTrims(model) {
    if (!state.selected[model.id]) state.selected[model.id] = model.trims.map(function (_, i) { return i; });
    return state.selected[model.id];
  }
  function sameValue(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function allBool(v) { return v.every(function (x) { return typeof x === "boolean"; }); }

  function availability(feature, trims) {
    var v = feature.v;
    if (allBool(v)) {
      var on = [];
      v.forEach(function (x, i) { if (x) on.push(i); });
      if (on.length === v.length) return { text: "All trims", cls: "av-all" };
      if (on.length === 0) return { text: "Not offered", cls: "av-none" };
      if (on.length === 1) return { text: trims[on[0]].name + " only", cls: "av-exclusive" };
      var contiguousToTop = on[on.length - 1] === v.length - 1 &&
        on.every(function (x, k) { return k === 0 || x === on[k - 1] + 1; });
      if (contiguousToTop) return { text: trims[on[0]].name + " & up", cls: "av-up" };
      return { text: on.map(function (i) { return trims[i].name; }).join(", "), cls: "av-some" };
    }
    var allSame = v.every(function (x) { return sameValue(x, v[0]); });
    if (allSame) return { text: "All trims", cls: "av-all" };
    var nonFalse = v.filter(function (x) { return x !== false; }).length;
    if (nonFalse === 1) {
      var idx = v.findIndex(function (x) { return x !== false; });
      return { text: trims[idx].name + " only", cls: "av-exclusive" };
    }
    return { text: "Varies by trim", cls: "av-some" };
  }

  function cell(val) {
    if (val === true) return '<span class="yes" aria-label="Standard">✓</span>';
    if (val === false) return '<span class="no" aria-label="Not available">—</span>';
    return '<span class="txt">' + esc(val) + "</span>";
  }

  function verifyTag(item) {
    return item.verify ? ' <span class="verify-tag" title="Public sources conflicted. Confirm with Honda spec sheet.">verify</span>' : "";
  }

  function storage(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { return null; }
  }

  // ---------- routing ----------
  function readHash() {
    var parts = (location.hash || "").replace(/^#/, "").split(/[\/-]/);
    if (parts[0] && getModel(parts[0])) state.modelId = parts[0];
    if (parts[1] && TABS.some(function (t) { return t.id === parts[1]; })) state.tab = parts[1];
  }
  function writeHash() {
    var h = "#" + state.modelId + "-" + state.tab;
    if (location.hash === h) return;
    try { history.replaceState(null, "", h); } catch (e) { /* sandboxed frame: hash is optional */ }
  }

  // ---------- model picker ----------
  function renderCards() {
    var html = MODELS.map(function (m) {
      var color = m.colors[(state.colorIdx[m.id] || 0)].hex;
      var active = m.id === state.modelId;
      return '<button type="button" class="model-card' + (active ? " active" : "") + '" data-model="' + m.id + '" aria-pressed="' + active + '">' +
        '<div class="card-art">' + art(m, color, true) + "</div>" +
        '<div class="card-body">' +
        '<div class="card-kicker">' + esc(m.modelYear + " · " + m.category) + "</div>" +
        '<div class="card-name">' + esc(m.name) + "</div>" +
        '<div class="card-meta">From ' + esc(m.trims[0].priceText) + " · " + m.trims.length + " trims</div>" +
        "</div></button>";
    }).join("");
    html += '<div class="model-card placeholder" aria-disabled="true"><div class="card-body">' +
      '<div class="card-name">More models</div><div class="card-meta">Add a data file in <code>/data</code> to include Civic, CR-V, Pilot and more.</div></div></div>';
    $("#model-cards").innerHTML = html;
  }

  function art(model, color, small) {
    if (model.photo && !small) {
      return '<img class="photo" src="' + esc(model.photo) + '" alt="' + esc(model.modelYear + " Honda " + model.name) + '">';
    }
    return window.VehicleArt.render(model.bodyType, color, {});
  }

  // ---------- model view ----------
  function renderModel() {
    var m = getModel(state.modelId);
    var view = $("#model-view");
    if (!m) { view.innerHTML = "<p>No models loaded.</p>"; return; }
    var ci = state.colorIdx[m.id] || 0;
    var color = m.colors[ci];

    var swatches = m.colors.map(function (c, i) {
      return '<button type="button" class="swatch' + (i === ci ? " active" : "") + '" data-swatch="' + i + '" style="--sw:' + c.hex + '" title="' + esc(c.name) + '" aria-label="' + esc(c.name) + '"></button>';
    }).join("");

    var stats = m.heroStats.map(function (s) {
      return '<div class="stat"><div class="stat-val">' + esc(s.value) + '</div><div class="stat-label">' + esc(s.label) + "</div></div>";
    }).join("");

    var pitch = m.quickPitch.map(function (p) { return "<li>" + esc(p) + "</li>"; }).join("");

    var tabs = TABS.map(function (t) {
      var a = t.id === state.tab;
      return '<button type="button" role="tab" class="tab' + (a ? " active" : "") + '" data-tab="' + t.id + '" aria-selected="' + a + '">' + esc(t.label) + "</button>";
    }).join("");

    view.innerHTML =
      '<div class="hero">' +
        '<div class="hero-art">' +
          '<div class="art-stage">' + art(m, color.hex, false) + "</div>" +
          '<div class="swatches" role="group" aria-label="Preview paint color">' + swatches + "</div>" +
          '<div class="swatch-name">' + esc(color.name) + ' <span class="muted">· ' + esc(m.colorNote) + "</span></div>" +
        "</div>" +
        '<div class="hero-info">' +
          '<div class="kicker">' + esc(m.modelYear + " Honda · " + m.category) + "</div>" +
          "<h1>" + esc(m.name) + "</h1>" +
          '<p class="tagline">' + esc(m.tagline) + "</p>" +
          '<div class="stats">' + stats + "</div>" +
          '<div class="pitch"><div class="pitch-title">30-second pitch</div><ul>' + pitch + "</ul></div>" +
        "</div>" +
      "</div>" +
      '<div class="tabs" role="tablist">' + tabs + "</div>" +
      '<div id="panel" class="panel" role="tabpanel"></div>';

    renderPanel();
  }

  function renderPanel() {
    var m = getModel(state.modelId);
    var p = $("#panel");
    if (state.tab === "compare") p.innerHTML = compareHTML(m);
    else if (state.tab === "stepup") p.innerHTML = stepupHTML(m);
    else if (state.tab === "history") p.innerHTML = historyHTML(m);
    else p.innerHTML = answersHTML(m);
    if (state.highlight) {
      var row = p.querySelector('[data-feature="' + cssEscape(state.highlight) + '"]');
      if (row) {
        row.classList.add("flash");
        row.scrollIntoView({ block: "center", behavior: "smooth" });
      }
      state.highlight = "";
    }
  }

  function cssEscape(s) { return window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/"/g, '\\"'); }

  // ---------- compare tab ----------
  function compareHTML(m) {
    var sel = selectedTrims(m);
    var chips = m.trims.map(function (t, i) {
      var on = sel.indexOf(i) !== -1;
      return '<button type="button" class="chip' + (on ? " on" : "") + '" data-trim="' + i + '" aria-pressed="' + on + '">' + esc(t.name) + "</button>";
    }).join("");

    var cols = sel.slice().sort(function (a, b) { return a - b; });
    var q = state.filter.trim().toLowerCase();

    var head = '<tr><th class="feat-col" scope="col">Feature</th>' + cols.map(function (i) {
      var t = m.trims[i];
      return '<th scope="col" class="trim-col"><div class="th-name">' + esc(t.name) + '</div><div class="th-price">' + esc(t.priceText) + "</div>" +
        (t.priceSub ? '<div class="th-sub">' + esc(t.priceSub) + "</div>" : "") + "</th>";
    }).join("") + "</tr>";

    var body = "";
    var shown = 0, hiddenSame = 0;
    m.featureGroups.forEach(function (g) {
      var rows = "";
      var groupHidden = 0;
      g.features.forEach(function (f) {
        var vals = cols.map(function (i) { return f.v[i]; });
        var differs = vals.some(function (x) { return !sameValue(x, vals[0]); });
        var matchesFilter = !q || matchQuery(f, q);
        if (!matchesFilter) return;
        if (state.diffOnly && !differs && !q) { groupHidden++; return; }
        var av = availability(f, m.trims);
        rows += '<tr class="' + (differs ? "row-diff" : "row-same") + '" data-feature="' + esc(f.name) + '">' +
          '<th scope="row" class="feat-col"><div class="feat-name">' + esc(f.name) + verifyTag(f) + "</div>" +
          '<span class="av ' + av.cls + '">' + esc(av.text) + "</span>" +
          (f.note ? '<div class="feat-note">' + esc(f.note) + "</div>" : "") + "</th>" +
          cols.map(function (i, k) {
            var gain = k > 0 && !sameValue(f.v[i], f.v[cols[k - 1]]);
            return '<td class="' + (gain ? "changed" : "") + '">' + cell(f.v[i]) + "</td>";
          }).join("") + "</tr>";
        shown++;
      });
      hiddenSame += groupHidden;
      if (rows || (groupHidden && !q)) {
        body += '<tr class="group-row"><th colspan="' + (cols.length + 1) + '">' + esc(g.name) +
          (groupHidden ? '<span class="group-hidden">' + groupHidden + " identical on selected trims (hidden)</span>" : "") +
          "</th></tr>" + rows;
      }
    });

    if (!shown) {
      body += '<tr><td colspan="' + (cols.length + 1) + '" class="empty">' +
        (q ? "No features match “" + esc(state.filter) + "”." : "These trims are identical on everything listed.") + "</td></tr>";
    }

    return '' +
      '<div class="controls">' +
        '<div class="control-group"><span class="control-label">Compare</span><div class="chips">' + chips + "</div></div>" +
        '<label class="switch"><input type="checkbox" id="diff-only"' + (state.diffOnly ? " checked" : "") + '><span class="slider" aria-hidden="true"></span> Show differences only</label>' +
        '<div class="filter-wrap"><input type="search" id="feature-filter" placeholder="Filter features…" value="' + esc(state.filter) + '" aria-label="Filter features"></div>' +
      "</div>" +
      '<div class="trim-pitches">' + cols.map(function (i) {
        var t = m.trims[i];
        return '<div class="trim-pitch"><strong>' + esc(t.name) + "</strong> " + esc(t.pitch) + "</div>";
      }).join("") + "</div>" +
      '<div class="table-wrap"><table class="compare">' +
        "<thead>" + head + "</thead><tbody>" + body + "</tbody></table></div>" +
      '<p class="fine">' + esc(m.priceNote) + (hiddenSame && state.diffOnly ? " " + hiddenSame + " features are identical across the selected trims and are hidden. Turn off “Show differences only” to see everything." : "") + "</p>";
  }

  function expandQuery(q) {
    var terms = [q];
    Object.keys(SYNONYMS).forEach(function (k) {
      if (q.indexOf(k) !== -1) terms = terms.concat(SYNONYMS[k].split("|"));
    });
    return terms;
  }
  function matchQuery(f, q) {
    var hay = (f.name + " " + (f.note || "") + " " + f.v.filter(function (x) { return typeof x === "string"; }).join(" ")).toLowerCase();
    return expandQuery(q).some(function (t) { return hay.indexOf(t) !== -1; });
  }

  // ---------- step-up tab ----------
  function stepupHTML(m) {
    var all = [];
    m.featureGroups.forEach(function (g) { g.features.forEach(function (f) { all.push(f); }); });

    var cards = m.trims.map(function (t, i) {
      var head = '<div class="step-head"><div class="step-name">' + esc(t.name) + '</div><div class="step-price">' + esc(t.priceText) +
        (t.priceSub ? ' <span class="muted">(' + esc(t.priceSub) + ")</span>" : "") + "</div>";
      if (i === 0) {
        var std = all.filter(function (f) { return f.v[0] !== false; });
        head += '<div class="step-delta base">Starting trim</div></div>';
        return '<article class="step-card">' + head + '<p class="step-pitch">' + esc(t.pitch) + "</p>" +
          '<details class="std-list"><summary>Standard equipment (' + std.length + ' items)</summary><ul class="adds">' +
          std.map(function (f) {
            var val = f.v[0] === true ? "" : ": " + f.v[0];
            return "<li>" + esc(f.name + val) + verifyTag(f) + "</li>";
          }).join("") + "</ul></details></article>";
      }
      var prev = m.trims[i - 1];
      var adds = [], upgrades = [], loses = [];
      all.forEach(function (f) {
        var a = f.v[i - 1], b = f.v[i];
        if (sameValue(a, b)) return;
        if (a === false && b !== false) adds.push(f);
        else if (b === false && a !== false) loses.push(f);
        else upgrades.push(f);
      });
      var delta = t.msrp - prev.msrp;
      head += '<div class="step-delta">' + (delta >= 0 ? "+" : "−") + money(Math.abs(delta)) + " over " + esc(prev.name) + "</div>" +
        (t.deltaNote ? '<div class="step-delta-note">' + esc(t.deltaNote) + "</div>" : "") + "</div>";
      var html = '<article class="step-card">' + head + '<p class="step-pitch">' + esc(t.pitch) + "</p>";
      html += '<div class="step-sub">Everything in ' + esc(prev.name) + ", plus</div>";
      html += adds.length ? '<ul class="adds">' + adds.map(function (f) {
        return "<li>" + esc(f.name + (f.v[i] === true ? "" : ": " + f.v[i])) + verifyTag(f) + "</li>";
      }).join("") + "</ul>" : '<p class="muted small">No new features. See changes below.</p>';
      if (upgrades.length) {
        html += '<div class="step-sub">Changes</div><ul class="upgrades">' + upgrades.map(function (f) {
          return "<li><span>" + esc(f.name) + verifyTag(f) + '</span><span class="from-to">' + esc(String(f.v[i - 1])) + " → <strong>" + esc(String(f.v[i])) + "</strong></span></li>";
        }).join("") + "</ul>";
      }
      if (loses.length) {
        html += '<div class="step-sub warn">Doesn’t include (has on ' + esc(prev.name) + ')</div><ul class="loses">' + loses.map(function (f) {
          return "<li>" + esc(f.name) + verifyTag(f) + "</li>";
        }).join("") + "</ul>";
      }
      return html + "</article>";
    }).join("");

    return '<p class="lead">Each card shows what you gain by stepping up one trim, plus anything you give up. The price difference is MSRP to MSRP.</p>' +
      '<div class="step-grid">' + cards + "</div>" +
      '<p class="fine">' + esc(m.priceNote) + "</p>";
  }

  // ---------- history tab ----------
  function historyHTML(m) {
    var gens = m.generations.map(function (g) {
      return '<div class="gen-card' + (g.gap ? " gap" : "") + '"><div class="gen-years">' + esc(g.years) + '</div><div class="gen-name">' + esc(g.name) + '</div><p>' + esc(g.summary) + "</p></div>";
    }).join("");

    var typeChips = ["all", "generation", "refresh", "update"].map(function (t) {
      var label = t === "all" ? "All" : HISTORY_TYPES[t].label;
      var on = state.historyType === t;
      return '<button type="button" class="chip' + (on ? " on" : "") + (t !== "all" ? " " + HISTORY_TYPES[t].cls : "") + '" data-htype="' + t + '" aria-pressed="' + on + '">' + esc(label) + "</button>";
    }).join("");

    var numericYears = m.history.filter(function (h) { return typeof h.year === "number"; })
      .map(function (h) { return h.year; }).sort(function (a, b) { return b - a; });
    var current = m.modelYear;
    var minYear = numericYears[numericYears.length - 1];
    var yearOpts = '<option value="">Select year…</option>';
    for (var y = current - 1; y >= minYear; y--) {
      yearOpts += '<option value="' + y + '"' + (String(y) === state.sinceYear ? " selected" : "") + ">" + y + "</option>";
    }

    var since = "";
    if (state.sinceYear) {
      var sy = parseInt(state.sinceYear, 10);
      var gap = m.history.find(function (h) { return h.type === "gap"; });
      var noYear = false;
      if (gap && /(\d{4})\D+(\d{2,4})/.test(String(gap.year))) {
        var mm = String(gap.year).match(/(\d{4})\D+(\d{2,4})/);
        var g1 = parseInt(mm[1], 10), g2 = parseInt(mm[2].length === 2 ? mm[1].slice(0, 2) + mm[2] : mm[2], 10);
        noYear = sy >= g1 && sy <= g2;
      }
      var later = m.history.filter(function (h) {
        return typeof h.year === "number" && h.year > sy && h.type !== "carryover";
      }).sort(function (a, b) { return a.year - b.year; });
      var genJump = later.some(function (h) { return h.type === "generation"; });
      since = '<div class="since-box">' +
        (noYear ? '<p class="warn">There was no ' + sy + " model year. Double-check the customer’s registration.</p>" : "") +
        '<div class="since-title">From a ' + sy + " to a " + current + ": " +
        (genJump ? '<span class="pill t-gen">Different generation</span>' : '<span class="pill t-update">Same generation</span>') + "</div>" +
        (later.length ? '<ol class="since-list">' + later.map(function (h) {
          var t = HISTORY_TYPES[h.type];
          return '<li><span class="since-year">' + h.year + '</span> <span class="pill ' + t.cls + '">' + t.label + "</span> <strong>" + esc(h.title) + "</strong>" + verifyTag(h) +
            "<ul>" + h.changes.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></li>";
        }).join("") + "</ol>" : '<p class="muted">No significant changes since ' + sy + ".</p>") +
        "</div>";
    }

    var items = m.history.filter(function (h) {
      if (!state.showCarryover && (h.type === "carryover" || h.type === "gap")) return false;
      if (state.historyType === "all") return true;
      return h.type === state.historyType;
    }).map(function (h) {
      var t = HISTORY_TYPES[h.type];
      return '<li class="tl-item ' + t.cls + '">' +
        '<div class="tl-year">' + esc(String(h.year)) + "</div>" +
        '<div class="tl-dot" aria-hidden="true"></div>' +
        '<div class="tl-body"><div class="tl-head"><span class="pill ' + t.cls + '">' + esc(t.label) + "</span> <strong>" + esc(h.title) + "</strong>" + verifyTag(h) + "</div>" +
        "<ul>" + h.changes.map(function (c) { return "<li>" + esc(c) + "</li>"; }).join("") + "</ul></div></li>";
    }).join("");

    return '<div class="gen-row">' + gens + "</div>" +
      '<div class="since-tool"><label for="since-year"><strong>Customer has a…</strong></label> ' +
        '<select id="since-year">' + yearOpts + "</select> " + esc(m.name) +
        ' <span class="muted">See everything that changed between their year and the ' + current + ".</span>" + since + "</div>" +
      '<div class="controls"><div class="chips">' + typeChips + "</div>" +
        '<label class="switch"><input type="checkbox" id="show-carry"' + (state.showCarryover ? " checked" : "") + '><span class="slider" aria-hidden="true"></span> Show carryover years</label></div>' +
      '<ol class="timeline">' + (items || '<li class="muted">No entries for this filter.</li>') + "</ol>";
  }

  // ---------- answers tab ----------
  function answersHTML(m) {
    var specs = m.specs.map(function (g) {
      return '<div class="spec-card"><h3>' + esc(g.group) + "</h3><dl>" + g.items.map(function (it) {
        return "<div><dt>" + esc(it[0]) + "</dt><dd>" + esc(it[1]) + "</dd></div>";
      }).join("") + "</dl></div>";
    }).join("");

    var faqs = m.faqs.map(function (f, i) {
      return '<details class="faq" data-q="' + esc((f.q + " " + f.a).toLowerCase()) + '"' + (i < 2 ? " open" : "") + "><summary>" + esc(f.q) + "</summary><p>" + esc(f.a) + "</p></details>";
    }).join("");

    var comps = m.competitors.map(function (c) {
      return '<div class="comp-card"><div class="comp-name">vs. ' + esc(c.name) + "</div><p>" + esc(c.note) + "</p></div>";
    }).join("");

    return '<div class="answers-grid">' +
      '<section><h2>Customer questions</h2><input type="search" id="faq-filter" placeholder="Filter questions…" aria-label="Filter questions">' +
        '<div class="faqs">' + faqs + "</div></section>" +
      '<section><h2>Key specs</h2><div class="spec-grid">' + specs + "</div>" +
        "<h2>How it stacks up</h2>" + '<div class="comp-grid">' + comps + "</div></section>" +
      "</div>";
  }

  // ---------- global search ----------
  function globalSearch(q) {
    q = q.trim().toLowerCase();
    var box = $("#search-results");
    if (q.length < 2) { box.hidden = true; box.innerHTML = ""; return; }
    var results = [];
    MODELS.forEach(function (m) {
      m.featureGroups.forEach(function (g) {
        g.features.forEach(function (f) {
          if (matchQuery(f, q)) {
            var av = availability(f, m.trims);
            results.push({ type: "feature", model: m, f: f, av: av });
          }
        });
      });
      m.faqs.forEach(function (fq) {
        if ((fq.q + " " + fq.a).toLowerCase().indexOf(q) !== -1) results.push({ type: "faq", model: m, fq: fq });
      });
    });
    if (!results.length) {
      box.innerHTML = '<div class="sr-empty">No matches. Try another word, e.g. “heated”, “towing”, “range”.</div>';
      box.hidden = false;
      return;
    }
    box.innerHTML = results.slice(0, 14).map(function (r, i) {
      if (r.type === "feature") {
        return '<button type="button" class="sr-item" role="option" data-i="' + i + '">' +
          '<span class="sr-model">' + esc(r.model.name) + "</span>" +
          '<span class="sr-name">' + esc(r.f.name) + "</span>" +
          '<span class="av ' + r.av.cls + '">' + esc(r.av.text) + "</span></button>";
      }
      return '<button type="button" class="sr-item" role="option" data-i="' + i + '">' +
        '<span class="sr-model">' + esc(r.model.name) + "</span>" +
        '<span class="sr-name">Q: ' + esc(r.fq.q) + '</span><span class="av av-some">Answer</span></button>';
    }).join("");
    box.hidden = false;
    box._results = results;
  }

  function openResult(r) {
    state.modelId = r.model.id;
    if (r.type === "feature") {
      state.tab = "compare";
      state.diffOnly = false;
      state.filter = "";
      state.highlight = r.f.name;
    } else {
      state.tab = "answers";
    }
    $("#search-results").hidden = true;
    $("#global-search").value = "";
    renderAll();
    if (r.type === "faq") {
      var els = document.querySelectorAll(".faq");
      els.forEach(function (d) {
        if (d.querySelector("summary").textContent === r.fq.q) {
          d.open = true;
          d.classList.add("flash");
          d.scrollIntoView({ block: "center", behavior: "smooth" });
        }
      });
    }
  }

  // ---------- events ----------
  function renderAll() {
    writeHash();
    renderCards();
    renderModel();
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    var card = t.closest("[data-model]");
    if (card) {
      if (state.modelId !== card.dataset.model) {
        state.modelId = card.dataset.model;
        state.filter = "";
        state.sinceYear = "";
      }
      renderAll();
      $("#model-view").scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (t.closest("[data-home]")) { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    var sw = t.closest("[data-swatch]");
    if (sw) { state.colorIdx[state.modelId] = parseInt(sw.dataset.swatch, 10); renderCards(); renderModel(); return; }
    var tab = t.closest("[data-tab]");
    if (tab) { state.tab = tab.dataset.tab; writeHash(); renderModel(); return; }
    var chip = t.closest("[data-trim]");
    if (chip) {
      var m = getModel(state.modelId), sel = selectedTrims(m), i = parseInt(chip.dataset.trim, 10);
      var pos = sel.indexOf(i);
      if (pos === -1) sel.push(i);
      else if (sel.length > 2) sel.splice(pos, 1);
      else { chip.classList.add("shake"); setTimeout(function () { chip.classList.remove("shake"); }, 400); return; }
      renderPanel();
      return;
    }
    var ht = t.closest("[data-htype]");
    if (ht) { state.historyType = ht.dataset.htype; renderPanel(); return; }
    var sr = t.closest(".sr-item");
    if (sr) { openResult($("#search-results")._results[parseInt(sr.dataset.i, 10)]); return; }
    if (!t.closest(".search-wrap")) $("#search-results").hidden = true;
  });

  document.addEventListener("change", function (e) {
    if (e.target.id === "diff-only") { state.diffOnly = e.target.checked; renderPanel(); }
    if (e.target.id === "show-carry") { state.showCarryover = e.target.checked; renderPanel(); }
    if (e.target.id === "since-year") { state.sinceYear = e.target.value; renderPanel(); }
  });

  document.addEventListener("input", function (e) {
    if (e.target.id === "feature-filter") {
      state.filter = e.target.value;
      var pos = e.target.selectionStart;
      renderPanel();
      var f = $("#feature-filter");
      f.focus();
      try { f.setSelectionRange(pos, pos); } catch (err) { /* ignore */ }
    }
    if (e.target.id === "global-search") globalSearch(e.target.value);
    if (e.target.id === "faq-filter") {
      var q = e.target.value.trim().toLowerCase();
      document.querySelectorAll(".faq").forEach(function (d) {
        d.hidden = q && d.dataset.q.indexOf(q) === -1;
        if (q && !d.hidden) d.open = true;
      });
    }
  });

  document.addEventListener("keydown", function (e) {
    var s = $("#global-search");
    if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "SELECT") {
      e.preventDefault(); s.focus(); return;
    }
    if (e.key === "Escape") { $("#search-results").hidden = true; if (document.activeElement === s) s.blur(); }
    if (e.key === "Enter" && document.activeElement === s) {
      var first = $("#search-results .sr-item");
      if (first) first.click();
    }
  });

  window.addEventListener("hashchange", function () { readHash(); renderAll(); });

  // ---------- theme ----------
  function applyTheme(t) {
    if (t) document.documentElement.setAttribute("data-theme", t);
    else document.documentElement.removeAttribute("data-theme");
  }
  applyTheme(storage("theme"));
  $("#theme-toggle").addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia && matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    applyTheme(next);
    storage("theme", next);
  });

  readHash();
  renderAll();
})();
