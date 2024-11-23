import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get("/api/events")
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log("Error fetching events:", error);
      });
  }, []);

  return (
    <div>
      <h1>Upcoming Events</h1>
      {events.map((event) => (
        <div key={event.id}>
          <h3>{event.name}</h3>
          <p>{event.description}</p>
          <Link to={`/event/${event.id}`}>View Details</Link>
        </div>
      ))}
    </div>
  );
};

export default EventList;
