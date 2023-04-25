import React, { useRef, useState } from 'react'
import styled from '@emotion/styled';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, FormControl, InputBase, InputLabel, MenuItem, Select, TextField, Typography, alpha } from '@mui/material'
import useData from '../../../hook/useData';
import userService from '../../../../../services/user';
import { Link } from 'react-router-dom';


function Type() {
    const { language , setSending, setError ,setMessageBox} = useData();
    const dataDefault = {
        name: '',
        description: ''
    }
    const [data, setData] = useState(dataDefault);
  

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setMessageBox(true);
        userService.createType(data).then(res => {
            setError(null);
            setSending(res.data.message);
            setData(dataDefault);
        }).catch(err => {
            setSending(null);
            setError(err.response.data.error)
        })
    }
    const handleOnChange = (e) => {
        const { id, value } = e.target;
        setData(x => { return { ...x, [id]: value } });
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <Card sx={{ bgcolor: alpha('#212121', 0.125), padding: 3.5 }}>
                <Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h3' >{language.stores}</Typography></Box>
                <CardContent>

                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>

                            <TextField
                                id="name"
                                label={language.type}
                                onChange={handleOnChange}
                                value={data.name}
                                variant="standard"
                            />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="description"
                                label={language.description}
                                onChange={handleOnChange}
                                value={data.description}
                                variant="standard"
                                multiline
                                rows={4}
                            />
                        </FormControl>
                    </Box>

                </CardContent>
                <CardActions sx={{ padding: 2 }} >
                    <Button onClick={handleOnSubmit} color='info' variant='contained' sx={{ width: '100%' }}>{language.submit}</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Type
