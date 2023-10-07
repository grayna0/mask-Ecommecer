import React from 'react'
import Box from '@mui/material/Box';
import "./boxcate.scss"
const Boxs = () => {
  return (
    <>
         <Box className="box-cate-list"  sx={{
       
        height: 300,
        backgroundColor: 'white',

        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],

        },
      }}/>
        <Box className="box-cate-list"  sx={{
    
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
        <Box className="box-cate-list"  sx={{
       
        height: 300,
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: 'white',
          opacity: [0.9, 0.8, 0.7],
        },
      }}/>
            <Box className="box-cate-list"  sx={{
       
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