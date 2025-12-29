#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts PNG/JPG images to optimized WebP format
 * Reduces bundle size by ~90% while maintaining visual quality
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  quality: 85, // WebP quality (0-100)
  effort: 6,   // Compression effort (0-6, higher = better compression but slower)
};

// Images to optimize (with their priorities)
const imagesToOptimize = [
  // High priority - largest files
  { input: 'public/logo_8k.png', output: 'public/logo_8k.webp' },
  { input: 'public/logo-nobg.png', output: 'public/logo-nobg.webp' },
  { input: 'public/logo1.png', output: 'public/logo1.webp' },
  { input: 'public/robottt.png', output: 'public/robottt.webp' },
  { input: 'public/page_end_cta.png', output: 'public/page_end_cta.webp' },
  { input: 'public/SRL_spline.png', output: 'public/SRL_spline.webp' },
  { input: 'public/backgrounddndx.png', output: 'public/backgrounddndx.webp' },
  { input: 'public/hero_spline.png', output: 'public/hero_spline.webp' },
  { input: 'public/image.png', output: 'public/image.webp' },
  { input: 'public/logo3.png', output: 'public/logo3.webp' },
  { input: 'public/SyncG1.png', output: 'public/SyncG1.webp' },
  { input: 'public/logo2.png', output: 'public/logo2.webp' },
  { input: 'public/looogo3.png', output: 'public/looogo3.webp' },
  { input: 'public/looogo2.png', output: 'public/looogo2.webp' },
  { input: 'public/chatbot.png', output: 'public/chatbot.webp' },
  
  // Logosmarquee - all PNG files
  { input: 'public/logosmarquee/bitcoin.png', output: 'public/logosmarquee/bitcoin.webp' },
  { input: 'public/logosmarquee/bnb.png', output: 'public/logosmarquee/bnb.webp' },
  { input: 'public/logosmarquee/dodge.png', output: 'public/logosmarquee/dodge.webp' },
  { input: 'public/logosmarquee/eth.png', output: 'public/logosmarquee/eth.webp' },
  { input: 'public/logosmarquee/polygon.png', output: 'public/logosmarquee/polygon.webp' },
  { input: 'public/logosmarquee/red.png', output: 'public/logosmarquee/red.webp' },
  { input: 'public/logosmarquee/solona.png', output: 'public/logosmarquee/solona.webp' },
  
  // JPG files (lower priority as they're already compressed)
  { input: 'public/airdrop1.jpg', output: 'public/airdrop1.webp' },
  { input: 'public/FinalAlien.jpg', output: 'public/FinalAlien.webp' },
  { input: 'public/looogo.jpg', output: 'public/looogo.webp' },
  { input: 'public/Robotgen.jpg', output: 'public/Robotgen.webp' },
  { input: 'public/logo2.jpg', output: 'public/logo2.webp' },
  { input: 'public/DX.jpg', output: 'public/DX.webp' },
  { input: 'public/logo3.jpg', output: 'public/logo3.webp' },
];

async function optimizeImage(inputPath, outputPath) {
  try {
    const fullInputPath = path.resolve(inputPath);
    const fullOutputPath = path.resolve(outputPath);
    
    // Check if input file exists
    if (!fs.existsSync(fullInputPath)) {
      console.log(`⏭️  Skipping: ${inputPath} (file not found)`);
      return { success: false, skipped: true };
    }
    
    // Check if output already exists
    if (fs.existsSync(fullOutputPath)) {
      console.log(`⏭️  Skipping: ${outputPath} (already exists)`);
      return { success: false, skipped: true };
    }
    
    // Get original file size
    const originalStats = fs.statSync(fullInputPath);
    const originalSize = originalStats.size;
    
    // Convert to WebP
    await sharp(fullInputPath)
      .webp({
        quality: config.quality,
        effort: config.effort,
      })
      .toFile(fullOutputPath);
    
    // Get new file size
    const newStats = fs.statSync(fullOutputPath);
    const newSize = newStats.size;
    
    // Calculate savings
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    const originalSizeMB = (originalSize / 1024 / 1024).toFixed(2);
    const newSizeMB = (newSize / 1024 / 1024).toFixed(2);
    
    console.log(`✅ ${inputPath}`);
    console.log(`   ${originalSizeMB}MB → ${newSizeMB}MB (${savings}% smaller)`);
    
    return {
      success: true,
      originalSize,
      newSize,
      savings: parseFloat(savings),
    };
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message);
    return { success: false, error: error.message };
  }
}

async function main() {
  console.log('🖼️  Image Optimization Starting...\n');
  console.log(`📊 Total images to process: ${imagesToOptimize.length}\n`);
  
  const results = [];
  let totalOriginalSize = 0;
  let totalNewSize = 0;
  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;
  
  // Process images sequentially to avoid memory issues
  for (const { input, output } of imagesToOptimize) {
    const result = await optimizeImage(input, output);
    results.push(result);
    
    if (result.success) {
      totalOriginalSize += result.originalSize;
      totalNewSize += result.newSize;
      successCount++;
    } else if (result.skipped) {
      skippedCount++;
    } else {
      errorCount++;
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📈 OPTIMIZATION SUMMARY');
  console.log('='.repeat(60));
  console.log(`✅ Successfully optimized: ${successCount} images`);
  console.log(`⏭️  Skipped: ${skippedCount} images`);
  console.log(`❌ Errors: ${errorCount} images`);
  
  if (successCount > 0) {
    const totalOriginalMB = (totalOriginalSize / 1024 / 1024).toFixed(2);
    const totalNewMB = (totalNewSize / 1024 / 1024).toFixed(2);
    const totalSavings = ((totalOriginalSize - totalNewSize) / totalOriginalSize * 100).toFixed(1);
    
    const savedMB = ((totalOriginalSize - totalNewSize) / 1024 / 1024).toFixed(2);
    
    console.log('\n💾 SIZE REDUCTION:');
    console.log(`   Original: ${totalOriginalMB} MB`);
    console.log(`   Optimized: ${totalNewMB} MB`);
    console.log(`   Saved: ${savedMB} MB (${totalSavings}% reduction)`);
  }
  
  console.log('\n✨ Optimization complete!\n');
  
  if (successCount > 0) {
    console.log('📝 NEXT STEPS:');
    console.log('1. Update component imports to use .webp files');
    console.log('2. Test images in browser (all modern browsers support WebP)');
    console.log('3. Optionally remove original PNG/JPG files after verification');
    console.log('4. Run: npm run build (to see new bundle size)\n');
  }
}

main().catch(console.error);
