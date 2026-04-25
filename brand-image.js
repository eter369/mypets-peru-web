const sharp = require('sharp');
const fs = require('fs');

const input = 'C:/Users/USUARIO/Downloads/crea_un_pomerania_202604240138.jpeg';
const output = 'C:/Users/USUARIO/Desktop/HOLA MUNDOOOO/images/pomerania-exotico.jpg';

async function brand() {
  const img = sharp(input);
  const meta = await img.metadata();
  const W = meta.width;
  const H = meta.height;

  // SVG overlay: green gradient bottom, title text, phone + MyPets Peru logo
  const svg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gg" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#2f7d2a" stop-opacity="0"/>
      <stop offset="40%" stop-color="#2f7d2a" stop-opacity="0.55"/>
      <stop offset="100%" stop-color="#20641c" stop-opacity="0.95"/>
    </linearGradient>
    <filter id="sh" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- faint M watermark top-left -->
  <g opacity="0.18" transform="translate(${Math.round(W*0.04)},${Math.round(H*0.05)})">
    <circle cx="70" cy="70" r="70" fill="#ffffff"/>
    <text x="70" y="100" text-anchor="middle" font-family="Impact, sans-serif" font-size="90" fill="#2f7d2a" font-weight="900">M</text>
  </g>

  <!-- bottom gradient band -->
  <rect x="0" y="${Math.round(H*0.62)}" width="${W}" height="${Math.round(H*0.38)}" fill="url(#gg)"/>

  <!-- Pomerania (white script) -->
  <text x="${Math.round(W*0.05)}" y="${Math.round(H*0.88)}"
        font-family="'Segoe Script','Brush Script MT',cursive"
        font-size="${Math.round(H*0.09)}" fill="#ffffff" font-weight="700"
        filter="url(#sh)">Pomerania</text>

  <!-- Exótico (yellow script) -->
  <text x="${Math.round(W*0.08)}" y="${Math.round(H*0.96)}"
        font-family="'Segoe Script','Brush Script MT',cursive"
        font-size="${Math.round(H*0.065)}" fill="#f3b904" font-weight="700"
        filter="url(#sh)">Exótico</text>

  <!-- MyPets Peru logo (top-right, text form) -->
  <g transform="translate(${Math.round(W*0.78)},${Math.round(H*0.06)})">
    <text x="0" y="50" font-family="'Segoe Script','Brush Script MT',cursive"
          font-size="${Math.round(H*0.07)}" fill="#ffffff" font-weight="900"
          filter="url(#sh)">My</text>
    <text x="${Math.round(W*0.02)}" y="${Math.round(H*0.08)}"
          font-family="'Segoe Script','Brush Script MT',cursive"
          font-size="${Math.round(H*0.07)}" fill="#ffffff" font-weight="900"
          filter="url(#sh)">Pets</text>
    <text x="${Math.round(W*0.05)}" y="${Math.round(H*0.13)}"
          font-family="Arial, sans-serif" letter-spacing="4"
          font-size="${Math.round(H*0.022)}" fill="#ffffff" font-weight="400">PERU</text>
  </g>

  <!-- Phone pill bottom-right -->
  <g transform="translate(${Math.round(W*0.56)},${Math.round(H*0.87)})">
    <text x="0" y="0" font-family="'Segoe Script','Brush Script MT',cursive"
          font-size="${Math.round(H*0.035)}" fill="#f3b904" font-weight="700">Contáctanos:</text>
    <rect x="0" y="15" rx="38" ry="38" width="${Math.round(W*0.4)}" height="${Math.round(H*0.075)}" fill="#2f7d2a"/>
    <circle cx="45" cy="${15 + Math.round(H*0.075/2)}" r="24" fill="#ffffff"/>
    <text x="45" y="${15 + Math.round(H*0.075/2) + 10}" text-anchor="middle" font-family="Arial" font-size="32" fill="#2f7d2a" font-weight="900">☎</text>
    <text x="90" y="${15 + Math.round(H*0.075/2) + 12}" font-family="Arial, sans-serif"
          font-size="${Math.round(H*0.042)}" fill="#ffffff" font-weight="800" letter-spacing="2">920 688 338</text>
  </g>
</svg>`;

  await img
    .composite([{ input: Buffer.from(svg), top: 0, left: 0 }])
    .jpeg({ quality: 88 })
    .toFile(output);

  console.log('OK ->', output);
}

brand().catch(e => { console.error(e); process.exit(1); });
