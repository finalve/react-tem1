import { Box, Button, Card, CardActionArea, CardContent, Grid, Typography, alpha } from '@mui/material'
import React, { useEffect, useState } from 'react'
import useData from '../../admin/components/hook/useData';
import userService from '../../services/user';
import { useNavigate } from 'react-router-dom';
function Products() {
  const navigate = useNavigate();
  const { authState, setPurchase } = useData();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await userService.getShop();
        let result = [];
        response.data.forEach(product => {

          if (!result.length) {
            product.total = 1;
            result.push(product)
          }
          else {
            const existProduct = result.find(props => props.expiry === product.expiry && props.name === product.name)
            if (existProduct)
              existProduct.total += 1
            if (!existProduct) {
              product.total = 1
              result.push(product);
            }
          }


        });
        setProducts(result);
      } catch (err) {
        console.log('API Error!')
      }

    }
    fetchData();
  }, []);
  const handleOnPurchase = (element) => {
    if (authState) {
      setPurchase(element);
      navigate("purchase")
    } else
      navigate("/auth")
  }
  return (
    <Box mt={15} mb={7.5}>
      <Box textAlign={'center'} mb={5}>
        <Typography gutterBottom variant="h2" color={'white'}>
          รายการสินค้า
        </Typography>
      </Box>
      <Card
        sx={{
          p: { md: 3, lg: 5 },
          mx: { xs: 2, lg: 2 },
          mt: 0,
          mb: 4,
          boxShadow: 5,
          borderRadius: 2,
          width: { sm: '80vw', md: '90vw' },
          bgcolor: alpha('#1a237e', 0.25)
        }}
      >

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, md: 2, lg: 2 }}  >
          {
            products.length ? products.map((product, index) =>
              <Grid item xs={12} sm={4} lg={3} key={index} >
                <Card sx={{ background: 'linear-gradient(to right bottom, #1a237e, #b71c1c)', borderRadius: 4 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', pt: 3 }}  >
                    <img src={userService.imagePath(product.img)} alt="" width={'50%'} />
                  </Box>
                  <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Button onClick={() => handleOnPurchase(product)} fullWidth>
                      <CardContent>
                        <Box color={'white'} textAlign={'center'} sx={{width:'100%'}}>
                          <Box  ><h2>{product.name} {product.expiry} วัน</h2></Box>
                          <Box >ราคา {product.price} บาท</Box>
                          <Box >ระยะเวลา {product.expiry} วัน</Box>
                          <Box >จำนวนสินค้า {product.total}</Box>
                        </Box>
                      </CardContent>
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ) : <Box textAlign={'center'}> <Typography variant='h2' margin={5}>ขณะนี้ไม่มีสินค้าเหลือในสต๊อก</Typography></Box>
          }
        </Grid>
      </Card>
    </Box>
  )
}

export default Products
