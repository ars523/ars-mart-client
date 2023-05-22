import React from 'react'
import Header from '../component/Header'
import { Box, Toolbar } from '@mui/material'

export default function LayoutPrimary({children, headerBottomGap}) {
  return (
    <Box sx={{pb:'3rem'}}>
        <Header/>
        <Toolbar sx={{mb: headerBottomGap? headerBottomGap: '2rem'}}/>
        {children}
    </Box>
  )
}
