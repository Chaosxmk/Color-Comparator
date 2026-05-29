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

export {
  Hex2RGB,
  RGB2Hex
}