import React from 'react'
import NavBar from './NavBar'
import { Alert, AlertTitle, Box, Snackbar, Stack, Typography } from '@mui/material';

import Products from './Products';
import Feed from './Feed';
import bgImage from "../../assets/images/header.png";
import About from './About';
import useData from '../../admin/components/hook/useData';
import { Outlet } from 'react-router-dom';


function Page({ purchase }) {
  const { authState,sending, setSending,error, setError,messaseBox, setMessageBox,handleMessageBoxClose } = useData();
  return (

    <Box>
      <NavBar sx={{ bgcolor: 'primary.main' }} />
      {sending &&
        <Snackbar
          open={messaseBox}
          autoHideDuration={6000}
          onClose={handleMessageBoxClose}
        >
          <Alert sx={{ width: '250px' }} variant='filled' severity="success">
            <AlertTitle>Success</AlertTitle>
            {sending}
          </Alert>
        </Snackbar>
      }
      :
      {
          error && 
          <Snackbar
          open={messaseBox}
          autoHideDuration={6000}
          onClose={handleMessageBoxClose}
        >
          <Alert sx={{ width: '250px' }} variant='filled' severity="error">
            <AlertTitle>Error</AlertTitle>
            {error}
          </Alert>
        </Snackbar>
      }
      <Box
        sx={{
          backgroundImage: `url(${bgImage})`,
          backgroundColor: '#000000',
          backgroundSize: { xs: 'contain', sm: 'auto' },
          backgroundRepeat: 'no-repeat',
          backgroundPosition: "top right",
          display: "grid",
          placeItems: "center",
        }}>
        <Outlet />
        <Box mt={10} mb={3}>
          <Typography color={'white'}> Copyright © 2021 by StyleV Project All Right Reserved.</Typography>
        </Box>

      </Box>
    </Box>

  )
}

export default Page
