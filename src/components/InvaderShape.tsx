import React from 'react';

interface InvaderShapeProps {
  type: number;
  size: { width: number; height: number };
  health: number;
  maxHealth: number;
}

export const InvaderShape: React.FC<InvaderShapeProps> = ({ type, size, health, maxHealth }) => {
  const healthRatio = health / maxHealth;
  const opacity = 0.5 + healthRatio * 0.5;
  
  // Different colors for different types
  const colors = ['#ff0066', '#ff6600', '#ffcc00', '#00ff66', '#0066ff'];
  const color = colors[(type - 1) % colors.length];

  const renderShape = () => {
    const w = size.width;
    const h = size.height;
    
    switch (type) {
      case 1: // Classic space invader (crab-like)
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <path
              d={`M 5 25 L 5 15 L 10 10 L 15 10 L 15 5 L 25 5 L 25 10 L 30 10 L 35 15 L 35 25 L 30 20 L 25 25 L 20 20 L 15 25 L 10 20 L 5 25 Z`}
              fill={color}
              stroke={color}
              strokeWidth="1"
            />
            <rect x="12" y="12" width="4" height="4" fill="#000" />
            <rect x="24" y="12" width="4" height="4" fill="#000" />
          </svg>
        );
        
      case 2: // Octopus-like
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <ellipse cx="20" cy="12" rx="12" ry="10" fill={color} style={{ opacity }} />
            <path
              d={`M 8 18 Q 5 25 8 28 M 14 20 Q 12 27 15 29 M 20 22 Q 20 28 20 30 M 26 20 Q 28 27 25 29 M 32 18 Q 35 25 32 28`}
              stroke={color}
              strokeWidth="3"
              fill="none"
              style={{ opacity }}
            />
            <circle cx="14" cy="10" r="3" fill="#000" />
            <circle cx="26" cy="10" r="3" fill="#000" />
          </svg>
        );
        
      case 3: // Squid-like
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <path
              d={`M 20 2 L 10 8 L 8 15 L 10 22 L 15 25 L 12 28 M 20 2 L 30 8 L 32 15 L 30 22 L 25 25 L 28 28 M 20 2 L 20 8`}
              stroke={color}
              strokeWidth="3"
              fill={color}
              style={{ opacity }}
            />
            <ellipse cx="20" cy="12" rx="8" ry="6" fill={color} style={{ opacity }} />
            <circle cx="16" cy="11" r="2" fill="#000" />
            <circle cx="24" cy="11" r="2" fill="#000" />
          </svg>
        );
        
      case 4: // UFO-style
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <ellipse cx="20" cy="20" rx="18" ry="6" fill={color} style={{ opacity }} />
            <ellipse cx="20" cy="15" rx="10" ry="8" fill={color} style={{ opacity: opacity * 0.8 }} />
            <circle cx="20" cy="10" r="6" fill={color} style={{ opacity }} />
            <circle cx="20" cy="8" r="3" fill="#000" />
            <circle cx="8" cy="20" r="2" fill="#ffff00" style={{ opacity: 0.7 }} />
            <circle cx="14" cy="22" r="2" fill="#ffff00" style={{ opacity: 0.7 }} />
            <circle cx="20" cy="23" r="2" fill="#ffff00" style={{ opacity: 0.7 }} />
            <circle cx="26" cy="22" r="2" fill="#ffff00" style={{ opacity: 0.7 }} />
            <circle cx="32" cy="20" r="2" fill="#ffff00" style={{ opacity: 0.7 }} />
          </svg>
        );
        
      case 5: // Boss invader (mechanical)
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <rect x="5" y="5" width="30" height="20" rx="2" fill={color} style={{ opacity }} />
            <rect x="10" y="8" width="8" height="6" fill="#000" />
            <rect x="22" y="8" width="8" height="6" fill="#000" />
            <rect x="15" y="18" width="10" height="4" fill="#ff0000" style={{ opacity: 0.7 }} />
            <line x1="5" y1="5" x2="2" y2="2" stroke={color} strokeWidth="2" />
            <line x1="35" y1="5" x2="38" y2="2" stroke={color} strokeWidth="2" />
            <line x1="5" y1="25" x2="2" y2="28" stroke={color} strokeWidth="2" />
            <line x1="35" y1="25" x2="38" y2="28" stroke={color} strokeWidth="2" />
          </svg>
        );
        
      default:
        return (
          <svg width={w} height={h} viewBox="0 0 40 30" style={{ opacity }}>
            <rect x="5" y="5" width="30" height="20" fill={color} style={{ opacity }} />
          </svg>
        );
    }
  };

  return (
    <div className="invader-shape">
      {renderShape()}
    </div>
  );
};
