import { Button, Card, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import Iconify from 'src/components/iconify';
import RecordTable from 'src/components/records/RecordTable';

const RecordsView = () => {
  return (
    <>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Records</Typography>

          <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
            New Record
          </Button>
        </Stack>
        <Card>
          <RecordTable />
        </Card>
      </Container>
    </>
  );
};

export default RecordsView;
