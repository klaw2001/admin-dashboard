import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../user/utils';
import Checkbox from '@mui/material/Checkbox';
import Iconify from 'src/components/iconify';
import { useAuth } from 'src/contexts/auth-context';

const style = {
  position: 'absolute',
  width: 'calc(400px + 10%)', // Increasing width by 10%
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius:'10px'
};

const FormModal = () => {
  const { getAllCustomers, customers , loading } = useAuth();
  React.useEffect(() => {
    getAllCustomers();
  }, []);
  const [filePreview, setFilePreview] = useState(null);
  const handleUserChange = (event, value) => {
    console.log(value); // Log the selected country object
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const top100Films = [
    { title: 'The Shawshank Redemption', status: 'completed', color: 'green' },
    { title: 'The Godfather', status: 'incomplete', color: 'red' },
    { title: 'The Godfather: Part II', status: 'inprogress', color: 'orange' },
  ];
  return (
    <Box sx={style} borderRadius={'10px'} border={'none'}>
      <Box>
        <form action="">
          <Typography
            id="modal-modal-title"
            variant="h3"
            component="h1"
            sx={{ paddingBottom: '20px' }}
          >
            Add Transaction
          </Typography>

          <Autocomplete
            id="country-select-demo"
            sx={{ paddingBottom: '10px' }}
            options={customers}
            autoHighlight
            getOptionLabel={(option) => option.username}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 , gap:"10px"} }} {...props}>
                {/* <img
                  loading="lazy"
                  width="20"
                  // srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={option.avatar}
                  alt=""
                /> */}
                <Avatar alt={option.username} src={option.avatar}/>
                {option.username} 
                {/* ({option.code}) +{option.phone} */}
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
            onChange={handleUserChange}
          />

          <TextField
            id="standard-multiline-flexible"
            label="Message"
            multiline
            variant="standard"
            fullWidth
            sx={{ paddingBottom: '10px' }}
          />
          <Divider />
          {filePreview && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <img
                src={filePreview}
                alt="Preview"
                style={{ maxWidth: '100%', maxHeight: '200px' }}
              />
            </Box>
          )}
          <Box sx={{ padding: '15px 0px', width: '100%' }}>
            <TextField type="file" onChange={handleFileChange} fullWidth />
          </Box>

          <Box sx={{ padding: '15px 0px', width: '100%' }}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={top100Films}
              disableCloseOnSelect
              getOptionLabel={(option) => option.title}
              renderOption={(props, option, { selected }) => (
                <li {...props} style={{ padding: '5px', marginBottom: '5px' }}>
                  <Checkbox style={{ marginRight: 8, color: option.color }} checked={selected} />
                  {option.status}
                </li>
              )}
              style={{ width: 500 }}
              renderInput={(params) => (
                <TextField {...params} label="Checkboxes" placeholder="Favorites" />
              )}
            />
          </Box>

          
          <Button
            variant="contained"
            color="inherit"
            
        
          >
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormModal;
