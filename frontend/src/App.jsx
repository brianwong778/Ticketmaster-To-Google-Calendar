import { useEffect, useState } from 'react';
import userService from './services/userService.js';
import backendService from './services/backendService.js';
import User from './components/User.jsx';
import Event from './components/Event.jsx';
import axios from 'axios';
const baseUrl = "/api/data";

const App = () => {
  const [users, setUsers] = useState([]);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  //get all users when url starts
  useEffect(() => {
    userService
      .getUsers()
      .then(initialUsers =>{
        setUsers(initialUsers)
      })
  },[])



  //async = asynchronous = two events not happening at the same time
  const handleSubmit =  async (event) => {
    event.preventDefault(); // Prevent default form submission behavior; prevent submit button from submitting form
    setSubmitted(true);
    try {
      await showEvent(); //wait for showEvent to finish returning before going on to next line
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const showEvent = async () =>{
    try {
      console.log("I'm in show event");
      const name = eventName;
      const request = await axios.post(baseUrl + "/eventName", { name: name}, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("requested data: ", request.data);
      const data = request.data;

      let newEvents = [];
      let newDates = [];
      let newTimes = [];
      //change this to map
      for (const eventData of data) {
        console.log("This Events: ", eventData.name);
        console.log("This Dates: ", eventData.dates.start.localDate);
        console.log("This Times : ", eventData.dates.start.localTime);
        newEvents.push(eventData.name);
        newDates.push(eventData.dates.start.localDate);
        newTimes.push(eventData.dates.start.localTime);
      }
      //setEventName('');
      return { newEvents, newDates, newTimes }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if(submitted) {
    const updateState = async () => {
      const { newEvents, newDates, newTimes } = await showEvent();
      setEvents(prevEvents => prevEvents.concat(newEvents));
      setDates(prevDates => prevDates.concat(newDates));
      setTimes(prevTimes => prevTimes.concat(newTimes));
      setEventName('');
      setSubmitted(false);
    };

    updateState();
  }
  }, [submitted]);


  const handleEventChange = (event) => {
    setEventName(event.target.value) //updates newNote value
  }
  //return <li key={index}>{event}</li>
  return (
    <div>
      <h1>User:</h1>
      <ul>
        {users.map((user) =>
          <User key={user.id} user={user}/>
        )}
      </ul>
      <h1>Events:</h1>
      <form onSubmit={handleSubmit}>
        <input
          value={eventName}
          onChange={handleEventChange}
        />
        <button type="submit">search</button>
      </form>
      <ul>
        {events.map((event,index) =>
          <Event key={index} event={event} date={dates[index]} time={times[index]}/>
        )}
      </ul>
    </div>
  )
}

export default App
