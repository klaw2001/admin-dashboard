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
  }, [myevents]);

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
    // Set the selected event when an event is clicked
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
      // Validate the start and end dates
      const startDate = new Date(formData.start);
      const endDate = new Date(formData.end);
  
      // Check if the dates are valid
      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        // Handle invalid dates
        console.error('Invalid start or end date');
        return;
      }
  
      // Make sure end date is after start date
      if (endDate <= startDate) {
        console.error('End date must be after start date');
        return;
      }
  
      // Format the dates to ISO 8601 format
      const formattedStartDate = startDate.toISOString();
      const formattedEndDate = endDate.toISOString();
  
      // Update the formData with the formatted dates
      setFormData({
        ...formData,
        start: formattedStartDate,
        end: formattedEndDate,
      });
  
      // Make API call to update the event
      const updatedEvent = await updateEvent(formData.id, formData);
      console.log('Updated event:', updatedEvent);
      // Close the modal after updating
      handleCloseModal();
    } catch (error) {
      console.error('Error updating event:', error.message);
      // Handle error
    }
  };
  

  

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        selectable={true}
        dateClick={handleDateClick}
        events={myevents} // Use myevents directly
        editable={true}
        eventClick={handleEventClick} // Handle event click
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
