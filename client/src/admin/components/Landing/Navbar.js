import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { Home, ExpandLess, ExpandMore, AddBusiness, Report, Settings, Storefront, LocalGroceryStore, Web, Logout, Category, Redeem } from '@mui/icons-material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import {  Alert, AlertTitle, Collapse, Menu, MenuItem, Snackbar } from '@mui/material';
import useData from '../hook/useData';
import { lang } from '../vitualData';
const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(0)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Navbar() {
  const theme = useTheme();
  const navigate = useNavigate()
  const { language, authDispatch, setLanguage,sending, error, messaseBox, handleMessageBoxClose } = useData();
  const [open, setOpen] = React.useState(false);
  const [create, setCreate] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openlang = Boolean(anchorEl);
  const handleLangopen = (event) => setAnchorEl(event.currentTarget);;
  const handleLangclose = () => setAnchorEl(null);

  const handleLangEN = () => setLanguage(lang[1]);
  const handleLangTH = () => setLanguage(lang[0]);
  const handleDrawerOpen = () => setOpen(true);


  const handleDrawerClose = () => setOpen(false);

  const handleCreateToggle = () => setCreate(!create);

  const handleLogOut = () => {
    navigate('/');
    authDispatch({ type: "logout" });
  }

  return (
    <Box sx={{ display: 'flex' }}>
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
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#000000' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            MMYSTORES
          </Typography>
          <Box sx={{ flexGrow: 1, display:'block' }} />
          <Box sx={{ flexGrow: 0 }} display={'block'} >
            <List
              component="nav"
              aria-label="Device settings"
              sx={{ bgcolor: 'background.paper' }}
            >
              <ListItem disablePadding sx={{ display: 'block' }} >
                <ListItemButton
                  id='lang-menu'
                 
                  onClick={handleLangopen}>
                  <ListItemText
                    primary={language.lang}
                  />
                </ListItemButton>

              </ListItem>
            </List>
            <Menu
              anchorEl={anchorEl}
              open={openlang}
              onClose={handleLangclose}
            >
              <MenuItem onClick={handleLangTH}>ไทย</MenuItem>
              <MenuItem onClick={handleLangEN}>English</MenuItem>
            </Menu>

          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              component={Link} to=''
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Home />
              </ListItemIcon>
              <ListItemText primary={language.dashboard} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={handleCreateToggle}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <AddBusiness />
              </ListItemIcon>
              <ListItemText primary={language.creates} sx={{ opacity: open ? 1 : 0 }} />
              {open ? create ? <ExpandLess /> : <ExpandMore /> : ''}
            </ListItemButton>
          </ListItem>
          <Collapse in={create} timeout="auto" unmountOnExit>
            <List >

              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to='type' sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  pl: 4
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                    <Category />
                  </ListItemIcon>
                  <ListItemText primary={language.types} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>


              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to='product' sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  pl: 4
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                    <Storefront />
                  </ListItemIcon>
                  <ListItemText primary={language.products} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to='store' sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  pl: 4
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                    <LocalGroceryStore />
                  </ListItemIcon>
                  <ListItemText primary={language.stores} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton component={Link} to='promotion' sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  pl: 4
                }}>
                  <ListItemIcon sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                    <Redeem />
                  </ListItemIcon>
                  <ListItemText primary={language.promotions} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>

            </List>
          </Collapse>
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Report />
              </ListItemIcon>
              <ListItemText primary={language.reports} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>



        </List>
        <Divider />
        <List>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link} to='/'
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Web />
              </ListItemIcon>
              <ListItemText primary={language.web} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={Link} to='setting'
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                <Settings />
              </ListItemIcon>
              <ListItemText primary={language.settings} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
                onClick={handleLogOut}
              >
                <Logout />
              </ListItemIcon>
              <ListItemText primary={language.logout} sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: { xs: 0, sm: 3 } }}>
        <DrawerHeader />

        <Outlet />
      </Box>
    </Box>
  );
}