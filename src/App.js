import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState([]);

  useEffect(() => {
    const getAPI = async () => {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&city=sacramento&apikey=${process.env.REACT_APP_TICKETMASTER_KEY}`
      );
      const result = await response.json();
      console.log(result._embedded.events);
      setTitle(result._embedded.events);
    };

    getAPI();
  }, []);

  const render = () => {
    console.log(title);
    title.map((event) => {
      return <h1>{event.name}</h1>;
    });
  };

  return (
    <div className="App">
      <button onClick={render}>run</button>
      {title.map((event) => {
        return <h1>{event.name}</h1>;
      })}
    </div>
  );
}

export default App;
