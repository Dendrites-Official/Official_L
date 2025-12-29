// src/components/ui/SkeletonLoader.tsx
import React from 'react';

interface SkeletonLoaderProps {
  variant?: 'section' | 'spline' | 'chart' | 'card' | 'text';
  height?: string;
  className?: string;
}

/**
 * Skeleton loader component for better loading UX
 * Provides visual feedback while content loads
 */
export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  variant = 'section',
  height = '50vh',
  className = ''
}) => {
  
  // Spline 3D Scene Skeleton
  if (variant === 'spline') {
    return (
      <div 
        className={`w-full h-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center ${className}`}
        style={{ minHeight: height }}
      >
        <div className="relative flex flex-col items-center gap-4">
          {/* Pulsing circle representing loading 3D object */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 animate-pulse" />
          
          {/* Loading text */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-4 w-48 bg-gray-700/50 rounded animate-pulse" />
            <div className="h-3 w-32 bg-gray-700/30 rounded animate-pulse delay-75" />
          </div>
          
          {/* Optional loading spinner */}
          <div className="mt-4 w-8 h-8 border-2 border-gray-600 border-t-blue-500 rounded-full animate-spin" />
        </div>
      </div>
    );
  }
  
  // Chart/Graph Skeleton
  if (variant === 'chart') {
    return (
      <div 
        className={`w-full bg-black/50 backdrop-blur-sm rounded-lg p-6 ${className}`}
        style={{ minHeight: height }}
      >
        <div className="space-y-4">
          {/* Chart title skeleton */}
          <div className="h-6 w-48 bg-gray-700/50 rounded animate-pulse" />
          
          {/* Chart bars/graph skeleton */}
          <div className="flex items-end justify-between gap-2 h-64">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i}
                className="flex-1 bg-gradient-to-t from-blue-500/20 to-purple-500/20 rounded-t animate-pulse"
                style={{ 
                  height: `${40 + Math.random() * 60}%`,
                  animationDelay: `${i * 100}ms`
                }}
              />
            ))}
          </div>
          
          {/* Legend skeleton */}
          <div className="flex gap-4 justify-center">
            <div className="h-4 w-24 bg-gray-700/30 rounded animate-pulse" />
            <div className="h-4 w-24 bg-gray-700/30 rounded animate-pulse delay-75" />
          </div>
        </div>
      </div>
    );
  }
  
  // Card Skeleton
  if (variant === 'card') {
    return (
      <div 
        className={`w-full bg-gray-900/30 backdrop-blur-sm rounded-xl p-6 ${className}`}
        style={{ minHeight: height }}
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-700/50 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-gray-700/50 rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-gray-700/30 rounded animate-pulse delay-75" />
            </div>
          </div>
          
          {/* Content lines */}
          <div className="space-y-2 pt-4">
            <div className="h-3 w-full bg-gray-700/30 rounded animate-pulse" />
            <div className="h-3 w-5/6 bg-gray-700/30 rounded animate-pulse delay-75" />
            <div className="h-3 w-4/6 bg-gray-700/30 rounded animate-pulse delay-100" />
          </div>
        </div>
      </div>
    );
  }
  
  // Text Skeleton
  if (variant === 'text') {
    return (
      <div className={`space-y-3 ${className}`}>
        <div className="h-4 w-full bg-gray-700/30 rounded animate-pulse" />
        <div className="h-4 w-5/6 bg-gray-700/30 rounded animate-pulse delay-75" />
        <div className="h-4 w-4/6 bg-gray-700/30 rounded animate-pulse delay-100" />
      </div>
    );
  }
  
  // Default Section Skeleton
  return (
    <div 
      className={`w-full bg-gradient-to-b from-black via-gray-900/50 to-black flex items-center justify-center ${className}`}
      style={{ minHeight: height }}
    >
      <div className="flex flex-col items-center gap-4 max-w-md px-6">
        {/* Icon/Logo placeholder */}
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg animate-pulse" />
        
        {/* Title placeholder */}
        <div className="space-y-2 w-full">
          <div className="h-6 w-3/4 mx-auto bg-gray-700/50 rounded animate-pulse" />
          <div className="h-4 w-1/2 mx-auto bg-gray-700/30 rounded animate-pulse delay-75" />
        </div>
        
        {/* Content placeholder */}
        <div className="space-y-2 w-full pt-4">
          <div className="h-3 w-full bg-gray-700/20 rounded animate-pulse delay-100" />
          <div className="h-3 w-5/6 mx-auto bg-gray-700/20 rounded animate-pulse delay-150" />
          <div className="h-3 w-4/6 mx-auto bg-gray-700/20 rounded animate-pulse delay-200" />
        </div>
      </div>
    </div>
  );
};

/**
 * Specialized skeleton for Spline 3D scenes
 */
export const SplineSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonLoader variant="spline" className={className} />
);

/**
 * Specialized skeleton for charts/graphs
 */
export const ChartSkeleton: React.FC<{ className?: string; height?: string }> = ({ className, height }) => (
  <SkeletonLoader variant="chart" className={className} height={height} />
);

/**
 * Specialized skeleton for card-style content
 */
export const CardSkeleton: React.FC<{ className?: string; height?: string }> = ({ className, height }) => (
  <SkeletonLoader variant="card" className={className} height={height} />
);

/**
 * Section loader for landing page sections
 */
export const SectionLoader: React.FC<{ className?: string }> = ({ className }) => (
  <SkeletonLoader variant="section" height="60vh" className={className} />
);

export default SkeletonLoader;
