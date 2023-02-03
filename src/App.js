import { useEffect, useState } from 'react';
import ShowCard from './Components/ShowCard';
import './app.css';

function App() {
  // functionality state
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('26.044691,-80.162392');
  const [startdate, setStartDate] = useState('2023-02-23');
  const [enddate, setEndDate] = useState('2023-03-29');
  const [events, setEvents] = useState([]);

  // initial shows display

  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=hollywood&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
      );
      const result = await response.json();
      const eventsArr = result._embedded.events;
      setEvents(eventsArr);
      console.log(eventsArr);
    };

    getAPI();
  }, []);

  // get location

  const res = (position) => {
    setLocation(`${position.coords.latitude},${position.coords.longitude}`);
  };
  const rej = () => {
    alert('Cannot get location');
  };

  const locate = () => {
    navigator.geolocation.getCurrentPosition(res, rej);
  };

  // search

  const searchShows = async (search, location) => {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&keyword=${search}&geoPoint=${location}&radius=100&startDateTime=${startdate}T00:00:00Z&endDateTime=${enddate}T00:00:00Z&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
    );
    const result = await response.json();
    console.log(result._embedded.events);
  };

  return (
    <div className="App">
      <div className="search">
        <input
          type="text"
          placeholder="Search for artist..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="startdate">
          <label htmlFor="startdate">Start Date</label>
          <input
            type="date"
            name="startdate"
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="enddate">
          <label htmlFor="enddate">End Date</label>
          <input
            type="date"
            name="enddate"
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button onClick={locate}>Find my City</button>
        <button onClick={() => searchShows(search, location)}>Search</button>
      </div>
      <div className="results">
        {events.map((event) => {
          return (
            <ShowCard
              title={event.name}
              image={event.images[0].url}
              date={event.dates.start.localDate}
              time={event.dates.start.localTime}
              artist={event._embedded.attractions[0].name}
              url={event.url}
              key={event.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
