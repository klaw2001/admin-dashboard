import { Button, Card, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import MyCalendar from 'src/components/events/Calendar';
import Calendar from 'src/components/events/Calendar';
import Iconify from 'src/components/iconify';

const EventView = () => {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Events</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            // onClick={handleOpen}
          >
            New Event
          </Button>
        </Stack>
      </Container>
      <Card>
        <MyCalendar/>
      </Card>
    </>
  );
};

export default EventView;
