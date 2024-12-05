"use client"
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

  const handleRestart = () => {
    setTime(0);
    setIsRunning(false);
  };

  const handleDelete = (index: number) => {
    const updatedTimes = savedTimes.filter((_, i) => i !== index);
    setSavedTimes(updatedTimes);
  };

  const formatTime = (time: number) => {
    const getSeconds = `0${time % 60}`.slice(-2);
    const minutes = Math.floor(time / 60);
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}`;
  };

  return (
    <div>
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-fuchsia-500 to-orange-600">
      <h1 className='text-2xl font-bold mb-4 '>Stopwatch</h1>
      {/* Stopwatch Display */}
      <div className='bg-gradient-to-r from-teal-400 to-yellow-200 p-10 rounded-lg border-4 border-teal-500'>
      <div className="text-5xl font-bold mb-6 text-teal-800"
        style={{
            filter: 'drop-shadow(0px 0px 4px #4fb9af)',
          }}
        >
        {formatTime(time)}
      </div>

      {/* "No" placeholders */}
      <div className="flex space-x-4 text-3xl font-semibold">
        <div className=" text-teal-300 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-900 rounded-lg">Hours : {Math.floor(time / 3600)}</div>
        <div className=" text-teal-300 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-900 rounded-lg">Minutes : {Math.floor((time % 3600) / 60)}</div>
        <div className=" text-teal-300 px-4 py-2 bg-gradient-to-r from-rose-500 to-rose-900 rounded-lg">Seconds : {time % 60}</div>
      </div>

      {/* Buttons */}
      <div className="mt-8 flex space-x-4">
        <button
          onClick={handleStart}
          className="bg-gradient-to-r from-lime-500 to-pink-600 text-yellow-200 px-6 py-2 rounded">Start</button>
        <button
          onClick={handleStop}
          className="bg-gradient-to-r from-lime-500 to-pink-600 text-yellow-200 px-6 py-2 rounded">Stop</button>
        <button
          onClick={handleRestart}
          className="bg-gradient-to-r from-lime-500 to-pink-600 text-yellow-200 px-6 py-2 rounded">Restart</button>
        <button
          onClick={handleSave}
          className="bg-gradient-to-r from-lime-500 to-pink-600 text-yellow-200 px-6 py-2 rounded">Save</button>
      </div>

      {/* Saved Times with Delete Button */}
      <div className="mt-8 text-lg">
        <h1 className='text-2xl font-bold text-rose-800'>Saved:</h1>
        <ul>
          {savedTimes.map((savedTime, index) => (
            <li key={index} className="flex items-center space-x-2 font-bold text-rose-800">
              <span>Hours : {Math.floor(savedTime / 3600)}</span>
              <span>Minutes : {Math.floor((savedTime % 3600) / 60)}</span>
              <span>Seconds : {savedTime % 60}</span>
              {/* Add 4px space using 'ml-1' */}
              <button
                onClick={() => handleDelete(index)}
                className="ml-1 bg-gradient-to-r from-lime-500 to-pink-600 text-yellow-200 px-3 py-1 rounded mb-2">Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
    </div>
  );
};

export default Stopwatch;
