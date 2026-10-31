/*
 * Side-profile vehicle illustrations, drawn as inline SVG so the app needs no
 * image downloads. The body color is set from the selected paint swatch.
 * To show a real photo instead, add `photo: "images/<file>"` to the model data.
 */
(function () {
  function shade(hex, amt) {
    // amt: -1..1 (negative darkens, positive lightens)
    var c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map(function (x) { return x + x; }).join("");
    var n = parseInt(c, 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    function mix(v) {
      return Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt);
    }
    return "#" + [mix(r), mix(g), mix(b)].map(function (v) {
      return ("0" + Math.max(0, Math.min(255, v)).toString(16)).slice(-2);
    }).join("");
  }

  function wheel(cx, cy, r, rimColor) {
    var spokes = "";
    for (var i = 0; i < 6; i++) {
      var a = (Math.PI * 2 * i) / 6;
      var x2 = cx + Math.cos(a) * r * 0.6, y2 = cy + Math.sin(a) * r * 0.6;
      spokes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2.toFixed(1) + '" y2="' + y2.toFixed(1) +
        '" stroke="' + shade(rimColor, -0.35) + '" stroke-width="4" stroke-linecap="round"/>';
    }
    return '<g>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="#18191b"/>' +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.66).toFixed(1) + '" fill="' + rimColor + '"/>' +
      spokes +
      '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.16).toFixed(1) + '" fill="' + shade(rimColor, -0.5) + '"/>' +
      '</g>';
  }

  var uid = 0;

  function truck(color, opts) {
    var id = "g" + (++uid);
    var rim = opts && opts.darkWheels ? "#3a3d42" : "#a9afb5";
    return '' +
      '<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pickup truck illustration">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + shade(color, 0.28) + '"/>' +
      '<stop offset="0.55" stop-color="' + color + '"/>' +
      '<stop offset="1" stop-color="' + shade(color, -0.35) + '"/></linearGradient></defs>' +
      '<ellipse cx="210" cy="168" rx="196" ry="7" fill="#000" opacity="0.16"/>' +
      // body
      '<path d="M22 134 L20 96 L180 93 L184 58 Q186 50 198 50 L262 49 L302 84 L372 92 Q392 95 395 106 L396 128 Q396 138 386 138 ' +
      'L351 138 A33 33 0 0 0 285 138 L133 138 A33 33 0 0 0 67 138 L32 138 Q22 138 22 134 Z" fill="url(#' + id + ')" stroke="' + shade(color, -0.5) + '" stroke-width="1.2"/>' +
      // bed rail cap
      '<path d="M20 96 L180 93 L180 99 L21 102 Z" fill="' + shade(color, -0.45) + '" opacity="0.65"/>' +
      // cab glass
      '<path d="M192 60 Q193 55 200 55 L258 54 L291 86 L189 88 Z" fill="#1f2a36"/>' +
      '<path d="M200 57 L232 56 L214 70 Z" fill="#ffffff" opacity="0.12"/>' +
      '<rect x="236" y="55" width="6" height="34" fill="' + shade(color, -0.25) + '"/>' +
      // body lines
      '<path d="M22 110 L382 104" stroke="' + shade(color, 0.35) + '" stroke-width="1.4" opacity="0.6"/>' +
      '<path d="M182 93 L182 136 M240 89 L240 136 M292 88 L292 132" stroke="' + shade(color, -0.5) + '" stroke-width="1" opacity="0.7"/>' +
      '<rect x="222" y="98" width="12" height="3" rx="1.5" fill="' + shade(color, -0.45) + '"/>' +
      '<rect x="274" y="96" width="12" height="3" rx="1.5" fill="' + shade(color, -0.45) + '"/>' +
      // mirror
      '<path d="M286 84 L299 81 L301 91 L289 92 Z" fill="' + shade(color, -0.2) + '"/>' +
      // lights + grille
      '<path d="M378 97 L394 103 L394 110 L375 106 Z" fill="#f4f7fb"/>' +
      '<rect x="386" y="112" width="10" height="14" rx="2" fill="#141414"/>' +
      '<rect x="19" y="99" width="6" height="18" rx="1.5" fill="#c1121f"/>' +
      // rocker shadow
      '<rect x="133" y="132" width="152" height="6" fill="#000" opacity="0.18"/>' +
      wheel(100, 140, 27, rim) + wheel(318, 140, 27, rim) +
      '</svg>';
  }

  function suv(color) {
    var id = "g" + (++uid);
    var rim = "#b4b9be";
    return '' +
      '<svg viewBox="0 0 420 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Electric SUV illustration">' +
      '<defs><linearGradient id="' + id + '" x1="0" y1="0" x2="0" y2="1">' +
      '<stop offset="0" stop-color="' + shade(color, 0.28) + '"/>' +
      '<stop offset="0.55" stop-color="' + color + '"/>' +
      '<stop offset="1" stop-color="' + shade(color, -0.35) + '"/></linearGradient></defs>' +
      '<ellipse cx="210" cy="168" rx="196" ry="7" fill="#000" opacity="0.16"/>' +
      // body
      '<path d="M24 130 L26 84 Q28 64 42 56 L66 44 Q74 40 88 40 L246 39 Q260 39 268 46 L310 80 L370 90 Q394 95 396 110 L396 128 ' +
      'Q396 138 386 138 L352 138 A34 34 0 0 0 284 138 L132 138 A34 34 0 0 0 64 138 L34 138 Q24 138 24 130 Z" fill="url(#' + id + ')" stroke="' + shade(color, -0.5) + '" stroke-width="1.2"/>' +
      // glass
      '<path d="M52 66 L76 50 Q82 46 90 46 L244 45 Q254 45 260 51 L296 83 L50 86 Z" fill="#1f2a36"/>' +
      '<path d="M96 49 L150 48 L120 68 Z" fill="#ffffff" opacity="0.12"/>' +
      '<rect x="110" y="46" width="7" height="40" fill="' + shade(color, -0.25) + '"/>' +
      '<rect x="190" y="45" width="6" height="41" fill="#111"/>' +
      // body lines
      '<path d="M28 100 L384 98" stroke="' + shade(color, 0.35) + '" stroke-width="1.4" opacity="0.6"/>' +
      '<path d="M116 92 L118 134 M193 90 L194 136 M276 88 L274 130" stroke="' + shade(color, -0.5) + '" stroke-width="1" opacity="0.7"/>' +
      // lower cladding
      '<path d="M24 126 L64 126 L64 138 L34 138 Q24 138 24 130 Z M132 126 L284 126 L284 138 L132 138 Z M352 126 L396 126 L396 128 Q396 138 386 138 L352 138 Z" fill="#202224" opacity="0.55"/>' +
      '<path d="M64 138 A34 34 0 0 1 132 138 M284 138 A34 34 0 0 1 352 138" fill="none" stroke="#202224" stroke-width="5" opacity="0.55"/>' +
      // mirror
      '<path d="M294 82 L307 79 L309 89 L296 90 Z" fill="' + shade(color, -0.2) + '"/>' +
      // EV light bar + tail
      '<path d="M366 92 L396 101 L396 105 L364 97 Z" fill="#f4f7fb"/>' +
      '<rect x="25" y="76" width="6" height="14" rx="1.5" fill="#c1121f"/>' +
      wheel(98, 140, 28, rim) + wheel(318, 140, 28, rim) +
      '</svg>';
  }

  window.VehicleArt = {
    render: function (bodyType, color, opts) {
      return bodyType === "truck" ? truck(color, opts) : suv(color, opts);
    }
  };
})();
