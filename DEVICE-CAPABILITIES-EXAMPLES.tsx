// EXAMPLE: How to use the new Device Capabilities feature
// This file shows practical examples - you can integrate these patterns into your existing components

import { useDeviceCapabilities, shouldUseSpline, shouldDisableHeavyFeatures } from '@/lib/deviceCapabilities';

/**
 * EXAMPLE 1: Simple usage in a component
 * This automatically detects device capabilities and adjusts rendering
 */
export function ExampleSplineComponent() {
  const capabilities = useDeviceCapabilities();
  
  if (!capabilities) {
    return <div>Loading...</div>;
  }
  
  // Automatically decide whether to show 3D or fallback image
  const use3D = shouldUseSpline(capabilities);
  
  return (
    <div>
      {use3D ? (
        <Spline scene="your-scene.splinecode" />
      ) : (
        <img src="/fallback-image.png" alt="Fallback" />
      )}
      
      {/* Show device info for debugging */}
      <div className="text-xs text-gray-500">
        Device: {capabilities.isMobile ? 'Mobile' : capabilities.isTablet ? 'Tablet' : 'Desktop'}<br/>
        Tier: {capabilities.tier}<br/>
        WebGL2: {capabilities.hasWebGL2 ? 'Yes' : 'No'}
      </div>
    </div>
  );
}

/**
 * EXAMPLE 2: Conditional animations based on device power
 */
export function ExampleAnimatedComponent() {
  const capabilities = useDeviceCapabilities();
  const heavyFeaturesDisabled = capabilities ? shouldDisableHeavyFeatures(capabilities) : true;
  
  return (
    <motion.div
      animate={{ 
        opacity: 1,
        // Only do complex animations on powerful devices
        y: heavyFeaturesDisabled ? 0 : [0, -10, 0],
        scale: heavyFeaturesDisabled ? 1 : [1, 1.05, 1]
      }}
      transition={{ 
        duration: heavyFeaturesDisabled ? 0.2 : 0.8,
        ease: 'easeOut'
      }}
    >
      Content here
    </motion.div>
  );
}

/**
 * EXAMPLE 3: Show different content based on device tier
 */
export function ExampleTieredContent() {
  const capabilities = useDeviceCapabilities();
  
  if (!capabilities) return null;
  
  switch (capabilities.tier) {
    case 'high-end':
      return <HighQualityExperience />;
    case 'mid-range':
      return <StandardExperience />;
    case 'low-end':
      return <LightweightExperience />;
    default:
      return <StandardExperience />;
  }
}

/**
 * EXAMPLE 4: Respect user's data saver preference
 */
export function ExampleDataAwareComponent() {
  const capabilities = useDeviceCapabilities();
  
  // Don't autoplay videos or load heavy assets if user has data saver on
  const shouldLoadHeavyAssets = capabilities && !capabilities.saveData;
  
  return (
    <div>
      {shouldLoadHeavyAssets ? (
        <video autoPlay loop muted>
          <source src="/heavy-video.mp4" type="video/mp4" />
        </video>
      ) : (
        <img src="/lightweight-poster.jpg" alt="Video poster" />
      )}
    </div>
  );
}

/**
 * EXAMPLE 5: Non-reactive usage (for one-time checks)
 */
import { getCachedCapabilities } from '@/lib/deviceCapabilities';

export function handleClick() {
  const caps = getCachedCapabilities();
  
  if (caps.isMobile) {
    console.log('Mobile user clicked!');
  } else {
    console.log('Desktop user clicked!');
  }
}

/**
 * EXAMPLE 6: Replace old user-agent checks
 * 
 * OLD WAY (unreliable):
 * const isMobile = /iPhone|iPad|Android/i.test(navigator.userAgent);
 * 
 * NEW WAY (reliable):
 */
export function ModernMobileCheck() {
  const capabilities = useDeviceCapabilities();
  
  return (
    <div>
      {capabilities?.isMobile && <MobileLayout />}
      {capabilities?.isDesktop && <DesktopLayout />}
    </div>
  );
}

// Placeholder components for examples
function Spline({ scene }: { scene: string }) { return <div>Spline: {scene}</div>; }
function HighQualityExperience() { return <div>High Quality</div>; }
function StandardExperience() { return <div>Standard</div>; }
function LightweightExperience() { return <div>Lightweight</div>; }
function MobileLayout() { return <div>Mobile Layout</div>; }
function DesktopLayout() { return <div>Desktop Layout</div>; }
