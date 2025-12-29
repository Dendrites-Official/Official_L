#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

console.log('🖼️  Image Optimization Resuming...\n');

const publicDir = path.join(__dirname, 'public');
const logosMarqueeDir = path.join(publicDir, 'logosmarquee');

// Get all PNG files
const publicPngs = fs.readdirSync(publicDir)
  .filter(file => file.endsWith('.png'))
  .map(file => path.join(publicDir, file));

const marqueePngs = fs.existsSync(logosMarqueeDir) 
  ? fs.readdirSync(logosMarqueeDir)
      .filter(file => file.endsWith('.png'))
      .map(file => path.join(logosMarqueeDir, file))
  : [];

const allPngs = [...publicPngs, ...marqueePngs];

console.log(`📊 Total images to process: ${allPngs.length}\n`);

let completed = 0;
let skipped = 0;
let totalSavings = 0;

async function convertImage(pngPath) {
  const webpPath = pngPath.replace('.png', '.webp');
  
  // Skip if WebP already exists
  if (fs.existsSync(webpPath)) {
    skipped++;
    console.log(`⏭️  Skipped: ${path.basename(pngPath)} (WebP exists)`);
    return;
  }

  try {
    const originalSize = fs.statSync(pngPath).size;
    
    await sharp(pngPath)
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
    
    const newSize = fs.statSync(webpPath).size;
    const savings = originalSize - newSize;
    const percent = ((savings / originalSize) * 100).toFixed(1);
    
    totalSavings += savings;
    completed++;
    
    console.log(`✅ ${path.basename(pngPath)}`);
    console.log(`   ${formatBytes(originalSize)} → ${formatBytes(newSize)} (${percent}% smaller)\n`);
  } catch (error) {
    console.error(`❌ Failed: ${path.basename(pngPath)} - ${error.message}\n`);
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + 'B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + 'KB';
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
}

async function convertAll() {
  for (const pngPath of allPngs) {
    await convertImage(pngPath);
  }
  
  console.log('\n🎉 Conversion Complete!\n');
  console.log(`✅ Converted: ${completed} images`);
  console.log(`⏭️  Skipped: ${skipped} images (already WebP)`);
  console.log(`💾 Total savings: ${formatBytes(totalSavings)}\n`);
  console.log('📝 Next step: Update component imports to use .webp files\n');
}

convertAll().catch(console.error);
