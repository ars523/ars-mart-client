import React from 'react'
import Header from '../component/Header'
import { Box} from '@mui/material'
import Footer from '../component/Footer'

export default function LayoutPrimary({children, headerBottomGap}) {
  return (
    <Box>
        <Header/>
        <Box sx={{mb: headerBottomGap? headerBottomGap: '2rem'}}/>
        {children}
        <Box sx={{mb: '4rem'}}/>
        {/* <Footer/> */}
    </Box>
  )
}
