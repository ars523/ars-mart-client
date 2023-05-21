import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  getProductList,
  reset
} from '../features/products/productSlice'
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  TableContainer,
  Typography,
  TablePagination
} from '@mui/material'
import Loader from '../component/Loader'
import Error from '../component/Error'
import TablePrimary from '../component/TablePrimary'
import { toast } from 'react-toastify'
import AddIcon from '@mui/icons-material/Add';

function ProductsListScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [page, setPage] = useState(0)
  const [rowPerPage, setRowPerPage] = useState(10)
  const { products, countProducts } = useSelector(state => state.product.productList)
  const { isLoading, isError, error, isSuccess } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getProductList({page: page + 1, pageSize: rowPerPage}))
  }, [page, dispatch, rowPerPage])

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }
  }, [dispatch, isSuccess])

  const columns = [
    { heading: 'Id', value: '_id' },
    { heading: 'Name', value: 'name' },
    { heading: 'Price', value: 'price' },
    { heading: 'Category', value: 'category' },
    { heading: 'Brand', value: 'brand' },
    { heading: 'Actions', value: 'actions' }
  ]

  const actions = [
    {
      name: 'Edit',
      value: 'edit',
      onclick: (id) => {
        navigate(`/admin/product/${id}`)
      }
    },
    {
      name: 'Delete',
      value: 'delete',
      onclick: (id) => {
        if (window.confirm('Are you sure to delete?')) {
          dispatch(deleteProduct(id))
            .unwrap()
            .then(() => {
              toast.success('Deleted successfully')
            })
            .catch(error => toast.error(error))
        }
      }
    }
  ]

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCreateProduct = () => {
    handleClose()
    dispatch(createProduct())
      .unwrap()
      .then((res) => navigate(`/admin/product/${res._id}`))
  }

  const handlePageChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowPerPage(parseInt(event.target.value, 10));
  }

  if (isLoading) {
    return <Loader />
  }
  else if (isError) {
    return <Error message={error} />
  }
  else if (products?.length === 0) {
    return <Error message='No product found' />
  }
  return (
    <Container>
      <Grid container direction='column' rowSpacing='2rem'>
        <Grid item container justifyContent='space-between'>
          <Typography variant='h5' sx={{ color: 'grey.900' }}>
            Products
          </Typography>
          <Button
            startIcon={<AddIcon />}
            variant='contained'
            size='small'
            onClick={handleClickOpen}
          >
            Create Product
          </Button>

          {/* <--Dialog to create product start--> */}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Create new product?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                A dummy product will be created and you have to update it with your content and image.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Disagree</Button>
              <Button onClick={handleCreateProduct} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
          {/* <--Dialog to create product start--> */}
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <TablePrimary data={products} columns={columns} actions={actions} />
            <TablePagination
              component="div"
              count={countProducts}
              page={page}
              onPageChange={handlePageChangePage}
              rowsPerPage={rowPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}

export default ProductsListScreen