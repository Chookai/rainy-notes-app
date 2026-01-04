import { useState, useRef, useEffect } from 'react';
import './AudioPlayer.css';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(30);
  const audioRef = useRef(null);

  useEffect(() => {
    // Load saved preferences
    const savedVolume = localStorage.getItem('rainVolume');
    const savedPlaying = localStorage.getItem('rainPlaying') === 'true';

    if (savedVolume) setVolume(parseInt(savedVolume));
    if (savedPlaying) setIsPlaying(true);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Handle autoplay restrictions
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
    localStorage.setItem('rainPlaying', isPlaying);
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    localStorage.setItem('rainVolume', newVolume);
  };

  return (
    <div className="audio-player">
      {/* Note: Add your rain sound file to public/sounds/rain-gentle.mp3 */}
      <audio ref={audioRef} loop>
        <source src="/sounds/rain-gentle.mp3" type="audio/mpeg" />
      </audio>

      <div className="audio-controls">
        <button
          className={`play-button ${isPlaying ? 'playing' : ''}`}
          onClick={togglePlay}
          title={isPlaying ? 'Pause rain sounds' : 'Play rain sounds'}
        >
          {isPlaying ? (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <div className="volume-control">
          <svg viewBox="0 0 24 24" fill="currentColor" className="volume-icon">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
