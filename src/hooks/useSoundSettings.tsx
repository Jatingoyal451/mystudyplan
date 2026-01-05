import React, { createContext, useContext, useState, useEffect } from 'react';

interface SoundSettingsContextType {
  volume: number;
  setVolume: (volume: number) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

const SoundSettingsContext = createContext<SoundSettingsContextType | undefined>(undefined);

export const SoundSettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [volume, setVolumeState] = useState(() => {
    const saved = localStorage.getItem('soundVolume');
    return saved ? parseFloat(saved) : 0.5;
  });

  const [isMuted, setIsMutedState] = useState(() => {
    const saved = localStorage.getItem('soundMuted');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString());
  }, [volume]);

  useEffect(() => {
    localStorage.setItem('soundMuted', isMuted.toString());
  }, [isMuted]);

  const setVolume = (newVolume: number) => {
    setVolumeState(Math.max(0, Math.min(1, newVolume)));
  };

  const setIsMuted = (muted: boolean) => {
    setIsMutedState(muted);
  };

  return (
    <SoundSettingsContext.Provider value={{ volume, setVolume, isMuted, setIsMuted }}>
      {children}
    </SoundSettingsContext.Provider>
  );
};

export const useSoundSettings = () => {
  const context = useContext(SoundSettingsContext);
  if (context === undefined) {
    throw new Error('useSoundSettings must be used within a SoundSettingsProvider');
  }
  return context;
};
