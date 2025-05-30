import { useState, useEffect, useRef, useCallback } from 'react';

export default function useTimer(initialTime, onTimeout) {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  const endTimeRef = useRef(null);
  const onTimeoutRef = useRef(onTimeout);

  // Keep callback ref updated
  useEffect(() => {
    onTimeoutRef.current = onTimeout;
  }, [onTimeout]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const startInternal = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const newTime = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      
      setTimeRemaining(newTime);

      if (newTime <= 0) {
        clearInterval(timerRef.current);
        timerRef.current = null;
        setIsRunning(false);
        onTimeoutRef.current?.();
      }
    }, 100); // More frequent updates for better accuracy
  }, []);

  // Handle visibility change with current values
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
      } else {
        // Only restart if we have an end time (meaning timer was running)
        if (endTimeRef.current && endTimeRef.current > Date.now()) {
          const newTime = Math.max(0, Math.floor((endTimeRef.current - Date.now()) / 1000));
          setTimeRemaining(newTime);
          setIsRunning(true);
          startInternal();
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [startInternal]);

  const startTimer = useCallback(() => {
    if (timeRemaining <= 0) return;
    
    endTimeRef.current = Date.now() + timeRemaining * 1000;
    setIsRunning(true);
    startInternal();
  }, [timeRemaining, startInternal]);

  const pauseTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    
    if (endTimeRef.current) {
      const now = Date.now();
      const newTime = Math.max(0, Math.floor((endTimeRef.current - now) / 1000));
      setTimeRemaining(newTime);
    }
  }, []);

  const resetTimer = useCallback((newTime = initialTime) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsRunning(false);
    setTimeRemaining(newTime);
    endTimeRef.current = null;
  }, [initialTime]);

  const formatTime = useCallback(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  return {
    timeRemaining,
    formatTime,
    isRunning,
    startTimer,
    pauseTimer,
    resetTimer,
    progress: initialTime > 0 ? (initialTime - timeRemaining) / initialTime : 0 // Bonus feature
  };
}