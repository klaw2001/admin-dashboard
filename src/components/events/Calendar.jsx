import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { Modal, Button } from '@mui/material';

export default function MyCalendar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([
    { title: 'event 1', date: '2024-04-01' },
    { title: 'event 2', date: '2024-04-02' },
  ]);

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddEvent = async () => {
    const newEvent = { title: 'New Event', date: '2024-04-03' }; // Change the date as needed
    setEvents([...events, newEvent]);
    handleCloseModal();
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Button onClick={handleOpenModal} variant="contained" color="primary">
        Add Event
      </Button>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateClick}
        events={events}
        editable={true}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <h2>Add Event</h2>
          <p>Date: {selectedDate}</p>
          <Button onClick={handleAddEvent} variant="contained" color="primary">
            Add Event
          </Button>
          <Button onClick={handleCloseModal} variant="contained" color="secondary">
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
