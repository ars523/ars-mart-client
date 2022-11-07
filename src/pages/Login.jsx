import { Container, Grid, TextField} from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useLocation, useNavigate, useParams } from "react-router-dom"
import { reset, signin } from "../features/auth/authSlice"
import { ButtonPrimary } from "../shared/button"
import { HeadingPrimary } from "../shared/typography"
import { useFormik } from "formik"
import * as yup from "yup"
const Login = () => {
    const { user, isSuccess } = useSelector(state => state.auth)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Invalid email address").required("Required"),
            password: yup.string().min(6, "Password is too short").required("Required"),
        }),
        onSubmit: (values) => {
            const {email, password} = values
            dispatch(signin({email, password}))
        }
    })
    const { values, handleChange, handleSubmit, errors, handleBlur, touched } = formik
    const hitFrom = location?.state?.from
    const go = hitFrom ? hitFrom : '/'

    useEffect(() => {
        if (isSuccess || user) {
            navigate(`${go}`)
            dispatch(reset)
        }
    }, [user, isSuccess, navigate, go, dispatch])
    return (
        <Container maxWidth='sm' component='form' onSubmit={handleSubmit}>
            <Grid container rowSpacing={3}>
                <Grid item xs={12}>
                    <HeadingPrimary variant="h4">
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
                        helperText={errors.email}
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
                        helperText={errors.password}
                    />
                </Grid>
                <ButtonPrimary
                    variant="contained"
                    type="submit"
                >
                    Sign in
                </ButtonPrimary>
            </Grid>
        </Container>
    );
};

export default Login