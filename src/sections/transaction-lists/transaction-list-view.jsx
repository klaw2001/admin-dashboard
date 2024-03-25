import { Avatar, Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import TUserList from 'src/components/task-list/UserList';
import UserTableToolbar from '../user/user-table-toolbar';
import Modal from '@mui/material/Modal';
import FormModal from './modal-box';

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
          <FormModal/>
        </Modal>
        <Card>
          <UserTableToolbar />
          {/* Use Autocomplete Here  */}
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ width: '40%' }}>
              <TUserList />
            </Box>
            <Box
              sx={{ width: '100%' }}
            >
              <Card sx={{height: '600px', overflowY: 'scroll', scrollbarWidth: 'thin'}}>
                <Box sx={{ position: 'relative' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'end',
                      alignItems: 'end',
                      padding: '15px',
                    }}
                  >
                    <Box sx={{ paddingBottom: '15px' }}>
                      <Typography
                        sx={{
                          padding: '10px 15px',
                          borderRadius: '10px',
                          backgroundColor: 'red',
                          color: 'white',
                        }}
                      >
                        Just An Update
                      </Typography>
                    </Box>
                    <Box sx={{ paddingBottom: '15px' }}>
                      <img
                        src="/assets/images/products/product_2.jpg"
                        alt=""
                        width={400}
                        height={400}
                        style={{ borderRadius: '10px' }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Card>
            </Box>
          </Box>
        </Card>
      </Container>
    </>
  );
};

export default TransactionListView;
