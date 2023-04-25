import React from 'react'
import {  Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
function Post({ posts, loading ,handleClickOpen}) {
    if (loading)
    return <h2>Loading...</h2>
   
  return (
    <TableContainer component={Paper}>
    <Table >
      <TableHead >
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell align="right">Product</TableCell>
          <TableCell align="right">Customer</TableCell>
          <TableCell align="right">Expiry</TableCell>
          <TableCell align="right">Management</TableCell>
        </TableRow>
      </TableHead>
      <TableBody >
        {posts.map((user, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } ,}}
          >
            <TableCell component="th" scope="row" >
              {index}
            </TableCell>
            <TableCell align="right" >{user.product}</TableCell>
            <TableCell align="right" >{user.user}</TableCell>
            <TableCell align="right" >{user.remainingdays}</TableCell>
            <TableCell align="right" ><Box><Button onClick={()=>handleClickOpen(user)} variant='contained'>VIEW</Button></Box></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  )
}

export default Post
