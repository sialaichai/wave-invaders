import type { Player, Bullet, Invader, Particle } from '@/types/game';
import { InvaderShape } from './InvaderShape';
import { PlayerShape } from './PlayerShape';

interface GameCanvasProps {
  player: Player;
  bullets: Bullet[];
  invaders: Invader[];
  particles: Particle[];
  enemyBullets: Bullet[];
  gameWidth: number;
  gameHeight: number;
}

export const GameCanvas: React.FC<GameCanvasProps> = ({
  player,
  bullets,
  invaders,
  particles,
  enemyBullets,
  gameWidth,
  gameHeight
}) => {
  return (
    <div 
      className="relative bg-slate-950 border-4 border-cyan-500/50 rounded-lg overflow-hidden"
      style={{ width: gameWidth, height: gameHeight }}
    >
      {/* Starfield background */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Grid lines for retro effect */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Player */}
      <div
        className="absolute"
        style={{
          left: player.position.x,
          top: player.position.y,
          width: player.size.width,
          height: player.size.height
        }}
      >
        <PlayerShape size={player.size} />
      </div>

      {/* Player bullets */}
      {bullets.map(bullet => (
        <div
          key={bullet.id}
          className="absolute rounded-full"
          style={{
            left: bullet.position.x,
            top: bullet.position.y,
            width: bullet.size.width,
            height: bullet.size.height,
            background: 'linear-gradient(to top, #00ff00, #ccffcc)',
            boxShadow: '0 0 8px #00ff00'
          }}
        />
      ))}

      {/* Enemy bullets */}
      {enemyBullets.map(bullet => (
        <div
          key={bullet.id}
          className="absolute rounded-full"
          style={{
            left: bullet.position.x,
            top: bullet.position.y,
            width: bullet.size.width,
            height: bullet.size.height,
            background: 'linear-gradient(to bottom, #ff0000, #ff6666)',
            boxShadow: '0 0 8px #ff0000'
          }}
        />
      ))}

      {/* Invaders */}
      {invaders.map(invader => (
        <div
          key={invader.id}
          className="absolute"
          style={{
            left: invader.position.x,
            top: invader.position.y,
            width: invader.size.width,
            height: invader.size.height
          }}
        >
          <InvaderShape 
            type={invader.type} 
            size={invader.size}
            health={invader.health}
            maxHealth={invader.maxHealth}
          />
        </div>
      ))}

      {/* Particles */}
      {particles.map(particle => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: particle.position.x,
            top: particle.position.y,
            width: particle.size,
            height: particle.size,
            backgroundColor: particle.color,
            opacity: particle.life / particle.maxLife,
            boxShadow: `0 0 ${particle.size}px ${particle.color}`
          }}
        />
      ))}

      {/* Scanline effect */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.1),
            rgba(0, 0, 0, 0.1) 1px,
            transparent 1px,
            transparent 2px
          )`
        }}
      />
    </div>
  );
};
