import { Box, Stack } from '@mui/material'
import React from 'react'
import Feed from './Feed'
import About from './About'
import Products from './Products'

function Nonauth() {
  return (
    <Box>
    <Box mb={2} >
      <Stack direction={"row"} spacing={2} justifyContent={'space-between'}>
        <Feed />
        <Box flex={2} p={2} sx={{ display: { xs: "none", lg: "flex" } }} />
      </Stack>
    </Box>
    <Box>
      <About />
      <Products />
    </Box>

  </Box>
  )
}

export default Nonauth
