import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAuth } from 'src/contexts/auth-context';
import ChatList from './chat-list';
import { Avatar, ListItemAvatar } from '@mui/material';

const drawerWidth = 240;

export default function ChatDrawer() {
  const { getAllAvailableUsers, chatUsers } = useAuth();
  const [currentChat, setCurrentChat] = React.useState(null);
  React.useEffect(() => {
    getAllAvailableUsers();
  }, []);

  const onCLickHandler = (userID) => {
      setCurrentChat(userID);
    
  };
  const userID = localStorage.getItem('userID');

  return (
    <Box sx={{ display: 'flex', height: '500px' }}>
      <CssBaseline />
      <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            position: 'absolute',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List sx={{ borderRadius: '10px', position: 'relative' }}>
            {chatUsers
              ?.filter((user) => !user.isGroupChat)
              .map((user, index) => (
                <ListItem
                  key={`${user.participants[0]?._id}-${index}`}
                  button
                  onClick={() => onCLickHandler(user._id)}
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={
                        user.participants[0]?._id === userID
                          ? user.participants[1]?.username
                          : user.username
                      }
                      src={user.avatar}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      user.participants[0]?._id === userID
                        ? user.participants[1]?.username
                        : user.participants[0]?.username
                    }
                    secondary={user.lastActive}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 , overflowY:"scroll"}}>
        <Toolbar />
        <ChatList currentChat={currentChat} />
      </Box>
    </Box>
  );
}
