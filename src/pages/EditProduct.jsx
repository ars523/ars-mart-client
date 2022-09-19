import { Grid, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductEdit, reset, resetProductEdit, updateProduct } from '../features/products/productSlice'
import { ButtonPrimary } from '../shared/button'
import { HeadingPrimary } from '../shared/typography'

function EditProduct() {
    const navigate = useNavigate()
    const { id } = useParams()
    const dispatch = useDispatch()
    const productEdit = useSelector((state) => state.product.productEdit)

    const [inputData, setInputData] = useState({
        name: '',
        slug:  '',
        price:  0,
        image:  '',
        category:  '',
        brand:  '',
        countInStock:  0,
        description:  '',

    })

    useEffect(() => {
        return () => {
            dispatch(resetProductEdit())
        }
    }, [dispatch])

    useEffect(()=>{
        dispatch(getProductEdit(id))
    }, [dispatch, id])

    useEffect(()=>{
        if(Object.keys(productEdit).length !== 0)
            setInputData(productEdit)
    }, [productEdit])

    const handleInputChange = (e) => {
        const newData = { ...inputData }
        newData[e.target.name] = e.target.value
        setInputData(newData)
    }

    const handleFormSubmit = (e) =>{
        e.preventDefault()
        const updatedData = {
            ...inputData, 
            price: parseFloat(inputData.price), 
            countInStock: parseInt(inputData.countInStock)
        }
        dispatch(updateProduct(updatedData))
        .unwrap()
        .then((res) => navigate(`/admin/productlist`))
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
                    <ButtonPrimary type='submit' variant='contained'>
                        Update
                    </ButtonPrimary>
                </Grid>
            </Grid>
        </Container>
    )
}

export default EditProduct