import React from 'react'
import { Stack, CircularProgress } from '@mui/material'

function Loader() {
  return (
    <Stack
     sx={{width: '100%', height: '80vh'}}
     justifyContent='center'
     alignItems='center'
     >
        <CircularProgress/>
    </Stack>
  )
}

export default Loader