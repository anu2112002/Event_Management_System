import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState({});
  const [tickets, setTickets] = useState(0);

  useEffect(() => {
    axios.get(`/api/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log("Error fetching event details:", error);
      });
  }, [id]);

  const handleTicketPurchase = () => {
    axios.post(`/api/tickets`, { eventId: id, tickets })
      .then((response) => {
        alert("Tickets purchased successfully!");
      })
      .catch((error) => {
        console.log("Error purchasing tickets:", error);
      });
  };

  return (
    <div>
      <h1>{event.name}</h1>
      <p>{event.description}</p>
      <p>{event.date}</p>
      <p>{event.location}</p>
      <p>Price: ${event.price}</p>
      <input
        type="number"
        value={tickets}
        onChange={(e) => setTickets(e.target.value)}
        min="1"
      />
      <button onClick={handleTicketPurchase}>Purchase Tickets</button>
    </div>
  );
};

export default EventDetails;
