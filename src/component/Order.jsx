import React from 'react'
import { HeadingPrimary } from '../shared/typography'
import { Button, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'


function Order({ orderData, page }) {
    const navigate = useNavigate()
    const cellText = {
        color: 'grey.900',
        fontWeight: '400'
    }
    return (
        <Container>
            <Grid container>
                <HeadingPrimary variant='h4' sx={{ color: 'grey.900' }}>
                    {page === 'orderHistory' ? 'Order History' : 'Orders'}
                </HeadingPrimary>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow sx={{ borderBottom: '2px solid #333' }}>
                                <TableCell><Typography variant='h6'>ID</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Date</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Total</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Paid</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Delivered</Typography></TableCell>
                                <TableCell><Typography variant='h6'>Actions</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orderData?.map((row) => (
                                <TableRow
                                    key={row._id}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography variant='h6' sx={cellText}>
                                            {row._id}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={cellText}>
                                            {row.createdAt.slice(0, 10)}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={cellText}>
                                            ${row.totalPrice}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={cellText}>
                                            {row.isPaid ? 'Yes' : 'No'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant='h6' sx={cellText}>
                                            {row.isDelivered ? 'Yes' : 'No'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            onClick={() => { navigate('/order/' + row._id) }}
                                        >
                                            Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Container>
    )
}

export default Order