// COPY AND PASTE THIS INTO YOUR BROWSER CONSOLE (F12)
// This will tell us EXACTLY what's blocking scroll on mobile

console.clear();
console.log('%c🔍 MOBILE SCROLL DEBUGGER 🔍', 'font-size: 20px; font-weight: bold; color: #00ff00;');
console.log('');

const html = document.documentElement;
const body = document.body;
const width = window.innerWidth;

console.log('📱 VIEWPORT INFO:');
console.log(`   Screen Width: ${width}px`);
console.log(`   Is Mobile (<= 700px): ${width <= 700 ? '✅ YES' : '❌ NO'}`);
console.log('');

console.log('📄 HTML ELEMENT:');
console.log(`   Classes: "${html.className}"`);
console.log(`   Has intro-open: ${html.classList.contains('intro-open') ? '⚠️ YES' : '✅ NO'}`);
console.log(`   Has lenis: ${html.classList.contains('lenis') ? '⚠️ YES' : '✅ NO'}`);
console.log(`   Has lenis-stopped: ${html.classList.contains('lenis-stopped') ? '⚠️ YES (BLOCKING!)' : '✅ NO'}`);
console.log(`   Inline overflow: "${html.style.overflow}"`);
console.log(`   Computed overflow-y: ${getComputedStyle(html).overflowY}`);
console.log(`   Computed position: ${getComputedStyle(html).position}`);
console.log(`   Computed height: ${getComputedStyle(html).height}`);
console.log('');

console.log('🎯 BODY ELEMENT:');
console.log(`   Inline overflow: "${body.style.overflow}"`);
console.log(`   Inline position: "${body.style.position}" ${body.style.position === 'fixed' ? '⚠️ (BLOCKING!)' : ''}`);
console.log(`   Computed overflow-y: ${getComputedStyle(body).overflowY}`);
console.log(`   Computed position: ${getComputedStyle(body).position}`);
console.log(`   Computed height: ${getComputedStyle(body).height}`);
console.log('');

console.log('📏 SCROLL MEASUREMENTS:');
console.log(`   Document height: ${document.documentElement.scrollHeight}px`);
console.log(`   Window height: ${window.innerHeight}px`);
console.log(`   Scrollable: ${document.documentElement.scrollHeight > window.innerHeight ? '✅ YES' : '❌ NO'}`);
console.log(`   Current scroll Y: ${window.scrollY}px`);
console.log('');

console.log('🧪 TESTING SCROLL...');
const before = window.scrollY;
window.scrollTo(0, 300);

setTimeout(() => {
  const after = window.scrollY;
  console.log(`   Before scroll: ${before}px`);
  console.log(`   After scroll: ${after}px`);
  console.log(`   Scroll worked: ${after > before ? '✅ YES' : '❌ NO (BLOCKED!)'}`);
  
  if (after <= before && document.documentElement.scrollHeight > window.innerHeight) {
    console.log('');
    console.log('%c❌ SCROLL IS BLOCKED! Here\'s why:', 'font-size: 16px; font-weight: bold; color: #ff0000;');
    
    const blockers = [];
    
    if (html.classList.contains('intro-open')) {
      blockers.push('❌ HTML has class "intro-open"');
    }
    if (html.classList.contains('lenis-stopped')) {
      blockers.push('❌ HTML has class "lenis-stopped" (Lenis smooth scroll library)');
    }
    if (body.style.position === 'fixed') {
      blockers.push('❌ BODY has inline style position: fixed');
    }
    if (body.style.overflow === 'hidden') {
      blockers.push('❌ BODY has inline style overflow: hidden');
    }
    if (html.style.overflow === 'hidden') {
      blockers.push('❌ HTML has inline style overflow: hidden');
    }
    if (getComputedStyle(body).overflowY === 'hidden') {
      blockers.push('❌ BODY computed overflow-y: hidden (check CSS)');
    }
    
    // Check for mobile menu
    const menuOpen = document.querySelector('#mobile-menu-panel');
    if (menuOpen && window.getComputedStyle(menuOpen).display !== 'none') {
      blockers.push('⚠️ Mobile menu might be open (locks scroll)');
    }
    
    blockers.forEach(b => console.log(`   ${b}`));
    
    console.log('');
    console.log('%c💡 SUGGESTED FIXES:', 'font-size: 14px; font-weight: bold; color: #ffaa00;');
    console.log('   1. Clear sessionStorage: sessionStorage.clear()');
    console.log('   2. Remove intro-open: document.documentElement.classList.remove("intro-open")');
    console.log('   3. Remove lenis-stopped: document.documentElement.classList.remove("lenis-stopped")');
    console.log('   4. Fix body position: document.body.style.position = ""');
    console.log('   5. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+F5 (Windows)');
  } else {
    console.log('');
    console.log('%c✅ SCROLLING WORKS!', 'font-size: 16px; font-weight: bold; color: #00ff00;');
  }
  
  // Scroll back
  window.scrollTo(0, 0);
}, 500);
