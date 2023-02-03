import React from 'react'
import './showcard.css'

const ShowCard = (props) => {
  return (
    <div className='showcard'>
      <h1>{props.title}</h1>
      <img src={props.image} alt={props.title} />
      <p>{props.date} at {props.time}</p>
      <p>Featuring {props.artist}</p>
      <p>link: {props.url}</p>
    </div>
  )
}

export default ShowCard