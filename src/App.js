import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import EventDetails from "./EventDetails";
import EventList from "./EventList";
import UserLogin from "./UserLogin";
import UserRegistration from "./UserRegistration";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/register" element={<UserRegistration />} />
      </Routes>
    </Router>
  );
};

export default App;
