import React from 'react';

interface PlayerShapeProps {
  size: { width: number; height: number };
}

export const PlayerShape: React.FC<PlayerShapeProps> = ({ size }) => {
  const w = size.width;
  const h = size.height;

  return (
    <svg width={w} height={h} viewBox="0 0 50 40">
      {/* Main body - spaceship shape */}
      <path
        d={`M 25 2 L 45 35 L 35 35 L 30 25 L 20 25 L 15 35 L 5 35 Z`}
        fill="#00ff00"
        stroke="#00cc00"
        strokeWidth="1"
      />
      
      {/* Cockpit */}
      <ellipse cx="25" cy="18" rx="6" ry="8" fill="#00ccff" stroke="#0099cc" strokeWidth="1" />
      
      {/* Engine glow */}
      <ellipse cx="15" cy="36" rx="4" ry="2" fill="#ff6600" opacity="0.8">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite" />
      </ellipse>
      <ellipse cx="35" cy="36" rx="4" ry="2" fill="#ff6600" opacity="0.8">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="0.3s" repeatCount="indefinite" />
      </ellipse>
      
      {/* Wing details */}
      <line x1="10" y1="30" x2="15" y2="25" stroke="#00aa00" strokeWidth="1" />
      <line x1="40" y1="30" x2="35" y2="25" stroke="#00aa00" strokeWidth="1" />
      
      {/* Decorative lines */}
      <line x1="25" y1="2" x2="25" y2="15" stroke="#00aa00" strokeWidth="1" />
    </svg>
  );
};
