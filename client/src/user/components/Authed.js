import { Box } from '@mui/material'
import React from 'react'
import Products from './Products'

function Authed() {
    return (
        <Box minHeight={'92vh'} display={'flex'} justifyContent={'center'} alignItems={'center'} >
            <Products />
        </Box>
    )
}

export default Authed
