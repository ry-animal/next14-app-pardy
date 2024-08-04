'use client'

const EventsError = ({ error, reset }) => {
  return (
    <div>
      <h2>Something bad happened :( </h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default EventsError
