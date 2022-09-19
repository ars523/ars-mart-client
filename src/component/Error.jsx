import { Paper, Typography } from '@mui/material'
import React from 'react'

function Error({ message }) {
    return (
        <Paper
            variant='outlined'
            sx={{
                p: '32px',
                bgcolor: '#ffebee',
                color: '#f44336'
            }}>
            <Typography variant='h5'>{message}</Typography>
        </Paper>
    )
}

export default Error