import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from 'src/contexts/auth-context';

const CreateEvent = ({onClose , user}) => {
  const { createEvent} = useAuth()
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
    userId:user._id,
    // id: '',
    title: '',
    start: '',
    end: '',
    describe: '',
  });

  const handleCreateEvent = async (e) => {
    e.preventDefault()
    try {
      await createEvent(formData)
      toast.success(`Event Create For ${user.username}`)
      
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  };

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
      <Typography variant="h4">Create Event For {user.username}</Typography>
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
          type='submit'
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
