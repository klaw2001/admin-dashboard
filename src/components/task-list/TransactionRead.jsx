import { Box, Card, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from 'src/contexts/auth-context';

const TransactionRead = ({ user }) => {
  const { getSingleTransactionList, loading, transactions } = useAuth();
  const [data, setData] = useState([]);
  useEffect(() => {
    // if (user) {
    //   const getData = async () => {
    //     try {
    //       const res = await getSingleTransactionList(user);
    //       setData(res);
    //     } catch (error) {
    //       console.error('Error fetching transaction data:', error);
    //       setData([]);
    //     }
    //   };
    //   getData();
    // } else {
    //   setData([]);
    // }

    getSingleTransactionList(user);
  }, [user]);
  return (
    <>
      {loading ? (
        <Card sx={{ height: '600px', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Loading...</Typography>
          </Box>
        </Card>
      ) : !transactions || transactions.length === 0 ? (
        <Card sx={{ height: '600px', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography>Oops! No Data To Show</Typography>
          </Box>
        </Card>
      ) : (
        <Card sx={{ height: '600px', overflowY: 'scroll', scrollbarWidth: 'thin' }}>
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
              {transactions.map((item, ind) => (
                <React.Fragment key={ind}>
                  <Box sx={{ paddingBottom: '15px' }}>
                    <Typography
                      sx={{
                        padding: '10px 15px',
                        borderRadius: '10px',
                        color: 'white',
                        background: item.color,
                      }}
                    >
                      {item.textContent}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ fontSize: '12px', textAlign: 'right' }}>
                      {new Date(item.createdAt).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </Typography>
                  </Box>
                  <Box sx={{ paddingBottom: '15px' }}>
                    {item.imageUrl && (
                      <>
                        <img
                          src={item.imageUrl}
                          alt=""
                          width={400}
                          height={400}
                          style={{ borderRadius: '10px', objectFit: 'cover' }}
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ fontSize: '12px', textAlign: 'right' }}
                        >
                          {new Date(item.createdAt).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </Typography>
                      </>
                    )}
                  </Box>
                </React.Fragment>
              ))}
            </Box>
          </Box>
        </Card>
      )}
    </>
  );
};

export default TransactionRead;
