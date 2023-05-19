import { Grid } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import OrderStepper from '../component/OrderStepper'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { HeadingPrimary } from '../shared/typography';
import { ButtonPrimary } from '../shared/button';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { savePaymentMethod } from '../features/cart/cartSlice';

function PaymentMethodScreen() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { paymentMethod, shippingAddress } = useSelector(state => state.cart)
  const [value, setValue] = React.useState(paymentMethod || '');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  useEffect(() => {
    if (!shippingAddress) {
      navigate('/shipping')
    }
  }, [navigate, shippingAddress])

  const handleClickContinue = () => {
    dispatch(savePaymentMethod(value))
    navigate('/previewOrder')
  }

  return (
    <Container>
      <Grid container direction='column' spacing={'2rem'}>
        <Grid item> {/* <--- Stepper ---> */}
          <OrderStepper activeStep={2} />
        </Grid>
        <Grid item> {/* <--- Payment Method Selection ---> */}
          <Grid container direction='column' spacing={'1rem'}>
            <Grid item>
              <HeadingPrimary variant='h5'>Payment Method</HeadingPrimary>
            </Grid>
            <Grid item>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={handleChange}
                >
                  <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
                  <FormControlLabel value="stripe" control={<Radio />} label="Stripe" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item>
              <ButtonPrimary
                variant='contained'
                onClick={handleClickContinue}
              >
                Continue
              </ButtonPrimary>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default PaymentMethodScreen