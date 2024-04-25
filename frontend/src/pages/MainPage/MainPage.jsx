// MainPage.jsx
import React, { useEffect, useState } from 'react';
import userService from '../../services/userService.js';
import axios from 'axios';
import Header from '../../components/User.jsx';  // Import the Header component
import Event from '../../components/Event.jsx';  // Ensure Event component is imported
import './MainPage.css';
const baseUrl = "/api/data";

const App = () => {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const showEvent = async () => {
    try {
      const request = await axios.post(baseUrl + "/eventName", { name: eventName }, {
        headers: { "Content-Type": "application/json" },
      });
      return request.data.reduce((acc, eventData) => {
        acc.newEvents.push(eventData.name);
        acc.newDates.push(eventData.dates.start.localDate);
        acc.newTimes.push(eventData.dates.start.localTime);
        return acc;
      }, { newEvents: [], newDates: [], newTimes: [] });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (submitted) {
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
          <Event key={index} event={event} date={dates[index]} time={times[index]} />
        )}
      </ul>
    </div>
  );
}

export default App;
