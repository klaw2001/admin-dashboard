import { Avatar, Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import TUserList from 'src/components/task-list/UserList';
import UserTableToolbar from '../user/user-table-toolbar';
import Modal from '@mui/material/Modal';
import FormModal from './modal-box';
import TransactionRead from 'src/components/task-list/TransactionRead';

const TransactionListView = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Transaction Lists</Typography>

          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={handleOpen}
          >
            New Transaction
          </Button>
        </Stack>
        <Modal open={open} onClose={handleClose}>
          <FormModal />
        </Modal>
        <Card>
          <UserTableToolbar />
          {/* Use Autocomplete Here  */}
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '40%' }}>
              <TUserList onUserClick={handleUserClick} />
            </Box>
            <Box sx={{ width: '100%' }}>
             <TransactionRead user={selectedUser?._id}/>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default TransactionListView;
