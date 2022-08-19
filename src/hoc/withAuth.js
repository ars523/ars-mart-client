import { Container, Grid, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom"
import { signin } from "../features/auth/authSlice"
import { ButtonPrimary } from "../shared/button"
import { LinkPrimary } from "../shared/link"
import { HeadingPrimary } from "../shared/typography"

const withAuth = (Wrapper, entity = 'login') => {

    const NewComponent = () => {
        const {user, isSuccess} = useSelector(state=>state.auth)
        const location = useLocation()
        const navigate = useNavigate()
        const hitFrom = location?.state?.from
        const go = hitFrom ? hitFrom : '/'

        useEffect(()=>{
            if(isSuccess || user){
                navigate(`${go}`)
            }
        },[user, isSuccess, navigate, go])
        const dispatch = useDispatch()
        const [userData, setUserData] = useState({
            email: '',
            password: '',
        })
        const {email, password} = userData

        const handleInputChange = (e) => {
            const newData = {...userData}
            newData[e.target.name] = e.target.value
            setUserData(newData)
        }
        const handleFormSubmit = (event)=>{
            event.preventDefault()
            if(entity === 'login'){
                dispatch(signin({email, password}))
            }
        }
        return (
            <Wrapper>
                <Container maxWidth='sm' component='form' onSubmit = {handleFormSubmit}>
                    <Grid container rowSpacing={3}>
                        <Grid item xs={12}>
                            <HeadingPrimary variant="h4">
                                {entity === 'login' ? 'Sign In' : 'Sign Up'}
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
                                onChange={handleInputChange}
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
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            {
                                entity === 'login'
                                    ? (
                                        <ButtonPrimary
                                            variant="contained"
                                            type="submit"

                                        >
                                            Sign in
                                        </ButtonPrimary>
                                    ) : (
                                        <ButtonPrimary
                                            variant="contained"
                                            type="submit"
                                        >
                                            Sign up
                                        </ButtonPrimary>
                                    )
                            }

                        </Grid>
                        <Grid item xs={12}>
                            {
                                entity === 'login'
                                    ? (
                                        <Box>
                                            <Typography variant="subtitle1">New customer?
                                                <LinkPrimary to='/registration' style={{ marginLeft: '1rem' }}>
                                                    Create your account
                                                </LinkPrimary>
                                            </Typography>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Typography variant="subtitle1">
                                                Have an account?
                                                <LinkPrimary to='/login' style={{ marginLeft: '1rem' }}>
                                                    Sign in
                                                </LinkPrimary>
                                            </Typography>
                                        </Box>
                                    )
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Wrapper>
        )
    }

    return NewComponent
}

export default withAuth