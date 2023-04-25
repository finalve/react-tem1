import React, { useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled';
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, FormControl, InputBase, InputLabel, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, alpha } from '@mui/material'
import useData from '../../../hook/useData';
import userService from '../../../../../services/user';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Add, Remove } from '@mui/icons-material';

import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';


import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
function Store() {
    const { language, setSending, setError ,setMessageBox} = useData();

    const dataDefault = {
        product: '',
        email: '',
        password: '',
        options: [],
        createAt: moment(),
        expiry: moment().add(37, 'days')
    }

    const dataOptions = {
        name: '',
        value: ''
    }
    const [data, setData] = useState(dataDefault);
    const [products, setProducts] = useState([]);
    const [options, setOptions] = useState(dataOptions);
    const [arrOptions, pushOptions] = useState([]);
    const handlePushOptions = () => {
        if (options.name !== '' && options.value !== '')
            pushOptions(arr => { return [...arr, options] })
        setOptions(dataOptions);
    }
    const handleRemoveOptions = () => {
        const rmOption = arrOptions.splice(0, arrOptions.length - 1);
        pushOptions(rmOption)
    }
    const handleOptionOnChange = (e) => {
        const { name, value } = e.target;
        setOptions(prev => { return { ...prev, [name]: value } })
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setMessageBox(true);
        let jsonData = data;
        jsonData.options = arrOptions;
        userService.createStore(jsonData).then(res => {
            setError(null);
            setSending(res.data.message);
            setData(dataDefault);
            pushOptions([]);
        }).catch(err => {
            setSending(null);
            setError(err.response.data.error)
        })
    }
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData(x => { return { ...x, [name]: value } });
    }


    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await userService.getProducts();
                const arr = response.data.map(product => product.name);
                setProducts(arr);
            }catch(err){
                setError('API Error!')
            }
        

        }
        fetchData();
    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
            <Card sx={{ bgcolor: alpha('#212121', 0.125), padding: 3.5 }}>
                <Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h3' >{language.stores}</Typography></Box>
                <CardContent>
                    <Box mt={2}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 320 }}>
                            <InputLabel variant="standard" htmlFor="product">
                                {language.product}
                            </InputLabel>
                            <Select
                                id="product"
                                name="product"
                                value={data.product}
                                onChange={handleOnChange}
                                type='text'
                            >
                                {products && products.map((option, index) => <MenuItem key={index} value={option}>{option}</MenuItem>)}

                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="email"
                                name="email"
                                label={language.email}
                                onChange={handleOnChange}
                                value={data.email}
                                variant="standard"
                                type='email'
                            />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="password"
                                name="password"
                                label={language.password}
                                onChange={handleOnChange}
                                value={data.password}
                                variant="standard"
                                type='text'
                            />
                        </FormControl>
                    </Box>

                    <Box mt={2}>
                        <Card>
                        <Box margin={2}>{language.options}</Box>
                            <CardContent>
                                <Box display='flex' justifyContent='space-between'>
                                    <Button onClick={handlePushOptions} variant='contained'  sx={{ width: '40%' }}><Add /></Button>
                                    <Button onClick={handleRemoveOptions} variant='contained' color='error' sx={{ width: '40%' }}><Remove /></Button>
                                </Box>
                                <Box mt={2}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            label={language.name}
                                            onChange={handleOptionOnChange}
                                            value={options.name}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Box>
                                <Box mt={2}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <TextField
                                            id="value"
                                            name="value"
                                            label={language.value}
                                            onChange={handleOptionOnChange}
                                            value={options.value}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Box>
                            </CardContent>
                            {arrOptions.length > 0 &&
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>{language.name}</TableCell>
                                                <TableCell align="right">{language.value}</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {arrOptions.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">{row.name}</TableCell>
                                                    <TableCell align="right">{row.value}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            }
                        </Card>
                        </Box>
                        <Box mt={2}>
                        <Card>
                            <CardContent>
                            <LocalizationProvider dateAdapter={AdapterMoment}>
                                <DemoContainer
                                    components={[
                                        'MobileDateTimePicker', 'MobileDateTimePicker'
                                    ]}
                                >
                                    <MobileDateTimePicker label="Create At" defaultValue={data.createAt} value={data.createAt} onChange={(value) => handleOnChange({ target: { name: 'createAt', value: value } })} />
                                    <MobileDateTimePicker label="Expiry At" defaultValue={data.expiry} value={data.expiry} onChange={(value) => handleOnChange({ target: { name: 'expiry', value: value } })}/>
                                </DemoContainer>
                            </LocalizationProvider>
                            <Box mt={2}>
                                    <FormControl sx={{ m: 1, minWidth: 300 }}>
                                        <TextField
                                            id="expirydays"
                                            name="name"
                                            label='expirydays'
                                            value={Math.ceil((data.expiry-data.createAt)/1000/60/60/24)}
                                            variant="standard"
                                        />
                                    </FormControl>
                                </Box>
                            </CardContent>
                            </Card>
                        </Box>

                 
                </CardContent>

                <CardActions sx={{ padding: 2 }} >

                    <Button onClick={handleOnSubmit} color='info' variant='contained' sx={{ width: '100%' }}>{language.submit}</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Store
