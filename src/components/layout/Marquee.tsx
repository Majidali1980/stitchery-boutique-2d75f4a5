
import React from 'react';

interface MarqueeProps {
  text: string;
  speed?: 'slow' | 'normal' | 'fast';
  className?: string;
}

const Marquee: React.FC<MarqueeProps> = ({ 
  text,
  speed = 'normal',
  className = ''
}) => {
  const getAnimationDuration = () => {
    switch (speed) {
      case 'slow': return '30s';
      case 'fast': return '15s';
      default: return '20s';
    }
  };

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className="inline-block animate-marquee"
        style={{ 
          animationDuration: getAnimationDuration(),
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite'
        }}
      >
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
