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
import { Avatar, Button, ListItemAvatar, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import axios from 'axios';
import { useState } from 'react';
import { io } from 'socket.io-client';

const drawerWidth = 240;
// var socket, selectedChatCompare;
export default function ChatDrawer() {
  const { getAllAvailableUsers, chatUsers, chats, setChats , getAllSingleUserChats} = useAuth();
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [content, setContent] = useState('');
  const [currentChat, setCurrentChat] = useState({
    chatID: '',
    userID: '',
  });
  const [messageData, setMessageData] = React.useState(null);
  const userID = localStorage.getItem('userID');
  const accessToken = localStorage.getItem('accessToken');



  React.useEffect(() => {
    getAllAvailableUsers();
  }, []);




  React.useEffect(() => {
    const ENDPOINT = 'http://localhost:8000';
    const user = JSON.parse(localStorage.getItem('user'));

    const newSocket = io(ENDPOINT , {
      auth: {
        token: accessToken, // Replace with your actual token
      }},);
    setSocket(newSocket);

    // newSocket.on('connection', () => {
    //   console.log('Socket connected successfully!', newSocket);
    //   newSocket.emit('setup', user);
    // });

    newSocket.on('messageReceived', (newMessageRecieved) => {
      setChats([...chats , newMessageRecieved])
      console.log(newMessageRecieved, 'msg rcd');
      console.log(chats)
    });

    newSocket.on('connected', () => {
      console.log('Socket setup completed.');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

 

  
  const sendMessageHandler = async () => {
    if (!currentChat) return; // No chat selected

    const messageData = {
      userId: userID,
      chatId: currentChat.chatID,
      content: content,
    };
    console.log(messageData)
    try {
      // Send message data to the backend
      const res = await axios.post(
        `http://localhost:8000/api/v1/chat-app/messages/${currentChat.chatID}`,
        messageData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      // if(res.status === 200){
      //   getAllSingleUserChats(currentChat.userID)
      // }

      if (socket) {
        socket.emit('new-message', res.data);
        console.log(socket , "mesg sent")
        // socket.on('messageReceived', (newMessageRecieved) => {
        //   setChats([...chats, newMessageRecieved]);
        //   console.log(newMessageRecieved, 'msg rcd');
        // });
      }

      // Clear message content
      // setChats([...chats , res.data])

      setContent('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
 
  const onCLickHandler = (userID, chatID) => {
    setCurrentChat({
      userID: userID,
      chatID: chatID,
    });
    socket.emit('joinChat', chatID);
  };

  return (
    <>
      <Box sx={{ height: '600px', position: 'relative' }}>
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
                      onClick={() => onCLickHandler(user._id, user.lastMessage.chat)}
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
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflowY: 'scroll' }}>
            <Toolbar />
            <ChatList currentChat={currentChat.userID} socket={socket} />
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            zIndex: '9999',
            right: '0',
            left: '21%',
            padding: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          <TextField
            type="text"
            fullWidth
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Button
            onClick={sendMessageHandler}
            variant="contained"
            color="inherit"
            type="submit"
            startIcon={<Iconify icon="eva:plus-fill" />}
          >
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
}