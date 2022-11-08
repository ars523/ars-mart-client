import { Container, Grid, TextField, Typography } from "@mui/material"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useLocation, useNavigate} from "react-router-dom"
import { reset, signin } from "../features/auth/authSlice"
import { ButtonPrimary } from "../shared/button"
import { HeadingPrimary } from "../shared/typography"
import { useFormik } from "formik"
import * as yup from "yup"
import { LinkPrimary } from "../shared/link"
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
            password: yup.string().min(6, "Invalid password").required("Required"),
        }),
        onSubmit: (values) => {
            const { email, password } = values
            dispatch(signin({ email, password }))
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
                        helperText={touched.email&&errors.email}
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
                        helperText={touched.email&&errors.password}
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
        </Container>
    );
};

export default Login