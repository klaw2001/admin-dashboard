import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Card,
  Container,
  Modal,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MyCalendar from 'src/components/events/Calendar';
import Calendar from 'src/components/events/Calendar';
import CreateEvent from 'src/components/events/CreateEvent';
import Iconify from 'src/components/iconify';
import { useAuth } from 'src/contexts/auth-context';

const EventView = () => {
  const { getAllCustomers, customers, getAllEvents , myevents } = useAuth();
  React.useEffect(() => {
    getAllCustomers();
  }, []);
  const [open, setOpen] = React.useState(false);
  const [userId, setUserID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const handleUserChange = (event, value) => {
    setSelectedUser(value);
    setUserID(value._id);
  };
  React.useEffect(() => {
    if (userId) {
      getAllEvents(userId);
    }
  }, [userId , myevents]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Events</Typography>

         
          <Modal open={open} onClose={handleClose}>
            <CreateEvent onClose={handleClose} user={selectedUser} />
          </Modal>
        </Stack>
      </Container>
      <Box sx={{display:"flex" , alignItems:"center"}}>
        <Autocomplete
          id="country-select-demo"
          sx={{ padding: '10px' , width:"50%"}}
          options={customers || null}
          autoHighlight
          getOptionLabel={(option) => option.username || option.email || 'Unknown'}
          value={selectedUser}
          onChange={handleUserChange}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0, gap: '10px' } }}
              {...props}
            >
              <Avatar alt={option.username} src={option.avatar} />
              {option.username}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose a User"
              inputProps={{
                ...params.inputProps,
                autoComplete: 'new-password', // disable autocomplete and autofill
              }}
            />
          )}
        />
        {selectedUser &&(
           <Button
           variant="contained"
           color="inherit"
           startIcon={<Iconify icon="eva:plus-fill" />}
           onClick={handleOpen}
         >
           Create a New Event For {selectedUser.username} 
         </Button>
  )}
      </Box>
      <Card>
        <MyCalendar />
      </Card>
    </>
  );
};

export default EventView;
