import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';

const CreateEvent = ({onClose}) => {
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    start: '',
    end: '',
    describe: '',
  });

  const handleCreateEvent = () => {};

  return (
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
        <Button
          onClick={handleCreateEvent}
          variant="contained"
          color="primary"
          sx={{ marginRight: '5px' }}
        >
          Create Event
        </Button>
        <Button onClick={onClose} variant="contained" color="secondary">
          Close
        </Button>
      </Box>
    </div>
  );
};

export default CreateEvent;
