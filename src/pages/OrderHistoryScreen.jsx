import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Error from '../component/Error'
import { getOrderHistory } from '../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import { Container, Grid, Paper, TableContainer, TablePagination, Typography } from '@mui/material'
import TablePrimary from '../component/TablePrimary'
import LayoutPrimary from '../layouts/LayoutPrimary'
function OrderHistoryScreen() {
  const { ordersHistory, isLoading, isError, error } = useSelector(state => state.order)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [page, setPage] = useState(0)
  const [rowPerPage, setRowPerPage] = useState(10)

  useEffect(() => {
    dispatch(getOrderHistory({ page: page + 1, pageSize: rowPerPage }))
  }, [dispatch, page, rowPerPage])

  const handlePageChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
  }

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Date', value: 'createdAt' },
    { heading: 'Total', value: 'totalPrice' },
    { heading: 'Paid', value: 'isPaid' },
    { heading: 'Delivered', value: 'isDelivered' },
    { heading: 'Actions', value: 'actions' }
  ]

  const actions = [
    {
      name: 'Details',
      value: 'details',
      onclick: (id) => {
        navigate(`/order/${id}`)
      }
    }
  ]
  return (
    <LayoutPrimary>
      <Container>
        <Grid container rowSpacing={'2rem'}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ color: 'grey.900' }}>
              Order History
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {
              isLoading ? (<Loader />) :
                isError ? (<Error message={error} />) :
                    (<TableContainer component={Paper}>
                      <TablePrimary data={ordersHistory.orders} columns={columns} actions={actions} />
                      <TablePagination
                        component="div"
                        count={ordersHistory?.countOrders}
                        page={page}
                        onPageChange={handlePageChangePage}
                        rowsPerPage={rowPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                      />
                    </TableContainer>)
            }
          </Grid>
        </Grid>
      </Container>
    </LayoutPrimary>
  )
}

export default OrderHistoryScreen