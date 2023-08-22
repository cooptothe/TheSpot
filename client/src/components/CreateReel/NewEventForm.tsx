 /* eslint-disable @typescript-eslint/no-explicit-any */
 import * as React from 'react';
 import { useState } from "react";
 import axios from 'axios';

 type Props = {
   user: {
     id: number;
     username: string;
     displayName: string;
     type: string;
     geolocation: string; // i.e. "29.947126049254177, -90.18719199978266"
     mapIcon: string;
     birthday: string;
     privacy: string;
     accessibility: string;
     email: string;
     picture: string;
     googleId: string;
   },
   mustCreateEvent: boolean,
   updateMustCreateEvent: () => void,
   updateEventId: (newId: number) => void,
   togglePopUp: () => void,
   updateBusinessEventCreated: () => void
 }

 const NewEventForm: React.FC<Props> = ({user, mustCreateEvent, updateMustCreateEvent, updateEventId, togglePopUp, updateBusinessEventCreated}) => {

 const [eventName, setEventName] = useState('');
 const [eventDate, setEventDate] = useState('');
 const [eventTime, setEventTime] = useState('');
 const [endTime, setEndTime] = useState('');
 const [twentyOne, setTwentyOne] = useState(false);

 //weeeeee

// handle input for new event name
const handleEventName = (e: any) => {
 setEventName(e.target.value);

}
// handle input for new event date
const handleEventDate = (e: any) => {
 setEventDate(e.target.value)
}

// handle input for new event time
const handleEventTime = (e: any) => {
 setEventTime(e.target.value)
}

const handleEndTime = (e: any) => {
 setEndTime(e.target.value)
}

// handle changing to 21 +
const handleTwentyOne = () => {
 if (!twentyOne) {
   setTwentyOne(true)
 } else {
   setTwentyOne(false)
 }
}

// ADD LOGIC TO PREVENT POSTING IF EVENT IS ALREADY HERE
// ADD WAY OF NOTIFYING USER THAT EVENT CREATION WAS SUCCESSFUL
// patch request to update event in la database
const createEvent = () => {
 axios.post('/events/create', {
   name: eventName,
   date: eventDate,
   time: eventTime,
   endTime: endTime,
   geolocation: user.geolocation,
   twenty_one: twentyOne,
   UserId: user.id
 })
 .then((res) => {
   updateEventId(res.data.event.id)
   updateMustCreateEvent();
   updateBusinessEventCreated();
   togglePopUp();
 })
 .catch((err) => {
   console.error('Failed to axios POST event: ', err)
 })
}

   return (
     <div
       id='event-form'
       className='popUpEventForm'
       >
         <input
         className='eventNameInput'
         placeholder='Event Name'
         id='eventName'
         value={eventName}
         onChange={handleEventName}
         type='text'>
         </input>
         <br></br>
         <br></br>
          Date: &#160;
         <input
         className='eventDetailInput'
         id='eventDate'
         value={eventDate}
         onChange={handleEventDate}
         type="date">
         </input>
         <br></br>
          Begins: &#160;
         <input
         className='eventDetailInput'
         id='eventTime'
         value={eventTime}
         onChange={handleEventTime}
         type='time'>
         </input>
         <br></br>
         Ends: &#160;
         <input
         className='eventDetailInput'
         id='endTime'
         value={endTime}
         onChange={handleEndTime}
         type='time'>
         </input>
         <br></br>
         <label
         htmlFor='twentyOne'>
         21+
         </label>
         &#160;
         <input
         id='twentyOne'
         type='checkbox'
         checked={twentyOne}
         onChange={handleTwentyOne}>
         </input>
         <br></br>
         <br></br>
         <div style={{alignItems: 'center'}}>
         <button
         className='save-event-detail-button'
         type='submit'
         onClick={createEvent}>
           Save
         </button>
         </div>
     </div>
   )
 };

 export default NewEventForm;
