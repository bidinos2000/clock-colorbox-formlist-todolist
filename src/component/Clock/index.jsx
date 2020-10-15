import React, { useEffect, useState } from 'react';

const formatDate = (date) => {
    if(!date) return '';
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
}

const formatDay = (date) => {
    const months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dex"];
    let formatted_date = date.getDate() + "-" + months[date.getMonth()] + "-" + date.getFullYear()
    return formatted_date;
}

function Clock() {
    const [timeString, setTimeString] = useState('');
    const [day, setDay] = useState('');
    const [filterClock, setFilterClock] = useState('');
    //clock
    useEffect(() => {
        const clock = setInterval(() => {
            const now = new Date();
            const newTimeString = formatDate(now);
            if(now.getSeconds() === 59) {
                setFilterClock(now.getDay());
            }
            //HH:mm:ss
            setTimeString(newTimeString);
        },1000);
        return () => {
            clearInterval(clock)
        }
    },[]);

    useEffect(() => {
        const date = new Date();
        const newDay = formatDay(date);
        setDay(newDay);
        console.log(newDay);
    },[filterClock])
    
    return (
        <div className="card text-white bg-dark clock" style={{margin:'20px auto', width: '150px', textAlign: 'center'}}>
          <div className="card-body">
            <h4 className="card-title" style={{color:'deeppink'}}>{timeString}</h4>
            <p className="card-text">{day}</p>
          </div>
        </div>
    );
}

export default Clock;