import React, { useEffect, useState } from 'react'
import { customer } from '../../../vitualData';
import Post from './Post';
import Paginate from './Paginate';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import useData from '../../../hook/useData';
import userService from '../../../../../services/user';

function Dashboard() {
  const { language, setSending, setError, setMessageBox } = useData();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (props) => {
    setOpen(true);
    setSelected(props)
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const fetchPosts = async () => {
      setMessageBox(true);
      try {
        setError();
        setLoading(true);
        const response = await userService.getUserdata()
        let sorted = response.data.sort((a, b) => parseInt(a.remainingdays) - parseInt(b.remainingdays))
        setPosts(sorted);
        setSending('API Loaded')
        setLoading(false);
      } catch (err) {
        setError('API Error!')
      }
    }
    fetchPosts();
  }, [])


  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Change Page
  const paginate = (event, pagesNumber) => setCurrentPage(pagesNumber);
  return (
    <Box>
      <Box display='flex' justifyContent='center' p={5}><Typography variant='h3' >{language.dashboard}</Typography></Box>
      <Post posts={currentPosts} loading={loading} handleClickOpen={handleClickOpen} />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ข้อมูลลูกค้า</DialogTitle>
        <DialogContent>
          <TextField
            value={selected?.store?.email}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
          <TextField
            value={selected?.store?.password}
            margin="dense"
            id="password"
            label="Password"
            type="text"
            fullWidth
            variant="standard"
          />
          {selected?.options && selected.options.map((option, index) => <Box key={index}>
            <TextField
              value={option.name}
              margin="dense"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
            />
            <TextField
              value={option.value}
              margin="dense"
              label="Value"
              type="text"
              fullWidth
              variant="standard"
            />
          </Box>
          )
          }
        </DialogContent>
        <DialogActions>
          <Button color='error' onClick={handleClose}>ลบสินค้า</Button>
          <Button color='success' onClick={handleClose}>ยกเลิก</Button>
        </DialogActions>
      </Dialog>
      <Paginate postsPerPages={postsPerPage} totalPosts={posts.length} paginate={paginate} />
    </Box>
  )
}

export default Dashboard
