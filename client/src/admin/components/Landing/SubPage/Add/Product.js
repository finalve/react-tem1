import React, { useEffect, useRef, useState } from 'react'
import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography, alpha } from '@mui/material'
import useData from '../../../hook/useData';
import userService from '../../../../../services/user';


function Product() {
    const { language, setSending, setError,setMessageBox } = useData();
    const fileInputRef = useRef();
    const dataDefault = {
        name: '',
        cost: '',
        price: '',
        type: '',
        description: ''
    }
    const [image, setImage] = useState({ preview: '', data: '' })
    const [data, setData] = useState(dataDefault);
    const [types, setTypes] = useState([]);
    const handleUpload = (event) => {
        event.preventDefault();

        const file = fileInputRef.current.files[0];
        if (file) {
            // ทำการอัพโหลดไฟล์ที่เลือก

            const img = {
                preview: URL.createObjectURL(file),
                data: file,
                name: file.name
            }
            setImage(img)
        } else {
            console.log('ไม่มีไฟล์ถูกเลือก');
        }
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        setMessageBox(true);
        const formData = new FormData();
        formData.append('img', image.data);
        formData.append('name', data.name);
        formData.append('cost', data.cost);
        formData.append('price', data.price);
        formData.append('type', data.type);
        formData.append('description', data.description);
        userService.createProduct(formData).then(res => {
            setError(null);
            setSending(res.data.message);
            setData(dataDefault);
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
                const response = await userService.getTypes();
                const arr = response.data.map(type => type.name);
                setTypes(arr);
            }catch (err){
                setError('API Error!')
            }
         

        }
        fetchData();
    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
          
            <Card sx={{ bgcolor: alpha('#212121', 0.125), padding: 3.5 }}>
            <Box display='flex' justifyContent='center' alignItems='center'><Typography variant='h3' >{language.products}</Typography></Box>
                <CardContent>

                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>

                            <TextField
                                id="name"
                                name="name"
                                label={language.productname}
                                onChange={handleOnChange}
                                value={data.name}
                                variant="standard"
                              
                            />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="cost"
                                name="cost"
                                label={language.cost}
                                onChange={handleOnChange}
                                value={data.cost}
                                variant="standard"
                               
                                type='number'
                            />
                        </FormControl>
                    </Box>
                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="price"
                                name='price'
                                label={language.price}
                                onChange={handleOnChange}
                                value={data.price}
                                variant="standard"
                               
                                type='number'
                            />
                        </FormControl>
                    </Box>

                    <Box mt={2}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 320 }}>
                            <InputLabel variant="standard" htmlFor="type">
                                {language.type}
                            </InputLabel>
                            <Select
                                id='type'
                                name='type'
                                value={data.type}
                                onChange={handleOnChange}
                              
                            >
                                   {types && types.map((type, index) => <MenuItem key={index} value={type}>{type}</MenuItem>)}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box mt={2} justifyContent={'center'} alignItems={'center'}>
                        <Box p={3}>   {
                            image.preview &&
                            <img src={image.preview} alt={image.name} width={100} height={100} />
                        }</Box>
                        <FormControl variant="standard" sx={{ width: '100%', alignItems: 'center' }}>
                            <label htmlFor="img">
                                {language.upload}
                            </label>

                            <Button
                                variant="contained"
                                component="label"
                                sx={{ width: '100%', mt: 1 }}
                            >
                                Upload Image
                                <input
                                    ref={fileInputRef}
                                    id="img"
                                    name='img'
                                    type="file"
                                    hidden
                                    onChange={handleUpload}

                                />
                            </Button>
                        </FormControl>
                    </Box>

                    <Box mt={2}>
                        <FormControl sx={{ m: 1, minWidth: 320 }}>
                            <TextField
                                id="description"
                                name="description"
                                label={language.description}
                                onChange={handleOnChange}
                                value={data.description}
                                variant="standard"
                                multiline
                                rows={4}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Box>
                </CardContent>

                <CardActions  sx={{ padding: 2 }} >
                    <Button onClick={handleOnSubmit} color='info' variant='contained' sx={{ width: '100%' }}>{language.submit}</Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default Product
