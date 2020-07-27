import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import "./ReactotronConfig";
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./redux/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import {SnackbarProvider} from "notistack";

ReactDOM.render(
  <React.StrictMode>
      <ReduxProvider store={store}>
          <Router>
              <SnackbarProvider maxSnack={2}>
                  <Route component={App} />
              </SnackbarProvider>
          </Router>
      </ReduxProvider>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
