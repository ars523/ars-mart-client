import { Container, Grid, TextField } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserProfile } from '../features/auth/authSlice'
import { ButtonPrimary } from '../shared/button'
import { HeadingPrimary } from '../shared/typography'

function Profile() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const onSubmit = (e)=>{
    e.preventDefault()
    dispatch(updateUserProfile({name, email, password}))
  }
  return (
    <Container maxWidth='sm'>
      <Grid container component='form' rowSpacing={3} onSubmit={onSubmit}>
        <Grid item xs={12}>
          <HeadingPrimary variant='h3'>User Profile</HeadingPrimary>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            placeholder='Name'
            label='Name'
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type='email'
            placeholder='Email'
            label='Email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type='password'
            placeholder='Password'
            label='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type='password'
            placeholder='Confirm Password'
            label='Confirm Password'
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <ButtonPrimary
            variant='contained'
            type='submit'
            disabled={password !== confirmPassword || password.length === 0}
          >
            Update
          </ButtonPrimary>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Profile