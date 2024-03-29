import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // needed for dayClick
import { Modal, Button, Box, TextField, Typography } from '@mui/material'; // Import components from MUI
import { useAuth } from 'src/contexts/auth-context';

export default function MyCalendar() {
  const { getAllEvents, myevents , updateEvent } = useAuth();
  useEffect(() => {
    getAllEvents();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null); // Track the selected event
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    describe: '',
  });

  const handleDateClick = (arg) => {
    setSelectedDate(arg.dateStr);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleEventClick = (arg) => {
    setSelectedEvent(arg.event);
    const startDate = new Date(arg.event.startStr).toISOString().slice(0, 16);
    const endDate = new Date(arg.event.endStr).toISOString().slice(0, 16);
    setFormData({
      id: arg.event.extendedProps._id,
      title: arg.event.title,
      start: startDate,
      end: endDate,
      describe: arg.event.extendedProps.describe,
    });
    setModalOpen(true);
  };
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleUpdateEvent = async () => {
    try {
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
  
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        console.error('Invalid start or end date');
        return;
      }
  
      if (endDate <= startDate) {
        console.error('End date must be after start date');
        return;
      }
  
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
  
      setFormData({
        ...formData,
        start: formattedStartDate,
        end: formattedEndDate,
      });
  
      const updatedEvent = await updateEvent(formData.id, formData);
      console.log('Updated event:', updatedEvent);
      handleCloseModal();
    } catch (error) {
      console.error('Error updating event:', error.message);
    }
  };
  

  

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateClick}
        events={myevents} 
        editable={true}
        eventClick={handleEventClick} 
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            background: '#fff',
            boxShadow: 24,
            borderRadius: 10,
            padding: 20,
          }}
        >
          <Typography variant="h4">Event Details</Typography>
          <Box>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Start"
              name="start"
              type="datetime-local"
              value={formData.start}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="End"
              name="end"
              type="datetime-local"
              value={formData.end}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="describe"
              value={formData.describe}
              onChange={handleInputChange}
              margin="normal"
              multiline
            />
            <Button onClick={handleUpdateEvent} variant="contained" color="primary" sx={{ marginRight: '5px' }}>
              Update Event
            </Button>
            <Button onClick={handleCloseModal} variant="contained" color="secondary">
              Close
            </Button>
          </Box>
        </div>
      </Modal>
    </div>
  );
}
