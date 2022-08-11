import { Button } from "@mui/material";
import { styled } from "@mui/system";

export const ButtonPrimary = styled(Button)(({ theme }) => ({
    color: '#333',
    fontWeight: '500',
    border: '0.5px solid #333',
    textTransform: 'none',
    '&:hover':{
        color: 'black'
    }
}))