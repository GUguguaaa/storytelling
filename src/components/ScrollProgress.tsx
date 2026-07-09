interface ScrollProgressProps {
  progress: number;
}

export default function ScrollProgress({ progress }: ScrollProgressProps) {
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      {/* Progress bar */}
      <div 
        className="h-full bg-gradient-to-r from-coco-orange-gold via-coco-yellow-bright to-coco-orange-warm transition-all duration-150"
        style={{ width: `${progress}%` }}
      />
      
      {/* Glow effect */}
      <div 
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-coco-orange-gold/50 to-transparent"
        style={{ 
          left: `${progress}%`,
          transform: 'translateX(-50%)',
          filter: 'blur(4px)'
        }}
      />
    </div>
  );
}
