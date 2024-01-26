import React, { useEffect, useState } from "react";

import {  useDispatch, useSelector } from "react-redux";
import "./countdown.scss"
import { removeCountDown } from "../../store/slice/countdownSlice";
const CountDown = () => {
  const { date, month, year ,active} = useSelector((state: any) => state.countDown);
  const [daysCount, setDaysCount] = useState(0);
  const [hoursCount, setHourCount] = useState(0);
  const [minutesCount, setMinutesCount] = useState(0);
  const [secondsCount, setSecondsCount] = useState(0);

  const countDownDate = new Date(`${year} ${month} ${date}`).getTime();
const dispatch=useDispatch()
  useEffect(() => {
    const interval = setInterval(() => {
      const timeNow = new Date().getTime();
      let distance = countDownDate - timeNow;
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      setDaysCount(days);
      setHourCount(hours);
      setMinutesCount(minutes);
      setSecondsCount(seconds);
      if(distance <0){
       
        clearInterval(interval)
      }
    }, 1000);
    if(countDownDate === new Date().getTime() ){

       dispatch(removeCountDown())
    }
    return () => clearInterval(interval);
  }, [active]);

  return (
  <div className="countdown  py-24">
  
      <h2>Deal Of The Day</h2>
      <div className="flex gap-3 ">
        <p>{daysCount}</p>
        <p>{hoursCount}</p>
        <p>{minutesCount}</p>
        <p>{secondsCount}</p>
      </div>
    </div>
  );
};

export default CountDown;
