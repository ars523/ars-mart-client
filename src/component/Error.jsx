import { Paper, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'

function Error({ message }) {
    return (
        <Container maxWidth='md'>
            <Paper
                variant='outlined'
                sx={{
                    p: '32px',
                    bgcolor: '#ffebee',
                    color: '#f44336'
                }}>
                <Typography variant='h5'>{message}</Typography>
            </Paper>
        </Container>
    )
}

export default Error