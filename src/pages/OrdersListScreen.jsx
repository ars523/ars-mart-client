import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../component/Loader'
import Error from '../component/Error'
import { deleteOrderByAdmin, getAllOrders } from '../features/order/orderSlice'
import { useNavigate } from 'react-router-dom'
import TablePrimary from '../component/TablePrimary'
import { Container, Grid, Paper, TableContainer, TablePagination, Typography } from '@mui/material'
import { toast } from 'react-toastify'
import LayoutPrimary from '../layouts/LayoutPrimary'

function OrdersList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { orders, isLoading, isError, error } = useSelector(state => state.order)
  const [page, setPage] = useState(0)
  const [rowPerPage, setRowPerPage] = useState(10)

  console.log(isLoading)

  useEffect(() => {
    dispatch(getAllOrders({ page: page + 1, pageSize: rowPerPage }))
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
    },
    {
      name: 'Delete',
      value: 'delete',
      onclick: (id) => {
        if (window.confirm("Are you sure to delete?")) {
          dispatch(deleteOrderByAdmin(id))
            .unwrap()
            .then(() => toast.success("Deleted successfully"))
            .catch(error => toast.error(error))
        }
      }
    }
  ]

  return (
    <LayoutPrimary>
      <Container>
        <Grid container rowSpacing={'2rem'}>
          <Grid item xs={12}>
            <Typography variant='h5' sx={{ color: 'grey.900' }}>
              Orders
            </Typography>
          </Grid>
          <Grid item xs={12}>
            {isLoading ? (<Loader />) :
              isError ? (<Error message={error} />) :
                orders.length === 0 ? (<Error message='No order found' />) :
                  (<TableContainer component={Paper}>
                    <TablePrimary data={orders?.orders} columns={columns} actions={actions} />
                    <TablePagination
                      component="div"
                      count={orders.countOrders}
                      page={page}
                      onPageChange={handlePageChangePage}
                      rowsPerPage={rowPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableContainer>)}
          </Grid>
        </Grid>
      </Container>
    </LayoutPrimary>
  )
}

export default OrdersList