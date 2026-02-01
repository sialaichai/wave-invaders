import React, { useEffect, useRef, useCallback } from 'react';

interface SoundEffectsProps {
  playShoot: boolean;
  playExplosion: boolean;
  playCorrect: boolean;
  playWrong: boolean;
  playLevelUp: boolean;
}

// Web Audio API synthesizer for game sounds
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    return () => {
      audioContextRef.current?.close();
    };
  }, []);



  const playShootSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.1);
    oscillator.type = 'square';
    
    gainNode.gain.setValueAtTime(0.2, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.1);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.1);
  }, []);

  const playExplosionSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Create noise buffer for explosion
    const bufferSize = audioContextRef.current.sampleRate * 0.3;
    const buffer = audioContextRef.current.createBuffer(1, bufferSize, audioContextRef.current.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = audioContextRef.current.createBufferSource();
    noise.buffer = buffer;
    
    const gainNode = audioContextRef.current.createGain();
    const filter = audioContextRef.current.createBiquadFilter();
    
    filter.type = 'lowpass';
    filter.frequency.value = 1000;
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    gainNode.gain.setValueAtTime(0.4, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    
    noise.start(audioContextRef.current.currentTime);
  }, []);

  const playCorrectSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    // Play a happy ascending arpeggio
    const now = audioContextRef.current.currentTime;
    [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const gainNode = audioContextRef.current!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current!.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.15, now + i * 0.08);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
      
      oscillator.start(now + i * 0.08);
      oscillator.stop(now + i * 0.08 + 0.3);
    });
  }, []);

  const playWrongSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const oscillator = audioContextRef.current.createOscillator();
    const gainNode = audioContextRef.current.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContextRef.current.destination);
    
    oscillator.frequency.setValueAtTime(300, audioContextRef.current.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(150, audioContextRef.current.currentTime + 0.3);
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3);
    
    oscillator.start(audioContextRef.current.currentTime);
    oscillator.stop(audioContextRef.current.currentTime + 0.3);
  }, []);

  const playLevelUpSound = useCallback(() => {
    if (!audioContextRef.current) return;
    
    const now = audioContextRef.current.currentTime;
    
    // Fanfare sound
    const notes = [523.25, 523.25, 523.25, 659.25, 783.99, 659.25, 1046.50];
    const durations = [0.15, 0.15, 0.15, 0.3, 0.15, 0.15, 0.6];
    let time = 0;
    
    notes.forEach((freq, i) => {
      const oscillator = audioContextRef.current!.createOscillator();
      const gainNode = audioContextRef.current!.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContextRef.current!.destination);
      
      oscillator.frequency.value = freq;
      oscillator.type = 'square';
      
      gainNode.gain.setValueAtTime(0.2, now + time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + time + durations[i]);
      
      oscillator.start(now + time);
      oscillator.stop(now + time + durations[i]);
      
      time += durations[i];
    });
  }, []);

  return {
    playShootSound,
    playExplosionSound,
    playCorrectSound,
    playWrongSound,
    playLevelUpSound
  };
};

// Sound effect trigger component
export const SoundEffects: React.FC<SoundEffectsProps> = ({
  playShoot,
  playExplosion,
  playCorrect,
  playWrong,
  playLevelUp
}) => {
  const { 
    playShootSound, 
    playExplosionSound, 
    playCorrectSound, 
    playWrongSound,
    playLevelUpSound 
  } = useSoundEffects();

  useEffect(() => {
    if (playShoot) playShootSound();
  }, [playShoot, playShootSound]);

  useEffect(() => {
    if (playExplosion) playExplosionSound();
  }, [playExplosion, playExplosionSound]);

  useEffect(() => {
    if (playCorrect) playCorrectSound();
  }, [playCorrect, playCorrectSound]);

  useEffect(() => {
    if (playWrong) playWrongSound();
  }, [playWrong, playWrongSound]);

  useEffect(() => {
    if (playLevelUp) playLevelUpSound();
  }, [playLevelUp, playLevelUpSound]);

  return null;
};
