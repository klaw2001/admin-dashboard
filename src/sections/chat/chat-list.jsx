import {
  Avatar,
  Box,
  CircularProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from 'src/contexts/auth-context';
import getTimeDifference from 'src/utils/functions';

export default function ChatList({ currentChat, socket }) {
  const { getAllSingleUserChats, chats, setChats } = useAuth();
  const [loadingChats, setLoadingChats] = useState(true);
  const id = localStorage.getItem('userID');

  const getUserChats = async () => {
    if (currentChat !== null) {
      await getAllSingleUserChats(currentChat);
      setLoadingChats(false);
    }
  };

  useEffect(() => {
    getUserChats();
  }, [currentChat]);


 
  return (
    <List
      sx={{
        flexGrow: 1,
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end', // Align chat items to the end (right)
      }}
    >
      {loadingChats ? (
        <CircularProgress sx={{ alignSelf: 'center', mt: 2 }} />
      ) : (
        <>
          {chats?.length === 0 ? (
            <ListItemText primary={'No Chats Available'} />
          ) : (
            <>
              {chats?.map((chat, ind) => (
                <ListItem
                key={chat._id}
                sx={{
                  textAlign: id === chat?.sender?._id ? 'right' : 'left',
                  marginBottom: '2px',
                }}
                >
                  <ListItemAvatar
                    sx={{
                      order: id === chat?.sender?._id ? '1' : '0',
                      minWidth: '0',
                      display: 'flex',
                      justifyContent: id === chat?.sender?._id ? 'flex-end' : 'flex-start',
                      paddingRight: id === chat?.sender?._id ? '8px' : '0', // Add right padding if sender is current user
                      paddingLeft: id === chat?.sender?._id ? '0' : '8px', // Add left padding if sender is not current user
                    }}
                  >
                    <Avatar alt={chat?.sender?.username} src={chat?.sender?.avatar} />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      chat?.content || (chat?.attachments?.length > 0 ? chat?.attachments?.url : '')
                    }
                    sx={{
                      width: 'fit-content',
                      borderRadius: '10px',
                      padding: '8px',
                    }}
                  />
                  {chat.attachments?.length > 0 && (
                    <img src={chat.attachments?.localPath} alt="Attachment" />
                  )}
                </ListItem>
              ))}
            </>
          )}
        </>
      )}
    </List>
  );
}
