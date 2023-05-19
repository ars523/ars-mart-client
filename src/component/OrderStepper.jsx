import React from 'react'
import Stepper from '@mui/material/Stepper';
import { Box, Step, StepLabel, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

function OrderStepper({ activeStep }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const theme = useTheme()
  return (
    <Box sx={{border:`1px solid ${theme.palette.grey}`, borderRadius:'100px', p:'0.5rem 0.25rem'}}>
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
    </Box>
  )
}

export default OrderStepper