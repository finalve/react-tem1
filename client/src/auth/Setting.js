
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import userService from '../services/user';
import useData from '../admin/components/hook/useData';

function Setting() {
  const { language, authState  , setSending, setError,setMessageBox} = useData();
  const defaultData = {
    password: '',
    newpassword: '',
    confirmpassword: ''
  }
  const [data, setData] = useState(defaultData)

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(x => { return { ...x, [id]: value } });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setMessageBox(true);
    userService.update(data).then(res => {
      setError(null);
      setSending(res.data.message);
      setData(defaultData);
    }).catch(err => {
      setSending();
      setError(err.response.data.error)
    })

  }
  return (
    <Box sx={{ display: 'flex' }}>
      <Card sx={{ bgcolor: 'background.default', padding: 3.5 }}>
        <CardContent>
          <Typography gutterBottom variant='h4' component="div" >สมัครสมาชิก</Typography>
          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <TextField
                id="username"
                label={language.username}
                value={authState.User.username}
                variant="standard"

              />
            </FormControl>
          </Box>
          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <TextField
                id="password"
                label={language.password}
                onChange={handleOnChange}
                value={data.password}
                variant="standard"
                type='password'
              />
            </FormControl>
          </Box>

          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <TextField
                id="newpassword"
                label={language.newpassword}
                onChange={handleOnChange}
                value={data.newpassword}
                variant="standard"
                type='password'
              />
            </FormControl>
          </Box>

          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <TextField
                id="confirmpassword"
                label={language.confirmpassword}
                onChange={handleOnChange}
                value={data.confirmpassword}
                variant="standard"
                type='password'
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions alignItems='center' sx={{ padding: 2 }} >
          <Button onClick={handleOnSubmit} variant='contained' color='error' sx={{ width: '100%' }}>{language.update}</Button>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Setting
