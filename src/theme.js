import {createTheme } from '@mui/material/styles';
const primary ={
    main: "#ea580c",
    // main: "#f57224 ",
}
const theme = createTheme({
  palette: {
    primary: {
      main: primary.main,
    },
  },
  typography:{
    subtitle1:{
      fontWeight: 500
    },
    subtitle:{
      fontSize: '1.25rem',
      fontWeight: 400
    }
  }
});

export default theme