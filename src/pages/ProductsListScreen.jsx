import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
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
  Grid
} from '@mui/material'
import { HeadingPrimary } from '../shared/typography'
import { ButtonPrimary } from '../shared/button'
import Loader from '../component/Loader'
import Error from '../component/Error'
import TablePrimary from '../component/TablePrimary'
import { toast } from 'react-toastify'

function ProductsListScreen() {
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
        if(window.confirm('Are you sure to delete?')){
          dispatch(deleteProduct(id))
          .unwrap()
          .then(()=>{
            toast.success('Deleted successfully')
          })
          .catch(error=>toast.error(error))
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
      <Grid container direction='column' rowSpacing='1rem'>
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
          <TablePrimary data={products} columns={columns} actions={actions} />
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
      </Grid>


    </Container>
  )
}

export default ProductsListScreen