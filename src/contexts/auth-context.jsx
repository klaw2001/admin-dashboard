import axios from 'axios';
import PropTypes from 'prop-types';
import { useMemo, useState, useContext, createContext, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

const AuthContext = createContext();
const ENDPOINT = 'https://chats-app-admin.onrender.com/';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userID, setUserID] = useState(null);
  const [chatUsers, setChatUsers] = useState(null);
  const [chats, setChats] = useState(null);
  const [message, setMessage] = useState(null);
  const [customers, setCustomers] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loggedinUser, setLoggedinUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [myevents, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const API = 'https://chats-app-0uxf.onrender.com/api/v1';
  const AWS = 'http://ec2-52-206-76-43.compute-1.amazonaws.com:8000/api/v1';
  const AWS_SOCKET = 'http://ec2-52-206-76-43.compute-1.amazonaws.com:8000/';
  const AWS_2 = 'http://ec2-52-206-76-43.compute-1.amazonaws.com:8000/api/v2';
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
      // Fetch customers only when accessToken is available
      // getAllCustomers();
    }
  }, [accessToken]);

  useEffect(() => {
    if (socket) {
      socket.on('message recieved', (data) => {
        console.log('Message received:', data);
        setChats((prevChats) => [...prevChats, data]);
      });
      // return () => {
      //   socket.off('messageReceived');
      // };
    }
  }, [socket]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${AWS}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.data.user);
        setUserID(userData.data.user._id);
        localStorage.setItem('accessToken', userData.data.accessToken);
        localStorage.setItem('userID', userData.data.user._id);
        localStorage.setItem('user', JSON.stringify(userData.data.user));
        setAccessToken(userData.data.accessToken);
        getAllCustomers();
        return userData;
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  const logout = async () => {
    try {
      const res = await axios.post(`${AWS}/users/logout`, null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      localStorage.removeItem('accessToken');
      setUser(null);
      setCustomers(null); // Reset customers on logout
      return res;
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  const getAllCustomers = async () => {
    try {
      const res = await axios.get(`${AWS}/chat-app/chats/users`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCustomers(res.data.data);
      setLoading(false);
      return res;
    } catch (error) {
      console.error('Error fetching all customers:', error, accessToken);
      // Ensure a value is always returned, even in the error case
      return null;
    }
  };

  const getAllAvailableUsers = async () => {
    try {
      // const accessToken = window.sessionStorage.getItem("accessToken");
      const res = await axios.get(`${AWS}/chat-app/chats/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setChatUsers(res.data.data);
      return chatUsers;
    } catch (error) {
      console.error('Error fetching all chatusers:', error);
    }
  };

  function initializeSocket() {
    const newSocket = io(AWS_SOCKET, {
      headers: {
        auth: { accessToken },
        withCredentials: true,
      },
    });

    newSocket.on('connect', () => {
      console.log('Connected to socket server');
    });

    newSocket.on('messageReceived', (data) => {
      console.log('Message received:', data);
      setChats((pre) => [...pre, data]);
    });

    setSocket(newSocket);
  }

  const getAllSingleUserChats = async (chatId) => {
    try {
      const res = await axios.get(`${AWS}/chat-app/messages/${chatId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const singleUserChats = res.data.data;

      setChats(singleUserChats);

      return singleUserChats;
    } catch (error) {
      console.error('Error fetching all chats:', error);
    }
  };

  const sendMessageinChat = async (userId, chatId, content) => {
    try {
      const res = await axios.post(
        `${AWS}/dashMsg`,
        { userId, chatId, content },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      socket.emit("new message", res.data.data)
      setChats([...chats , res.data.data]);
      // return res.data.data
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const createTransaction = async (userId, formData) => {
    console.log(formData);
    try {
      const res = await axios.post(`${AWS}/tasks/create-task/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
          'Cache-Control': 'no-cache', // Add this header to avoid caching
          Pragma: 'no-cache',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleTransactionList = async (userId) => {
    try {
      const res = await axios.get(`${AWS}/tasks/task/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache', // Add this header to avoid caching
          Pragma: 'no-cache',
        },
      });
      setTransactions(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllEvents = async (userId) => {
    try {
      const res = await axios.get(`${AWS}/events/all-events/${userId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache', // Add this header to avoid caching
          Pragma: 'no-cache',
        },
      });
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createEvent = async (formData) => {
    try {
      const res = await axios.post(`${AWS}/events/create-event`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache', // Add this header to avoid caching
          Pragma: 'no-cache',
        },
      });
      return res.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const updateEvent = useCallback(
    async (id, formData) => {
      try {
        const res = await axios.put(`${AWS}/events/${id}/update`, formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache', // Add this header to avoid caching
            Pragma: 'no-cache',
          },
        });
        return res.data; // Return the updated event data
      } catch (error) {
        console.log(error);
        throw error; // Throw the error to handle it in the component
      }
    },
    [accessToken]
  );
  // const getAllRecords = async()=>{
  //   try {
  //     const res = await axios.get(`${AWS_2}/`)
  //   } catch (error) {

  //   }
  // }
  const authValue = useMemo(
    () => ({
      login,
      logout,
      getAllCustomers,
      getAllAvailableUsers,
      getAllSingleUserChats,
      sendMessageinChat,
      initializeSocket,
      user,
      userID,
      customers,
      chatUsers,
      chats,
      setChats,
      loading,
      getSingleTransactionList,
      transactions,
      getAllEvents,
      myevents,
      updateEvent,
      createTransaction,
      createEvent,
      socket,
    }),
    [
      login,
      socket,
      logout,
      getAllCustomers,
      getAllAvailableUsers,
      getAllSingleUserChats,
      sendMessageinChat,
      initializeSocket,
      user,
      userID,
      customers,
      chatUsers,
      chats,
      setChats,
      loading,
      getSingleTransactionList,
      transactions,
      getAllEvents,
      myevents,
      updateEvent,
      createTransaction,
      createEvent,
    ]
  );

  return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const useAuth = () => useContext(AuthContext);
