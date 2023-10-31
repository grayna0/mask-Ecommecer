import { useState, useEffect } from 'react';

import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { green } from '@mui/material/colors';

// const LazyLoadSreen = () => {

//     const arrText =[ "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint", "hello world"]
    
//   return (
//     <Typewriter text={arrText} delay={100}  infinite/>
//   )
// }

// export default LazyLoadSreen




// export const Typewriter = ({ text, delay, infinite }:{ text:string[], delay:number, infinite:boolean }) => {
//   const [currentText, setCurrentText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [index, setIndex] = useState(0);
// console.log(index);

//   useEffect(() => {
//     let timeout:any;
//     if(index < text.length ) {
//         if (currentIndex <= text[index].length  ) {
//             timeout = setTimeout(() => {
//               setCurrentText(prevText => prevText + text[index][currentIndex]);
//               setCurrentIndex(prevIndex => prevIndex + 1);
//           }, delay);
          
//       }else if (infinite) { // ADD THIS CHECK
//           setCurrentIndex(0);
//           setCurrentText('');
//           setIndex(index => index +1)
//       }
      
        
//     }else{
//         setIndex(0)
//     }
   
  

//     return () =>  {
//         clearTimeout(timeout)}
//   }, [currentIndex, delay, infinite, text,index]);

//   return ( 
//   <div className='typing-animation'>
//      <h2>{currentText}</h2>
//   </div>
//   )
// };


export default function CircularIndeterminate() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress   
       size={24}
       sx={{
         color: green[500],
         position: 'absolute',
         top: '50%',
         left: '50%',
         marginTop: '-12px',
         marginLeft: '-12px',}}/>
    </Box>
  );
}
