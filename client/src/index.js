import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';


import App from './App';

import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";


const theme = createMuiTheme({
    palette: {
    type: "dark",
  },
  
});



ReactDOM.render(
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
    </Provider>
    </ThemeProvider>,
    document.querySelector('#root')
);