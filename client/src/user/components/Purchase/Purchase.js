import {  Box, Button, Card, CardContent } from '@mui/material'
import React, { useState } from 'react'
import useData from '../../../admin/components/hook/useData';
import userService from '../../../services/user';
import { useNavigate } from 'react-router-dom';

function Purchase() {
  const { dataPurchase , setSending, setError, setMessageBox} = useData();
  const navigate = useNavigate();
  const handleOnPurchase = () => {
    const { orderId } = dataPurchase;
    setMessageBox(true);
    navigate('/');
    userService.purchaseItem({ orderId }).then(res => {
      setError(null);
      setSending(res.data.message);
    }).catch(err =>{
      setSending(null);
      setError(err.response.data.error)
    })
  }
  
  return (
    <Box >
      <Box display={'flex'} justifyContent={'center'} mt={10} flex={4} p={2}>
        <Card sx={{ width: { xm: '100vw', sm: '90vw', md: '50vw', lg: '30vw' } }}>
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3, margin: 3 }}  >
              <img src={userService.imagePath(dataPurchase.img)} alt="" width={'50%'} />
            </Box>
          </Box>
          <CardContent >
            <Box textAlign={'center'}>
              <Box><h1>{dataPurchase.name}</h1></Box>
              <Box>ราคา {dataPurchase.price}</Box>
              <Box>อายุการใช้งาน {dataPurchase.expiry} วัน</Box>


              <Box ><h1 >รายละเอียด</h1></Box>
              <Box >{dataPurchase.description.split('•').map((x,index) => x && <Box key={index}>• {x}</Box>)}</Box>
              <Box >  <h1 style={{ borderBottom: "3px solid rgb(212, 212, 212)" }}></h1></Box>
              <Box margin={4}>
                <Button onClick={handleOnPurchase} variant='contained' color='error'>Purchase</Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  )
}

export default Purchase
