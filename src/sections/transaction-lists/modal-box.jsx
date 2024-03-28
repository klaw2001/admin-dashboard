import React, { useState } from 'react';
import { Avatar, Box, Button, Divider, Typography } from '@mui/material';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { countries } from '../user/utils';
import Checkbox from '@mui/material/Checkbox';
import Iconify from 'src/components/iconify';
import { useAuth } from 'src/contexts/auth-context';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute',
  width: 'calc(400px + 10%)', // Increasing width by 10%
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '10px',
};

const FormModal = () => {
  const { getAllCustomers, customers, loading , createTransaction } = useAuth();
  React.useEffect(() => {
    getAllCustomers();
  }, []);
  const [filePreview, setFilePreview] = useState(null);
  const [image, setFile] = useState(null);
  const [userId , setUserID] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const handleUserChange = (event, value) => {
    setSelectedUser(value);
    setUserID(value._id);
  };
  // Log the selected country object
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
        setFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleOptionsChange = (event, newSelectedOptions) => {
    setSelectedOptions(newSelectedOptions);
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
  
    // Extracting selected status and color
    const status = selectedOptions.map(option => option.status).join(', ');
    const color = selectedOptions.map(option => option.color).join(', ');
    
    const textContent = message
    const res = await createTransaction(userId , { userId , textContent, image, status, color } )
    if(res.message === "Task created successfully"){
      toast.success(res.message)
    }
  };
  

  const statusManagement = [
    { status: 'Completed', color: '#008000' },
    { status: 'InComplete', color: '#FF0000' },
    { status: 'InProcess', color: '#FFA500' },
  ];
  return (
    <Box sx={style} borderRadius={'10px'} border={'none'}>
      <Box>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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

          <TextField
            id="standard-multiline-flexible"
            label="Message"
            multiline
            fullWidth
            sx={{ paddingBottom: '10px' }}
            value={message}
            onChange={handleMessageChange}
          />
          <Divider />
          {image && (
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
              <img src={filePreview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </Box>
          )}
          <Box sx={{ padding: '15px 0px', width: '100%' }}>
            <TextField type="file" onChange={handleFileChange} fullWidth name='image' />
          </Box>

          <Box sx={{ padding: '15px 0px', width: '100%' }}>
            <Autocomplete
              multiple
              id="checkboxes-tags-demo"
              options={statusManagement}
              disableCloseOnSelect
              getOptionLabel={(option) => option.status}
              value={selectedOptions}
              onChange={handleOptionsChange}
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

          <Button variant="contained" color="inherit" type="submit">
            Create
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormModal;
