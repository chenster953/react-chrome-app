import React from 'react';
import './showcard.css';

const ShowCard = (props) => {
  const month = props.date.slice(5, 7);
  const day = props.date.slice(8);
  const year = props.date.slice(0, 4);
  const hours = parseInt(props.time.slice(0, 2)) % 12;
  const minutes = props.time.slice(3, 5);

  return (
    <div className="showcard">
      <h1>{props.title}</h1>
      <img src={props.image} alt={props.title} />
      <p>
        {month}/{day}/{year} at{' '}
        {minutes === '00' ? `${hours} PM` : `${hours}:${minutes} PM`}
      </p>
      <a href={props.url} target="_blank" rel="noreferrer">
        Buy Tickets!
      </a>
    </div>
  );
};

export default ShowCard;
