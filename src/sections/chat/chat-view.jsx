import { Button, Card, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import ChatDrawer from './chat-drawer';

const ChatView = () => {
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Chats</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Record
        </Button>
      </Stack>
      <Card>
        <ChatDrawer/>
      </Card>
    </Container>
  );
};

export default ChatView;
