import React, { useState, useEffect, useCallback } from 'react';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';  // Добавлено импортирование CircularProgress
import { styled } from '@mui/system';

const CountdownContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '16px',
});

interface CountdownProps {
  initialMinutes?: number;
  initialSeconds?: number;
}

const Countdown: React.FC<CountdownProps> = ({ initialMinutes = 0, initialSeconds = 0 }) => {
  const [totalSeconds, setTotalSeconds] = useState<number>(initialMinutes * 60 + initialSeconds);
  const [minutes, setMinutes] = useState<number>(initialMinutes);
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  
  const updateTotalSeconds = useCallback(() => {
    setTotalSeconds(minutes * 60 + seconds);
  }, [minutes, seconds]);

  useEffect(() => {
    updateTotalSeconds();
  }, [updateTotalSeconds]);

  const startPauseHandler = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const resetHandler = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(initialSeconds);
    setTotalSeconds(initialMinutes * 60 + initialSeconds);
  };

  const sliderChangeHandler = (event: Event, newValue: number | number[]) => {
    if (!isRunning && typeof newValue === 'number') {
      setTotalSeconds(newValue);
      const newMinutes = Math.floor(newValue / 60);
      const newSeconds = newValue % 60;
      setMinutes(newMinutes);
      setSeconds(newSeconds);
    }
  };

  const minutesChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) {
      const newMinutes = parseInt(event.target.value, 10);
      if (!isNaN(newMinutes) && newMinutes >= 0 && newMinutes <= 720) {
        setMinutes(newMinutes);
        updateTotalSeconds();
      }
    }
  };

  const secondsChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isRunning) {
      const newSeconds = parseInt(event.target.value, 10);
      if (!isNaN(newSeconds) && newSeconds >= 0 && newSeconds < 60) {
        setSeconds(newSeconds);
        updateTotalSeconds();
      }
    }
  };

  // Обратный отсчет
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (isRunning && totalSeconds > 0) {
      intervalId = setInterval(() => {
        setTotalSeconds((prevTotalSeconds) => {
          if (prevTotalSeconds === 0) {
            clearInterval(intervalId);
            setIsRunning(false);
            return 0;
          }
          return prevTotalSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, totalSeconds]);

  return (
    <CountdownContainer>
      <Typography variant="h3">Отсчет</Typography>
      <div>
        <Typography variant="h4">
          {Math.floor(totalSeconds / 60)}:{(totalSeconds % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}
        </Typography>
      </div>
      <Slider
        value={totalSeconds}
        min={0}
        max={3600}
        step={15}
        onChange={sliderChangeHandler}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${Math.floor(value / 60)}:${(value % 60).toLocaleString('en-US', { minimumIntegerDigits: 2 })}`}
        disabled={isRunning}
      />
      {/* Добавлено визуальное отображение прогресса через CircularProgress */}
      <CircularProgress
        variant="determinate"
        value={(totalSeconds / (initialMinutes * 60 + initialSeconds)) * 100}
        style={{ marginTop: '16px' }}
      />
      <div>
        <TextField
          label="Minutes"
          type="number"
          value={minutes}
          onChange={minutesChangeHandler}
          inputProps={{ min: 0, max: 720 }}
          disabled={isRunning}
        />
        <TextField
          label="Seconds"
          type="number"
          value={seconds}
          onChange={secondsChangeHandler}
          inputProps={{ min: 0, max: 59 }}
          disabled={isRunning}
        />
      </div>
      <Button variant="contained" color="primary" onClick={startPauseHandler}>
        {isRunning ? 'Пауза' : 'Старт'}
      </Button>
      <Button variant="contained" color="error" onClick={resetHandler}>
        Сбросить
      </Button>
    </CountdownContainer>
  );
};

export default Countdown;
