import { Grid, TextField } from '@mui/material'
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
function ProductEditScreen() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const {productEdit, isLoading, isUploading, isError, error} = useSelector((state) => state.product)

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
        .then(()=>toast.success('Uploaded successfully'))
        .catch((error)=>toast.error(error))
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
            .catch((error)=>toast.error(error))
    }
    if(isLoading){
        return <Loader/>
    }
    if(isError){
        return <Error message={error}/>
    }
    return (
        <Container>
            <Grid
                container
                direction='column'
                component='form'
                rowSpacing={4}
                onSubmit={handleFormSubmit}
            >
                <Grid item>
                    <HeadingPrimary variant='h2' sx={{ fontWeight: 400 }}>
                        Edit Product <br /> {productEdit?._id}
                    </HeadingPrimary>
                </Grid>
                <Grid item>
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
                <Grid item>
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
                <Grid item>
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
                <Grid item>
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
                <Grid item>
                    {
                        isUploading
                        ? <CircularProgress />
                        :<TextField
                        fullWidth
                        size='small'
                        type='file'
                        onChange={handleFileChange}
                    />
                    }
                </Grid>
                <Grid item>
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
                <Grid item>
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
                <Grid item>
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
                <Grid item>
                    <TextField
                        fullWidth
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
            </Grid>
        </Container>
    )
}

export default ProductEditScreen