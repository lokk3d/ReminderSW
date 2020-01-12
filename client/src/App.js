import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar"

import Home from "./components/home/Home"
import User from "./components/user/User"
import Login from "./components/Login"
import Footer from "./components/Footer"
import Register from "./components/Register"
import PageNotFound from "./components/PageNotFound"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import ClientHome from './components/client/ClientHome';
import UserHome from './components/user/UserHome';
import Codes from './components/Codes';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d5496',
      darker: "#07396c"
    },
    secondary: {
      main: '#611320',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {

  //TODO: Cambiare url con i link in maniera corretta
  //TODO: Eseguire i ridirect di /user in /home (ove necessario obv)
  
  return (
    <div >
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Switch>

            <Route path="/" exact component={Home} />
            <Route path="/user" component={User} />
            <Route path="/login" component={Login} />
            <Route path="/singup" component={Register} />
            <Route path="/client/:id" component={ClientHome} />
            <Route path="/home" component={UserHome} />
            <Route path="/codes" component={Codes} />

            <Route component={PageNotFound} />
          </Switch>

          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
