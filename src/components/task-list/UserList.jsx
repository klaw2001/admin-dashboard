import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useAuth } from 'src/contexts/auth-context';
import { Box, CircularProgress } from '@mui/material';

export default function TUserList({onUserClick}) {
  const { getAllCustomers, customers , loading } = useAuth();
  React.useEffect(() => {
    getAllCustomers();
  }, []);
  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        height: '600px',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
      }}
    >
      {loading ? (
        <Box sx={{display:"flex" , justifyContent:"center" , alignItems:"center"}}>
          <CircularProgress/>
        </Box>
      ) : (
        <>
          {customers?.map((elem, ind) => (
            <React.Fragment key={elem._id}>
            <ListItem alignItems="flex-start" onClick={() => onUserClick(elem)} sx={{ cursor: 'pointer' }}>
              <ListItemAvatar>
                <Avatar alt={elem.username} src={elem?.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={elem.username}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {elem.username}
                    </Typography>
                    <br />
                    {elem.email}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
          ))}
        </>
      )}
    </List>
  );
}
