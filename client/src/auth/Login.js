
import { Box, Button, Card, CardActions, CardContent, FormControl, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useData from '../admin/components/hook/useData';
import userService from '../services/user';

function Login() {
  const { language, authDispatch , setSending, setError,setMessageBox } = useData();
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const handleOnChange = (e) => {
    const { id, value } = e.target;
    console.log(id)
    setData(x => { return { ...x, [id]: value } });
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    setMessageBox(true);
    userService.login(data).then(res => {
      authDispatch({ type: "login" });
      setError(null)
      setSending(res.data.message);
      navigate('/')
      localStorage.setItem("user", JSON.stringify(res.data));
    }).catch(err => {
      setSending(null)
      setError(err.response.data.error)
    })
  }
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '90vh'}}>
      <Card sx={{ bgcolor: 'background.default', padding: 3.5 }}>
        <CardContent>
          <Typography gutterBottom variant='h4' component="div">เข้าสู่ระบบ.</Typography>
          <Box mt={2}>
            <FormControl sx={{ m: 1, minWidth: 320 }}>

              <TextField
                id="username"
                label={language.username}
                onChange={handleOnChange}
                value={data.username}
                variant="standard"
                type='text'
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
                fullWidth
              />
            </FormControl>
          </Box>
        </CardContent>
        <CardActions sx={{ padding: 2, justifyContent: 'center', display: 'flex' }} >
          <Button variant='contained' color='error' sx={{ width: '100%' }} onClick={handleOnSubmit}>{language.login}</Button>
        </CardActions>
        <CardContent>
          <Typography variant='body1' >ยังไม่มีบัญชี ? <Link to='/auth/register'>{language.register}</Link></Typography>

        </CardContent>
      </Card>
    </Box>
  )
}

export default Login
