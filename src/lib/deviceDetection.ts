/**
 * Device Detection Utility
 * Optimized for Indian mobile market (Redmi, Samsung A/S series, Realme, etc.)
 */

export interface DeviceInfo {
  isLowEnd: boolean;
  isMidRange: boolean;
  isHighEnd: boolean;
  memoryGB: number | null;
  cores: number;
  connection: string;
  isMobile: boolean;
  isTablet: boolean;
  effectiveType: string;
}

/**
 * Detect device capabilities
 * Returns comprehensive device information for optimization decisions
 */
export function detectDevice(): DeviceInfo {
  const nav = navigator as any;
  
  // Memory detection (in GB)
  const memoryGB = nav.deviceMemory || null;
  
  // CPU cores
  const cores = nav.hardwareConcurrency || 4;
  
  // Network connection
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  const effectiveType = connection?.effectiveType || 'unknown';
  
  // Mobile/Tablet detection
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav.userAgent);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(nav.userAgent);
  
  // Device categorization for Indian market
  let isLowEnd = false;
  let isMidRange = false;
  let isHighEnd = false;
  
  if (memoryGB !== null) {
    // Memory-based detection
    if (memoryGB <= 3) {
      isLowEnd = true; // Budget phones (Redmi 9, Samsung A13, etc.)
    } else if (memoryGB <= 6) {
      isMidRange = true; // Most popular (Redmi Note 11/12, Samsung A34/A54)
    } else {
      isHighEnd = true; // Flagship (Samsung S series, premium devices)
    }
  } else {
    // Fallback to cores-based detection
    if (cores <= 4) {
      isLowEnd = true;
    } else if (cores <= 8) {
      isMidRange = true;
    } else {
      isHighEnd = true;
    }
  }
  
  return {
    isLowEnd,
    isMidRange,
    isHighEnd,
    memoryGB,
    cores,
    connection: effectiveType,
    isMobile,
    isTablet,
    effectiveType,
  };
}

/**
 * Check if device can handle heavy 3D content (Spline)
 */
export function canHandleSpline(): boolean {
  const device = detectDevice();
  
  // Don't load Spline on low-end devices
  if (device.isLowEnd) return false;
  
  // Load on mid-range and high-end
  if (device.isMidRange || device.isHighEnd) return true;
  
  // Default: allow on desktop
  return !device.isMobile;
}

/**
 * Check if we should use reduced animations
 */
export function shouldReduceMotion(): boolean {
  // Check user preference first
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return true;
  }
  
  const device = detectDevice();
  
  // Reduce motion on low-end devices
  return device.isLowEnd;
}

/**
 * Get optimal image quality based on device
 * Returns quality percentage (1-100)
 */
export function getImageQuality(): number {
  const device = detectDevice();
  
  if (device.isHighEnd) return 90; // High quality
  if (device.isMidRange) return 80; // Good quality
  return 70; // Acceptable quality for low-end
}

/**
 * Check if device is on slow network
 */
export function isSlowNetwork(): boolean {
  const device = detectDevice();
  
  // 2G or slow-2g
  if (device.effectiveType === '2g' || device.effectiveType === 'slow-2g') {
    return true;
  }
  
  return false;
}

/**
 * Get recommended lazy load threshold (in pixels)
 * How close to viewport before loading
 */
export function getLazyLoadThreshold(): number {
  const device = detectDevice();
  
  if (device.isHighEnd) return 300; // Load earlier on powerful devices
  if (device.isMidRange) return 200; // Default
  return 100; // Load late on low-end to save memory
}

/**
 * Log device info for debugging (only in development)
 */
export function logDeviceInfo(): void {
  if (import.meta.env.DEV) {
    const device = detectDevice();
    console.log('📱 Device Detection:', {
      category: device.isLowEnd ? 'Low-End' : device.isMidRange ? 'Mid-Range' : 'High-End',
      memory: device.memoryGB ? `${device.memoryGB}GB RAM` : 'Unknown',
      cores: `${device.cores} cores`,
      network: device.effectiveType,
      mobile: device.isMobile,
      canSpline: canHandleSpline(),
      reduceMotion: shouldReduceMotion(),
    });
  }
}
