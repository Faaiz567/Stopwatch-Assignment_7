"use client";
import { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [savedTimes, setSavedTimes] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleSave = () => {
    setSavedTimes([...savedTimes, time]);
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Stopwatch Display */}
      <div className="text-5xl font-bold mb-6">
        {formatTime(time)}
      </div>

      {/* "No" placeholders */}
      <div className="flex space-x-4 text-3xl font-semibold">
        <div className="px-4 py-2 bg-gray-300 rounded">No {Math.floor(time / 3600)}</div>
        <div className="px-4 py-2 bg-gray-300 rounded">No {Math.floor((time % 3600) / 60)}</div>
        <div className="px-4 py-2 bg-gray-300 rounded">No {time % 60}</div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handleStart}
          className="bg-green-500 text-white px-6 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={handleStop}
          className="bg-red-500 text-white px-6 py-2 rounded"
        >
          Stop
        </button>
        <button
          onClick={handleSave}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          Save
        </button>
      </div>

      {/* Saved Times */}
      <div className="mt-8 text-lg">
        <h3>Saved:</h3>
        <ul>
          {savedTimes.map((savedTime, index) => (
            <li key={index} className="flex space-x-2">
              <span>Co {Math.floor(savedTime / 3600)}:</span>
              <span>Co {Math.floor((savedTime % 3600) / 60)}:</span>
              <span>Co {savedTime % 60}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
