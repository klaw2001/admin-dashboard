import { Button, Card, Container, Modal, Stack, Typography } from '@mui/material';
import React from 'react';
import MyCalendar from 'src/components/events/Calendar';
import Calendar from 'src/components/events/Calendar';
import CreateEvent from 'src/components/events/CreateEvent';
import Iconify from 'src/components/iconify';

const EventView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Events</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New Event
          </Button>
          <Modal open={open} onClose={handleClose}>
            <CreateEvent onClose={handleClose} />
          </Modal>
        </Stack>
      </Container>
      <Card>
        <MyCalendar />
      </Card>
    </>
  );
};

export default EventView;
