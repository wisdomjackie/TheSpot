  /* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useState } from 'react';
import axios from 'axios';
import CreateIcon from '@mui/icons-material/Create';

type Props = {
  event: {
    PlaceId: string,
    UserId: number,
    createdAt: string,
    date: string,
    endTime: string,
    geolocation: string,
    id: number,
    name: string,
    rsvp_count: number,
    time: string,
    twenty_one: boolean,
    updatedAt: string
  }
}
const UpcomingEvent: React.FC<Props> = ({event}) => {

  const [name, setName] = useState(event.name);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [endTime, setEndTime] = useState(event.endTime);
  const [twentyOne, setTwentyOne] = useState(event.twenty_one)

  const handleNameChange = (e: any) => {
    setDate(e.target.value);
  }

  const handleDateChange = (e: any) => {
    setDate(e.target.value);
  }
  const handleTimeChange = (e: any) => {
    setTime(e.target.value);
  }
  const handleEndTimeChange = (e: any) => {
    setEndTime(e.target.value);
  }
  const handleTwentyOneChange = (e: any) => {
    setTwentyOne(e.target.value);
  }
  console.log(date, '<----date')
  console.log(time, '<----begins')
  console.log(endTime, '<------ends')


  // patch those changes in event in database
  const saveChanges = () => {
    axios.patch(`/events/${event.id}`, {
      name: name,
      date: date,
      time: time,
      endTime: endTime
    })
    .then(() => {

    })
    .catch((err) => {
      console.error('Failed to axios PATCH event: ', err);
    })
  }
  return (
    <div className='column-md-2'>
      <div className='eventCard'>
        <div>
          <h3 style={{color: '#f0f465'}}>
            {event.name}
          </h3>
          <div className='eventCardDetails'>
            <br></br>
            Date:
            <input
            className='eventDetailInput'
            placeholder={date}
            value={date}
            onChange={handleDateChange}
            type='date'
            ></input>
            <br></br>
            Begins:
            <input
            className='eventDetailInput'
            placeholder={time}
            value={time}
            onChange={handleTimeChange}
            type='time'
            ></input>
            <br></br>
            Ends:
            <input
            className='eventDetailInput'
            placeholder={endTime}
            value={endTime}
            onChange={handleEndTimeChange}
            type='time'
            ></input>
            <br></br>
            RSVPs: {event.rsvp_count}
            <br></br>
            {event.twenty_one && '21+'}
            <br></br>
            <button
            onClick={saveChanges}>
              Save
            </button>
          </div>
        </div>
        <div className='editIcon'>
          <CreateIcon />
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
