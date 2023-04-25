import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import useData from '../../admin/components/hook/useData';

function NavBar() {
  const navigate = useNavigate();
  const { authState ,authDispatch} = useData();
  const handleLogin = () => {
    navigate('/auth/login');
  };

  const handleRegister = () => {
    navigate('/auth/register');
  };

  const handleHome = () => {
    navigate('/');
  };

  const handleLogOut = () =>{
    authDispatch({type:"logout"});
    navigate('/');
  }


  return (

    <AppBar position="fixed" sx={{bgcolor:'#000000'}} >
      <Container maxWidth="xxl" >
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="button"
            onClick={handleHome}
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#d50000',
              textDecoration: 'none',
              bgcolor: 'transparent',
              border: 0
            }}
          >
            MMYSTORES
          </Typography>

          <Typography
            variant="h5"
            noWrap
            onClick={handleHome}
            component="button"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#d50000',
              textDecoration: 'none',
              bgcolor: 'transparent',
              border: 0
            }}
          >
            MMYSTORES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          {authState!==null ? 
          <Box sx={{ flexGrow: 0, display: 'flex' }}>
            <Button
              sx={{ my: 2, color: "#fafafa", display: 'block' }}
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          </Box> :
            <>
              <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                <Button
                  sx={{ my: 2, color: "#fafafa", display: 'block' }}
                  onClick={handleLogin}
                >
                  Log in
                </Button>
                <Button
                  sx={{ my: 2, color: "#fafafa", display: 'block' }}
                  onClick={handleRegister}
                >
                  Register
                </Button>
              </Box>
              <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>

                <Button onClick={handleLogin} sx={{ my: 2, color: "#fafafa", display: 'block', p: 0 }}>
                  Log In
                </Button>
              </Box>
            </>
          }


        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
