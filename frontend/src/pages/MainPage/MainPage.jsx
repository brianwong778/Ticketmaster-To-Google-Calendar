// MainPage.jsx
import React, { useEffect, useState } from 'react';
import userService from '../../services/userService.js';
import Header from '../../components/User.jsx';  // Import the Header component
import EventComponent from '../../components/Event.jsx';  // Ensure Event component is imported
import './MainPage.css';
import backendService from '../../services/backendService.js';


const Main = () => {
  const [users, setUsers] = useState([]);
  const [eventName, setEventName] = useState('');
  const [events, setEvents] = useState([]);
  const [dates, setDates] = useState([]);
  const [times, setTimes] = useState([]);
  const [submitted, setSubmitted] = useState(false);


  useEffect(() => {
    userService.getUsers().then(initialUsers => {
      setUsers(initialUsers)
    })
  }, []);

  useEffect(() => {
    if (submitted) {
      const updateState = async () => {
        const { newEvents, newDates, newTimes } = await backendService.postEventName(eventName);
        setEvents(prevEvents => prevEvents.concat(newEvents));
        setDates(prevDates => prevDates.concat(newDates));
        setTimes(prevTimes => prevTimes.concat(newTimes));
        setEventName('');
        setSubmitted(false);
      };
      updateState();
    }
  }, [submitted]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const handleEventChange = (event) => {
    setEventName(event.target.value);
  }

  return (
    <div className="main-page">
      {users.map((user) => <Header key={user.id} user={user} />)}
      <div className="search-container">
        <h1>Events:</h1>
        <form onSubmit={handleSubmit}>
          <input className="search-input" value={eventName} onChange={handleEventChange} />
          <button type="submit" className="search-button">Search</button>
        </form>
      </div>
      <ul>
        {events.map((event, index) =>
          <EventComponent key={index} name={event} date={dates[index]} time={times[index]} />
        )}
      </ul>
    </div>
  );
}

export default Main;




