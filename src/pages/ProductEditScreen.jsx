import { Grid, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getProductEdit, resetProductEdit, updateProduct, uploadProductImageFile } from '../features/products/productSlice'
import { ButtonPrimary } from '../shared/button'
import { HeadingPrimary } from '../shared/typography'
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify'
import Loader from '../component/Loader'
import Error from '../component/Error'
import LayoutPrimary from '../layouts/LayoutPrimary'

function ProductEditScreen() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { productEdit, isLoading, isUploading, isError, error } = useSelector((state) => state.product)

    const [inputData, setInputData] = useState({
        name: '',
        slug: '',
        price: 0,
        image: '',
        category: '',
        brand: '',
        countInStock: 0,
        description: '',

    })

    useEffect(() => {
        return () => {
            dispatch(resetProductEdit())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(getProductEdit(id))
    }, [dispatch, id])

    useEffect(() => {
        if (Object.keys(productEdit).length !== 0)
            setInputData(productEdit)
    }, [productEdit])

    const handleInputChange = (e) => {
        const newData = { ...inputData }
        newData[e.target.name] = e.target.value
        setInputData(newData)
    }
    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('file', file);
        dispatch(uploadProductImageFile(bodyFormData))
            .unwrap()
            .then(() => toast.success('Uploaded successfully'))
            .catch((error) => toast.error(error))
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const updatedData = {
            ...inputData,
            price: parseFloat(inputData.price),
            countInStock: parseInt(inputData.countInStock)
        }
        dispatch(updateProduct(updatedData))
            .unwrap()
            .then((res) => toast.success('Updated successfully'))
            .catch((error) => toast.error(error))
    }
    return (
        <LayoutPrimary>
            <Container>
                <Grid
                    container
                    component='form'
                    spacing={4}
                    onSubmit={handleFormSubmit}
                >
                    <Grid item xs={12}>
                        <Typography variant='h5'>
                            Edit Product <br /> {productEdit?._id}
                        </Typography>
                    </Grid>
                    {
                        isLoading ? (<Loader />) :
                            isError ? (<Error message={error} />) :
                                (<>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Name'
                                            size='small'
                                            placeholder='Name'
                                            value={inputData.name}
                                            name='name'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Slug'
                                            size='small'
                                            placeholder='Slug'
                                            name='slug'
                                            value={inputData.slug}
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Category'
                                            size='small'
                                            placeholder='Category'
                                            value={inputData.category}
                                            name='category'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Brand'
                                            size='small'
                                            placeholder='Brand'
                                            value={inputData.brand}
                                            name='brand'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Price'
                                            size='small'
                                            placeholder='Price'
                                            value={inputData.price}
                                            name='price'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Count In Stock'
                                            size='small'
                                            placeholder='Count In Stock'
                                            value={inputData.countInStock}
                                            name='countInStock'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField
                                            fullWidth
                                            label='Image File'
                                            size='small'
                                            placeholder='Image File'
                                            value={inputData.image}
                                            name='image'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        {
                                            isUploading
                                                ? <CircularProgress />
                                                : <TextField
                                                    fullWidth
                                                    size='small'
                                                    type='file'
                                                    onChange={handleFileChange}
                                                />
                                        }
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={6}
                                            label='Description'
                                            size='small'
                                            placeholder='Description'
                                            value={inputData.description}
                                            name='description'
                                            onChange={handleInputChange}
                                        />
                                    </Grid>
                                    <Grid item>
                                        <ButtonPrimary type='submit' variant='contained' disabled={isLoading}>
                                            Update
                                        </ButtonPrimary>
                                    </Grid>
                                </>)}
                </Grid>
            </Container>
        </LayoutPrimary>
    )
}

export default ProductEditScreen