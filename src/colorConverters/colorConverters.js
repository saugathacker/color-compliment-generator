const hextoRGB = (hex) => {
  let r = 0,
    g = 0,
    b = 0;

  // 3 digits
  if (hex.length === 4) {
    r = hex[1] + hex[1];
    g = hex[2] + hex[2];
    b = hex[3] + hex[3];

    // 6 digits
  } else if (hex.length === 7) {
    r = hex[1] + hex[2];
    g = hex[3] + hex[4];
    b = hex[5] + hex[6];
  }

  r = parseInt(r, 16);
  g = parseInt(g, 16);
  b = parseInt(b, 16);

  return `rgb(${r},${g},${b})`;
};

const RGBtoHex = (rgb) => {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
    g = (+rgb[1]).toString(16),
    b = (+rgb[2]).toString(16);

  if (r.length === 1) r = "0" + r;
  if (g.length === 1) g = "0" + g;
  if (b.length === 1) b = "0" + b;

  return `#${r}${g}${b}`;
};

const RGBtoHSL = (rgb) => {
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  rgb = rgb.substr(4).split(")")[0].split(sep);

  for (let R in rgb) {
    let r = rgb[R];
    if (r.indexOf("%") > -1)
      rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
  }

  // Make r, g, and b fractions of 1
  let r = rgb[0] / 255,
    g = rgb[1] / 255,
    b = rgb[2] / 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  // Calculate hue
  // No difference
  if (delta === 0) h = 0;
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2;
  // Blue is max
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return `hsl(${h},${s}%,${l}%)`;
};

const HSLtoRGB = (hsl) => {
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = hsl[0],
    s = hsl[1].substr(0, hsl[1].length - 1) / 100,
    l = hsl[2].substr(0, hsl[2].length - 1) / 100;

  // Strip label and convert to degrees (if necessary)
  if (h.indexOf("deg") > -1) h = h.substr(0, h.length - 3);
  else if (h.indexOf("rad") > -1)
    h = Math.round(h.substr(0, h.length - 3) * (180 / Math.PI));
  else if (h.indexOf("turn") > -1)
    h = Math.round(h.substr(0, h.length - 4) * 360);

  // Keep hue fraction of 360 if ending up over
  if (h >= 360) h %= 360;

  // Conversion to RGB begins
  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return `rgb(${r},${g},${b})`;
};

const getCompliment = (hex) => {
  let hsl = RGBtoHSL(hextoRGB(hex));
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = parseInt(hsl[0]),
    s = hsl[1],
    l = hsl[2];

  h = (h + 180) % 360;

  return RGBtoHex(HSLtoRGB(`hsl(${h},${s},${l})`));
};

const getSplitCompliment = (hex) => {
  let hsl = RGBtoHSL(hextoRGB(hex));
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = parseInt(hsl[0]),
    s = hsl[1],
    l = hsl[2];

  const h1 = (h + 150) % 360;
  const h2 = (h + 210) % 360;

  return [
    RGBtoHex(HSLtoRGB(`hsl(${h1},${s},${l})`)),
    RGBtoHex(HSLtoRGB(`hsl(${h2},${s},${l})`)),
  ];
};

const getAnalogous = (hex) => {
  let hsl = RGBtoHSL(hextoRGB(hex));
  let sep = hsl.indexOf(",") > -1 ? "," : " ";
  hsl = hsl.substr(4).split(")")[0].split(sep);

  let h = parseInt(hsl[0]),
    s = hsl[1],
    l = hsl[2];

  const h1 = (h + 30) % 360;
  const h2 = (h + 360 - 30) % 360;

  return [
    RGBtoHex(HSLtoRGB(`hsl(${h1},${s},${l})`)),
    RGBtoHex(HSLtoRGB(`hsl(${h2},${s},${l})`)),
  ];
};

export { getAnalogous, getCompliment, getSplitCompliment };
