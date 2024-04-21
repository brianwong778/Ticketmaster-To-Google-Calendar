const Event = ({event,date,time}) => {
    return (
      <li className='event'>
        {event} - {date} - {time}
      </li>
    )
  }

export default Event
