import { useCallback, useRef } from 'react';

type SoundType = 'shoot' | 'hit' | 'correct' | 'wrong' | 'damage' | 'gameover' | 'start' | 'levelup';

export function useSound() {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playTone = useCallback((frequency: number, duration: number, type: OscillatorType = 'square') => {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  }, [getAudioContext]);

  const playShootSound = useCallback(() => {
    playTone(800, 0.1, 'square');
  }, [playTone]);

  const playHitSound = useCallback(() => {
    playTone(400, 0.15, 'sawtooth');
    setTimeout(() => playTone(300, 0.1, 'sawtooth'), 50);
  }, [playTone]);

  const playCorrectSound = useCallback(() => {
    playTone(523.25, 0.1, 'sine'); // C5
    setTimeout(() => playTone(659.25, 0.1, 'sine'), 100); // E5
    setTimeout(() => playTone(783.99, 0.2, 'sine'), 200); // G5
  }, [playTone]);

  const playWrongSound = useCallback(() => {
    playTone(200, 0.2, 'sawtooth');
    setTimeout(() => playTone(150, 0.3, 'sawtooth'), 150);
  }, [playTone]);

  const playDamageSound = useCallback(() => {
    playTone(100, 0.3, 'sawtooth');
    setTimeout(() => playTone(80, 0.2, 'sawtooth'), 100);
  }, [playTone]);

  const playGameOverSound = useCallback(() => {
    playTone(400, 0.2, 'sawtooth');
    setTimeout(() => playTone(300, 0.2, 'sawtooth'), 200);
    setTimeout(() => playTone(200, 0.3, 'sawtooth'), 400);
    setTimeout(() => playTone(100, 0.5, 'sawtooth'), 600);
  }, [playTone]);

  const playStartSound = useCallback(() => {
    playTone(440, 0.1, 'square'); // A4
    setTimeout(() => playTone(554, 0.1, 'square'), 100); // C#5
    setTimeout(() => playTone(659, 0.1, 'square'), 200); // E5
    setTimeout(() => playTone(880, 0.3, 'square'), 300); // A5
  }, [playTone]);

  const playLevelUpSound = useCallback(() => {
    playTone(523.25, 0.1, 'square'); // C5
    setTimeout(() => playTone(659.25, 0.1, 'square'), 100); // E5
    setTimeout(() => playTone(783.99, 0.1, 'square'), 200); // G5
    setTimeout(() => playTone(1046.5, 0.2, 'square'), 300); // C6
  }, [playTone]);

  const playSound = useCallback((type: SoundType) => {
    // Resume audio context if suspended (browser policy)
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    switch (type) {
      case 'shoot':
        playShootSound();
        break;
      case 'hit':
        playHitSound();
        break;
      case 'correct':
        playCorrectSound();
        break;
      case 'wrong':
        playWrongSound();
        break;
      case 'damage':
        playDamageSound();
        break;
      case 'gameover':
        playGameOverSound();
        break;
      case 'start':
        playStartSound();
        break;
      case 'levelup':
        playLevelUpSound();
        break;
    }
  }, [getAudioContext, playShootSound, playHitSound, playCorrectSound, playWrongSound, playDamageSound, playGameOverSound, playStartSound, playLevelUpSound]);

  return { playSound };
}
