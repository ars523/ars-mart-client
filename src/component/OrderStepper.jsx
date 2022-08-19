import React from 'react'
import Stepper from '@mui/material/Stepper';
import { Step, StepLabel } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

function OrderStepper({ activeStep }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      <Stepper activeStep={activeStep} orientation = {matches? 'vertical' : 'horizontal'}>
        <Step>
          <StepLabel>Sign-In</StepLabel>
        </Step>
        <Step>
          <StepLabel>Shipping</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
        <Step>
          <StepLabel>Place Order</StepLabel>
        </Step>
      </Stepper>
    </>
  )
}

export default OrderStepper