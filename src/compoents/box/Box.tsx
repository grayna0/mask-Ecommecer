import React from 'react'
import Box from '@mui/material/Box';

const Boxs = () => {
  return (
    <>
         <Box   sx={{
        width: 300,
        height: 300,
        backgroundColor: 'white',

        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
        <Box   sx={{
        width: 300,
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
        <Box   sx={{
        width: 300,
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
            <Box   sx={{
        width: 300,
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
    </>
  )
}

export default Boxs