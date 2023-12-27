import { Button, Typography, styled } from '@mui/material';
import React, {useState, useCallback, useRef} from 'react'

//Стилизуем контейнер
const TimerContainer = styled('div')({
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  gap:'15px',
})

const Timer: React.FC = () => {
  const [time, setTime] = useState(0); //В миллисекундах
  const [isRunning, setIsRunning] = useState<boolean>(false); 
  const intervalRef = useRef<number | null>(null); 

  //Форматируем время
  const formatTime = useCallback((time:number): string => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);
    
    const pad = (num: number) => (num < 10 ? `0${num}` : num)
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
  }, [])

  //Запуск-пауза
  const startPauseHandler = useCallback(() => {
    if(isRunning){
      clearInterval(intervalRef.current!);
    }else{
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    setIsRunning((prev) => !prev);
  }, [isRunning])

  const resetHandler = useCallback(() => {
    clearInterval(intervalRef.current!);
    setTime(0);
    setIsRunning(false);
  }, [])

  return (
    <TimerContainer>
      <Typography variant="h3">Таймер</Typography>
      <Typography variant="h4">{formatTime(time)}</Typography>

      <Button variant="contained" color="primary" onClick={startPauseHandler}>
        {isRunning ? 'Пауза' : time > 0 ? 'Возобновить' : 'Запустить'}
      </Button>
      <Button variant="contained" color="error" onClick={resetHandler}>
        Сбросить
      </Button>
    </TimerContainer>
  );
}
 
export default Timer;