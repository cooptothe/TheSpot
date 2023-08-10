import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#f0f465',
      dark: '#f433ab',
      contrastText: '#0b0113',
    },
    secondary: {
      main: '#f433ab',
      dark: '#f0f465',
      contrastText: '#0b0113',
    },
  },
});

const AddFriend = () => {

  // post friendship to db 

  return (
    <ThemeProvider theme={theme}>
      <div className='friend-request'>
        <Box className='friend-box'>
          <Fab
            size='small'
            color='primary'
            aria-label='add'
            className='friend-add-btn'
          >
            {/** This icon should be removed after request sent */}
            <AddIcon />
          </Fab>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default AddFriend;
