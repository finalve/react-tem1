import { Box, Pagination, Stack } from '@mui/material'
import React from 'react'

function Paginate({ postsPerPages,totalPosts,paginate}) {
    const pageNumbers = [];
    for(let i = 1;i<=Math.ceil(totalPosts/postsPerPages);i++){
        pageNumbers.push(i);
    }
  return (
  <Box  p={2}>
    <Stack spacing={2}>
    <Pagination count={Math.ceil(totalPosts/postsPerPages)} onChange={paginate} variant="outlined" shape="rounded" />
  </Stack>
  </Box>
    
  )
}

export default Paginate
