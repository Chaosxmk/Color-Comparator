const Hex2RGB = (hex) => {
  // Remove the hash sign if it's included
  hex = hex.replace(/^#/, '');

  // Expand shorthand form (e.g., "03F") to full form (e.g., "0033FF")
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  // Parse the hex values
  const bigint = parseInt(hex, 16);

  // Extract RGB components
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;

  // Return the RGB values as an object
  return {r, g, b};
};

const HexA2RGBA = (hex) => {
  // Remove the hash sign if it's included
  hex = hex.replace(/^#/, '').trim();

  // Expand shorthand (#RGB → #RRGGBB, #RGBA → #RRGGBBAA)
  if (hex.length === 3) {
    hex = hex.replace(/([a-f\d])([a-f\d])([a-f\d])/i,
      (m, r, g, b) => r + r + g + g + b + b
    );
  } else if (hex.length === 4) {
    hex = hex.replace(/([a-f\d])([a-f\d])([a-f\d])([a-f\d])/i,
      (m, r, g, b, a) => r + r + g + g + b + b + a + a
    );
  }

  // Validate supported lengths
  if (![6, 8].includes(hex.length)) {
    throw new Error("Invalid hex color: " + hex);
  }

  const bigint = parseInt(hex, 16);

  const r = (bigint >> (hex.length === 8 ? 24 : 16)) & 255;
  const g = (bigint >> (hex.length === 8 ? 16 : 8)) & 255;
  const b = (bigint >> (hex.length === 8 ? 8 : 0)) & 255;
  const a = hex.length === 8 ? ((bigint & 255) / 255) : 1;

  return {r, g, b, a};
};

const RGB2Hex = (rgb) => {
  // Remove any non-numeric characters from the string
  rgb = rgb.replace(/[^\d,]/g, '');

  // Split the cleaned string into separate numbers
  const [r, g, b] = rgb.split(',').map(Number);

  // Convert each component to a 2-digit hex value
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  // Combine the hex values
  return `${rHex}${gHex}${bHex}`;
};

const RGBA2HexA = (rgb) => {
  // Remove any non-numeric characters from the string
  const m = rgb.match(/(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*([\d.]+))?/);

  if (!m) {
    throw new Error("Invalid RGB/RGBA format: " + rgb);
  }

  const r = Number(m[1]);
  const g = Number(m[2]);
  const b = Number(m[3]);
  let a = m[4] !== undefined ? parseFloat(m[4]) : 1;

  // Clamp alpha 0–1
  a = Math.max(0, Math.min(1, a));

  const toHex = (v) => {
    const n = Math.max(0, Math.min(255, Number(v)));
    return n.toString(16).padStart(2, '0');
  };

  const alphaByte = Math.round(a * 255);

  return `${toHex(r)}${toHex(g)}${toHex(b)}${toHex(alphaByte)}`.toUpperCase();
};

export {
  Hex2RGB,
  HexA2RGBA,
  RGB2Hex,
  RGBA2HexA
}