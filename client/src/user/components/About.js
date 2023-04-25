import { Box, Card, CardContent, Grid, Typography, alpha } from '@mui/material'
import React from 'react'

function About() {
  return (
    <Box mt={15}>
      <Card
        sx={{
          p: {md:3,lg:5},
          mx: { xs: 2, lg: 2 },
          mt: 0,
          mb: 4,
          boxShadow: 5,
          borderRadius: 4,
          width: { sm: '80vw', md: '90vw' },
          bgcolor: alpha('#101621', 0)
        }}
      >

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, lg: 2 }}  >
          <Grid item xs={12} lg={4} >
            <Card sx={{ background: 'linear-gradient(to right bottom, #1a237e, #b71c1c)', borderRadius: 4 }} >
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 0 }}  >
                <img src="images/a.png" alt="" width={'40%'} />
              </Box>
              <CardContent sx={{minHeight:140}}>
                <Typography gutterBottom variant="h4" component="div" color={'white'}>
                  รับชมได้ในทีวี
                </Typography>
                <Typography variant="body1" color={'white'}>
                  รับชมได้ในสมาร์ททีวี Playstation, Xbox, Chromecast, Apple TV เครื่องเล่น Blu-ray และอีกมากมาย
                </Typography>
              </CardContent>
            </Card>

          </Grid>
          <Grid item xs={12} lg={4} >
            <Card sx={{ background: 'linear-gradient(to right bottom, #1a237e, #b71c1c)', borderRadius: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 0 }}  >
                <img src="images/b.png" alt="" width={'40%'} />

              </Box>
              <CardContent sx={{minHeight:140}}>
                <Typography gutterBottom variant="h4" component="div" color={'white'}>
                  รับชมได้ทุกที่
                </Typography>
                <Typography variant="body1" color={'white'}>
                  สตรีมภาพยนตร์และรายการทีวีได้ไม่จำกัดในโทรศัพท์ แท็บเล็ต แล็ปท็อป และทีวี
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card sx={{ background: 'linear-gradient(to right bottom, #1a237e, #b71c1c)', borderRadius: 4 }} >
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 0 }}  >
                <img src="images/d.png" alt="" width={'40%'} />
              </Box>
              <CardContent sx={{minHeight:140}}>
                <Typography gutterBottom variant="h4" component="div" color={'white'}>
                  ดาวน์โหลดเนื้อหาไว้รับชมออฟไลน์
                </Typography>
                <Typography variant="body1" color={'white'}>
                  บันทึกเนื้อหาโปรดได้ง่ายๆ และมีความบันเทิงพร้อมให้รับชมอยู่เสมอ
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


      </Card>
    </Box>
  )
}

export default About
