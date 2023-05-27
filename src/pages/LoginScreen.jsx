import { Container, Grid, Paper, Stack, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { signin } from "../features/auth/authSlice"
import { ButtonPrimary } from "../shared/button"
import { HeadingPrimary } from "../shared/typography"
import { useFormik } from "formik"
import * as yup from "yup"
import { LinkPrimary } from "../shared/link"
import { toast } from 'react-toastify';
import Loader from "../component/Loader"
import { useEffect } from "react"

const LoginScreen = () => {
    const { isLoading, user } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const hitFrom = location?.state?.from
    const go = hitFrom ? hitFrom : '/'

    useEffect(() => {
        if (user) {
            navigate(`${go}`)
        }
    }, [user, navigate, go])

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Required"),
            password: yup.string().min(6, "Invalid password").required("Required"),
        }),

        onSubmit: (values) => {
            const { email, password } = values
            dispatch(signin({ email, password }))
                .unwrap()
                .then(() => {
                    navigate(`${go}`)
                    toast.success('Signed in successfully')
                })
                .catch((error) => toast.error(error))
        }
    })
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik

    if (isLoading) {
        return <Loader />
    }
    return (
        <Container
            sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}
            maxWidth='sm'
            component='form'
            onSubmit={handleSubmit}
        >
            <Paper sx={{p:'2rem'}}>
                <Grid container rowSpacing={3}>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" sx={{mb:'1rem'}}>Existing Users Credentials:</Typography>
                        <Stack direction={{md:'row', sm:'column'}} spacing={'1rem'}>
                            <Paper sx={{padding:'1rem'}} variant="outlined">
                                <Typography align="center">User</Typography>
                                <Typography><span style={{fontWeight:'500'}}>Email:</span> user@example.com</Typography>
                                <Typography><span style={{fontWeight:'500'}}>Password:</span> 123456</Typography>
                            </Paper>
                            <Paper sx={{padding:"1rem"}} variant='outlined'>
                                <Typography align="center">Admin</Typography>
                                <Typography><span style={{fontWeight:'500'}}>Email:</span> admin@example.com</Typography>
                                <Typography><span style={{fontWeight:'500'}}>Password:</span> 123456</Typography>
                            </Paper>
                        </Stack>
                    </Grid>
                    <Grid item xs={12}>
                        <HeadingPrimary variant="h5">
                            Login
                        </HeadingPrimary>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='email'
                            required
                            placeholder="Email"
                            label="Email"
                            name='email'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && errors.email?.length > 0}
                            helperText={touched.email && errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type='password'
                            required
                            placeholder="Password"
                            label="Password"
                            name='password'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={touched.password && errors.password?.length > 0}
                            helperText={touched.email && errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonPrimary
                            variant="contained"
                            type="submit"
                        >
                            Sign in
                        </ButtonPrimary>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">
                            Don't have an account?
                            <LinkPrimary to='/registration' style={{ marginLeft: '1rem' }}>
                                Register
                            </LinkPrimary>
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
};

export default LoginScreen