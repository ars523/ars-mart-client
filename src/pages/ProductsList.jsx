import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  createProduct,
  deleteProduct,
  getProductList,
  reset,
  resetProductEdit
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import { ButtonPrimary } from '../shared/button'
import Loader from '../component/Loader'
import Error from '../component/Error'
function ProductsList() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const page = queryParams.get("page") || 1
  const pages = useSelector(state => state.product.productList.pages) || 1
  const { products } = useSelector(state => state.product.productList)
  const { isLoading, isError, error, isSuccess } = useSelector(state => state.product)

  useEffect(() => {
    dispatch(getProductList(page))
  }, [page, dispatch])

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset())
    }
  }, [dispatch, isSuccess])

  const cellText = {
    color: 'grey.900',
    fontWeight: '400'
  }

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

  const handleEdit = (id) => {
    navigate(`/admin/product/${id}`)
  }

  const handleDelete = (id) => {
    dispatch(deleteProduct(id))
  }

  return (
    <Container>
      {
        isLoading
          ? (<Loader />)
          : isError
            ? (<Error message={error} />)
            : (<Grid container direction='column' rowSpacing='1rem'>
              <Grid item container justifyContent='space-between'>
                <HeadingPrimary variant='h4' sx={{ color: 'grey.900' }}>
                  Products
                </HeadingPrimary>
                <ButtonPrimary
                  variant='contained'
                  size='small'
                  onClick={handleClickOpen}
                >
                  Create Product
                </ButtonPrimary>
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

              </Grid>
              <Grid item>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow sx={{ borderBottom: '2px solid #333' }}>
                        <TableCell><Typography variant='h6'>ID</Typography></TableCell>
                        <TableCell><Typography variant='h6'>Name</Typography></TableCell>
                        <TableCell><Typography variant='h6'>Price</Typography></TableCell>
                        <TableCell><Typography variant='h6'>Category</Typography></TableCell>
                        <TableCell><Typography variant='h6'>Brand</Typography></TableCell>
                        <TableCell><Typography variant='h6'>Actions</Typography></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products?.map((row) => (
                        <TableRow
                          key={row.name}
                        >
                          <TableCell component="th" scope="row">
                            <Typography variant='h6' sx={cellText}>
                              {row._id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='h6' sx={cellText}>
                              {row.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='h6' sx={cellText}>
                              ${row.price}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='h6' sx={cellText}>
                              {row.category}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant='h6' sx={cellText}>
                              {row.brand}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <ButtonPrimary
                              variant='outlined'
                              onClick={() => handleEdit(row._id)}
                              sx={{ mr: '8px' }}
                            >
                              Edit
                            </ButtonPrimary>

                            <ButtonPrimary
                              variant='outlined'
                              onClick={() => handleDelete(row._id)}
                            >
                              Delete
                            </ButtonPrimary>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item sx={{ mt: '1rem' }}>
                {
                  [...Array(pages).keys()].map((x) => (
                    <Link
                      style={{
                        textDecoration: 'none',
                        fontWeight: x + 1 === Number(page) ? 'bold' : null,
                        padding: '8px'
                      }}
                      to={`/admin/productlist?page=${x + 1}`}
                      key={Math.random()}
                    >
                      {x + 1}
                    </Link>
                  ))
                }
              </Grid>
            </Grid>)
      }

    </Container>
  )
}

export default ProductsList