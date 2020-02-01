import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Navbar from "./components/core/Navbar"
import Login from "./components/core/Login"
import Register from "./components/core/Register"
import PageNotFound from "./components/core/PageNotFound"

import Home from "./components/features/home/Home"
import UserPage from "./components/features/pages/UserPage"
import UserSettingsPage from "./components/features/pages/UserSettingsPage"

import ClientPage from './components/features/pages/ClientPage';
import CustomersPage from './components/features/pages/CustomersPage';
import CalendarPage from './components/features/pages/CalendarPage';
import MessagesPage from "./components/features/pages/MessagesPage"
import AddMeetingPage from "./components/features/pages/AddMeetingPage"

import Codes from './components/core/Codes';
import Test from './components/core/Test';



const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0e2f5c',
      darker: "#011b3d"
    },
    secondary: {
      main: '#9c0b0c',
      darker: "#9c0b0c"
    },
    white: {
      main: '#ffffff'
    },
    darkGray: {
      main: '#262626'
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  oldPalette: {
    primary: {
      main: '#2979ff',
    },
    secondary: {
      main: '#00a369',
      darker: "#1d5bc2"
    },
    white: {
      main: '#ffffff'
    },
    darkGray: {
      main: '#262626'

    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {

  //TODO: Cambiare url con i link in maniera corretta
  //TODO: Eseguire i ridirect di /user in /home (ove necessario obv)

  return (
    <div style={{height:"100%"}}>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar >
            <Switch>

              <Route path="/" exact component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/singup" component={Register} />

              <Route path="/home" component={UserPage} />
              <Route path="/clients" component={CustomersPage} />
              <Route path="/client/:id" component={ClientPage} />
              <Route path="/settings" component={UserSettingsPage} />

              <Route path="/addMeeting/:id" component={AddMeetingPage} />
              <Route path="/addMeeting" component={AddMeetingPage} />
              <Route path="/calendar" component={CalendarPage} />
              <Route path="/messages" component={MessagesPage} />


              <Route path="/test" component={Test} />

              <Route path="/codes" component={Codes} />

              <Route component={PageNotFound} />
            </Switch>
          </Navbar>


        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
