
import { Box, Button, Card, CardActions, CardContent, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import userService from '../services/user';
import useData from '../admin/components/hook/useData';

function Register() {
  const { language , setSending, setError,setMessageBox} = useData();
  const navigate = useNavigate();
  const defaultData = {
    username: '',
    password: '',
    confirmpassword:''
  }
  const [data, setData] = useState(defaultData)

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    setData(x => { return { ...x, [id]: value } });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setMessageBox(true);
    userService.register(data).then(res => {
      setError(null)
      setSending(res.data.message);
      setData(defaultData);
      navigate('/auth/login');
    }).catch(err => {
      setSending(null);
      setError(err.response.data.error)
    })

  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh' }}>
      <Card sx={{ bgcolor:'background.default', padding: 3.5 }}>
        <CardContent>
          <Typography gutterBottom variant='h4' component="div" >สมัครสมาชิก</Typography>
          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>
              <TextField
                id="username"
                label={language.username}
                onChange={handleOnChange}
                value={data.username}
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
          <Button onClick={handleOnSubmit} variant='contained' color='error' sx={{ width: '100%' }}>{language.register}</Button>
        </CardActions>
        <CardContent>
          <Typography variant='body1' >หากมีบัญชี MMYSTORES <Link to={'/auth/login'}>{language.login}</Link></Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Register
