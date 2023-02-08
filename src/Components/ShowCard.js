import React from 'react';
import './showcard.css';

const ShowCard = (props) => {
  const month = props.date.slice(5, 7);
  const day = props.date.slice(8);
  const year = props.date.slice(0, 4);
  const hours = parseInt(props.time.slice(0, 2)) % 12;
  const minutes = props.time.slice(3, 5);

  const getlocation = async () => {
    const response = await fetch(
      `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf624835cf2d0ecf3441a88692bbf87989d12e&start=8.681495,49.41461&end=8.687872,49.420318`
    );
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="showcard">
      <h1>{props.title}</h1>
      <img src={props.image} alt={props.title} />
      <p>
        {month}/{day}/{year} at{' '}
        {minutes === '00' ? `${hours} PM` : `${hours}:${minutes} PM`}
      </p>
      <p>Location: {props.location}</p>
      <a href={props.url} target="_blank" rel="noreferrer">
        Buy Tickets!
      </a>
      <button onClick={getlocation}>click</button>
    </div>
  );
};

export default ShowCard;
