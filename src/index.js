import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../src/components/app/store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const root = ReactDOM.createRoot(document.getElementById('root'));


const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: '"Roboto", sans-serif',
      textTransform: 'none',
    },
  },
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#FFFFFF',
    },
  },
});
root.render(
  <ThemeProvider theme={theme}>

    <React.StrictMode>
      <SnackbarProvider maxSnack={3}>


        <Provider store={store}>
          <Router>
            <App />
          </Router>
        </Provider>
      </SnackbarProvider>
    </React.StrictMode>
  </ThemeProvider>,

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
