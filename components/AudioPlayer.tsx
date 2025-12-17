import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, Activity } from 'lucide-react';
import { AMBIENT_MUSIC_URL } from '../constants';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Autoplay prevented", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 p-3 bg-cyber-dark/90 backdrop-blur-md border border-cyber-cyan/50 rounded-full shadow-[0_0_20px_rgba(0,240,255,0.2)] hover:shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-300 group">
      <audio ref={audioRef} src={AMBIENT_MUSIC_URL} loop />

      {/* Visualizer Animation */}
      <div className="flex items-center gap-1 h-4 mr-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-1 bg-cyber-cyan rounded-full transition-all duration-150 ${
              isPlaying ? 'animate-pulse' : 'h-1'
            }`}
            style={{
              height: isPlaying ? `${Math.random() * 16 + 4}px` : '4px',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>

      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-cyber-cyan uppercase tracking-widest leading-none mb-1">
          Nexus Audio
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={togglePlay}
            className="text-white hover:text-cyber-cyan transition-colors"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          
          <button
            onClick={toggleMute}
            className="text-white hover:text-cyber-pink transition-colors"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
