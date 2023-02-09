import React, { useState } from 'react';
import './showcard.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const ShowCard = (props) => {
  const [viewMap, setViewMap] = useState(false);
  const [show, setShow] = useState('Show');

  const month = props.date.slice(5, 7);
  const day = props.date.slice(8);
  const year = props.date.slice(0, 4);
  const hours = parseInt(props.time.slice(0, 2)) % 12;
  const minutes = props.time.slice(3, 5);

  const toggleDirections = () => {
    setViewMap(!viewMap);
    show === 'Show' ? setShow('Hide') : setShow('Show');
  };

  return (
    <div className="showcard">
      <h1>{props.title}</h1>
      <img className='showcardimg' src={props.image} alt={props.title} />
      <p>
        {month}/{day}/{year} at{' '}
        {minutes === '00' ? `${hours} PM` : `${hours}:${minutes} PM`}
      </p>
      <p>Location: {props.location}</p>
      <a href={props.url} target="_blank" rel="noreferrer">
        Buy Tickets!
      </a>
      <button onClick={toggleDirections} className="directionsbtn">
        {show} Location
      </button>
      {viewMap ? (
        <MapContainer
          center={[props.latitude, props.longitude]}
          zoom={13}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[props.latitude, props.longitude]}>
            <Popup>{props.address}</Popup>
          </Marker>
        </MapContainer>
      ) : (
        ''
      )}
    </div>
  );
};

export default ShowCard;
