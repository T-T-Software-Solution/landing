import { Loader } from '@mantine/core';
import NumberFlow, { NumberFlowGroup } from '@number-flow/react';
import { useEffect, useState } from 'react';

export interface CountdownProps {
  seconds: number;
  onComplete?: () => void;
}

export const Countdown: React.FC<CountdownProps> = ({ seconds: initialSeconds, onComplete }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) {
      if (onComplete) onComplete(); // Call the onComplete callback if provided
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [seconds, onComplete]);

  const hh = Math.floor(seconds / 3600);
  const mm = Math.floor((seconds % 3600) / 60);
  const ss = seconds % 60;

  if (seconds === 0) {
    return <Loader color="primary" type="dots" aria-label="กำลังส่งข้อความ..." />;
  }
  return (
    <NumberFlowGroup>
      <div
        style={{
          fontVariantNumeric: 'tabular-nums',
          color: 'green',
        }}
        className="~text-3xl/4xl flex items-baseline font-semibold gap-2"
      >
        {hh > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '3em',
              height: '3em',
              borderRadius: '50%',
              border: '2px solid green',
            }}
          >
            <NumberFlow trend={-1} value={hh} format={{ minimumIntegerDigits: 2 }} />
          </div>
        )}
        {hh > 0 && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '2em',
              height: '2em',
              borderRadius: '50%',
              border: '2px solid green',
            }}
          >
            <NumberFlow prefix=":" trend={-1} value={mm} format={{ minimumIntegerDigits: 2 }} />
          </div>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '2em',
            height: '2em',
            borderRadius: '50%',
            border: '2px solid green',
          }}
        >
          <NumberFlow prefix={hh > 0 || mm > 0 ? ':' : ''} trend={-1} value={ss} format={{ minimumIntegerDigits: 2 }} />
        </div>
      </div>
    </NumberFlowGroup>
  );
};
