// src/lib/deviceCapabilities.ts
/**
 * Modern device capability detection using feature detection instead of user-agent sniffing
 * This is more reliable and future-proof than checking navigator.userAgent
 */

export type DeviceTier = 'high-end' | 'mid-range' | 'low-end' | 'unknown';

export interface DeviceCapabilities {
  // Hardware & Performance
  hasWebGL: boolean;
  hasWebGL2: boolean;
  hasTouch: boolean;
  hardwareConcurrency: number; // CPU cores
  deviceMemory: number | undefined; // GB of RAM (if available)
  
  // Display
  isHighDPI: boolean; // Retina/high-res displays
  screenWidth: number;
  screenHeight: number;
  
  // Browser Features
  hasServiceWorker: boolean;
  hasOfflineStorage: boolean;
  hasWebAssembly: boolean;
  
  // Network
  connectionType: string | undefined; // '4g', 'wifi', etc.
  saveData: boolean; // User has data saver mode on
  
  // Device Type (inferred from features, not user-agent)
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  
  // Performance Tier
  tier: DeviceTier;
}

/**
 * Detect WebGL support and version
 */
function detectWebGL(): { hasWebGL: boolean; hasWebGL2: boolean } {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');
    return {
      hasWebGL: !!gl,
      hasWebGL2: !!gl2,
    };
  } catch (e) {
    return { hasWebGL: false, hasWebGL2: false };
  }
}

/**
 * Detect touch support (mobile/tablet)
 */
function detectTouch(): boolean {
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    // @ts-ignore - legacy IE
    (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 0)
  );
}

/**
 * Detect high DPI displays (Retina, 4K, etc.)
 */
function detectHighDPI(): boolean {
  return (
    window.devicePixelRatio > 1 ||
    (window.matchMedia && window.matchMedia('(min-resolution: 2dppx)').matches)
  );
}

/**
 * Get network connection info (if available)
 */
function getConnectionInfo(): { type: string | undefined; saveData: boolean } {
  // @ts-ignore - Experimental API
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  return {
    type: conn?.effectiveType, // '4g', '3g', '2g', 'slow-2g'
    saveData: conn?.saveData || false,
  };
}

/**
 * Determine device tier based on capabilities
 */
function calculateDeviceTier(
  webgl: { hasWebGL: boolean; hasWebGL2: boolean },
  cores: number,
  memory: number | undefined,
  width: number
): DeviceTier {
  // High-end: Modern devices with good specs
  if (
    webgl.hasWebGL2 &&
    cores >= 4 &&
    (memory === undefined || memory >= 4) &&
    width >= 1024
  ) {
    return 'high-end';
  }
  
  // Low-end: Older or budget devices
  if (
    !webgl.hasWebGL ||
    cores <= 2 ||
    (memory !== undefined && memory < 2) ||
    width < 375
  ) {
    return 'low-end';
  }
  
  // Mid-range: Everything else
  if (webgl.hasWebGL && cores >= 2) {
    return 'mid-range';
  }
  
  return 'unknown';
}

/**
 * Detect device type based on screen size and touch
 * More reliable than user-agent sniffing
 */
function detectDeviceType(hasTouch: boolean, width: number, height: number): {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
} {
  // Mobile: Touch + small screen
  const isMobile = hasTouch && width < 768;
  
  // Tablet: Touch + medium-large screen
  const isTablet = hasTouch && width >= 768 && width < 1024;
  
  // Desktop: No touch OR very large screen
  const isDesktop = !hasTouch || width >= 1024;
  
  return { isMobile, isTablet, isDesktop };
}

/**
 * Get comprehensive device capabilities
 * Call this once on app load and cache the result
 */
export function getDeviceCapabilities(): DeviceCapabilities {
  const webgl = detectWebGL();
  const hasTouch = detectTouch();
  const isHighDPI = detectHighDPI();
  const { type: connectionType, saveData } = getConnectionInfo();
  
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  // @ts-ignore - Experimental API
  const hardwareConcurrency = navigator.hardwareConcurrency || 2;
  // @ts-ignore - Experimental API
  const deviceMemory = navigator.deviceMemory; // GB of RAM (Chrome only)
  
  const tier = calculateDeviceTier(webgl, hardwareConcurrency, deviceMemory, screenWidth);
  const deviceType = detectDeviceType(hasTouch, screenWidth, screenHeight);
  
  return {
    // Hardware
    hasWebGL: webgl.hasWebGL,
    hasWebGL2: webgl.hasWebGL2,
    hasTouch,
    hardwareConcurrency,
    deviceMemory,
    
    // Display
    isHighDPI,
    screenWidth,
    screenHeight,
    
    // Browser
    hasServiceWorker: 'serviceWorker' in navigator,
    hasOfflineStorage: 'localStorage' in window && 'indexedDB' in window,
    hasWebAssembly: typeof WebAssembly !== 'undefined',
    
    // Network
    connectionType,
    saveData,
    
    // Device Type
    ...deviceType,
    
    // Performance Tier
    tier,
  };
}

/**
 * Hook for React components
 */
import { useState, useEffect } from 'react';

export function useDeviceCapabilities(): DeviceCapabilities | null {
  const [capabilities, setCapabilities] = useState<DeviceCapabilities | null>(null);
  
  useEffect(() => {
    // Detect on mount
    const caps = getDeviceCapabilities();
    setCapabilities(caps);
    
    // Re-detect on resize (for orientation changes, window resize)
    let timeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        setCapabilities(getDeviceCapabilities());
      }, 250);
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeout);
    };
  }, []);
  
  return capabilities;
}

/**
 * Helper: Should we disable heavy features for this device?
 */
export function shouldDisableHeavyFeatures(capabilities: DeviceCapabilities): boolean {
  return (
    capabilities.tier === 'low-end' ||
    capabilities.saveData ||
    (!capabilities.hasWebGL && capabilities.isMobile)
  );
}

/**
 * Helper: Should we use 3D/Spline scenes?
 */
export function shouldUseSpline(capabilities: DeviceCapabilities): boolean {
  return (
    capabilities.tier === 'high-end' ||
    (capabilities.tier === 'mid-range' && capabilities.isDesktop && capabilities.hasWebGL2)
  );
}

/**
 * Helper: Should we use complex animations?
 */
export function shouldUseComplexAnimations(capabilities: DeviceCapabilities): boolean {
  return (
    capabilities.tier !== 'low-end' &&
    !capabilities.saveData &&
    capabilities.hardwareConcurrency >= 4
  );
}

/**
 * Legacy compatibility: Simple mobile check
 * Use for quick checks where you just need mobile vs desktop
 */
export function isMobileDevice(): boolean {
  const caps = getDeviceCapabilities();
  return caps.isMobile;
}

/**
 * Export a singleton instance for non-reactive usage
 */
let cachedCapabilities: DeviceCapabilities | null = null;

export function getCachedCapabilities(): DeviceCapabilities {
  if (!cachedCapabilities) {
    cachedCapabilities = getDeviceCapabilities();
  }
  return cachedCapabilities;
}

/**
 * Invalidate cache (call on major viewport changes)
 */
export function invalidateCapabilitiesCache(): void {
  cachedCapabilities = null;
}
