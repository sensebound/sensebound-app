import  { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    if (time > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [time]);

  const formatTime = (seconds:any) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className='text-2xl lg:text-5xl'>
      {time > 0 ? (
        <div>{formatTime(time)}</div>
      ) : (
        <div>{formatTime(time)}</div>
      )}
    </div>
  );
};

export default Timer;