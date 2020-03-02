import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Cookies from 'universal-cookie';
import {connect, useDispatch } from "react-redux"


import {setToken} from "./redux/user/user"


const Navbar = React.lazy(() => import("./components/core/Navbar"))
const Login = React.lazy(() => import("./components/core/Login"))
const Register = React.lazy(() => import("./components/core/Register"))
const PageNotFound = React.lazy(() => import("./components/core/PageNotFound"))

const Home = React.lazy(() => import("./components/features/home/Home"))
const UserPage = React.lazy(() => import("./components/features/pages/UserPage"))
const UserSettingsPage = React.lazy(() => import("./components/features/pages/UserSettingsPage"))

const ClientPage = React.lazy(() => import('./components/features/pages/ClientPage'))
const CustomersPage = React.lazy(() => import('./components/features/pages/CustomersPage'))
const CalendarPage = React.lazy(() => import('./components/features/pages/CalendarPage'))
const MessagesPage = React.lazy(() => import("./components/features/pages/MessagesPage"))
const AddMeetingPage = React.lazy(() => import("./components/features/pages/AddMeetingPage"))

const Codes = React.lazy(() => import('./components/core/Codes'))
const Test = React.lazy(() => import('./components/core/Test'))


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

const AuthContext = React.createContext({
  auth: false,
  setAuth: () => { }
})


function App(props) {

  //TODO: Cambiare url con i link in maniera corretta
  //TODO: Eseguire i ridirect di /user in /home (ove necessario obv)
  const cookies = new Cookies();
  const token = cookies.get('dateReminder-AuthToken')

  const dispatch = useDispatch()

  const [auth, setAuth] = useState(!!token)

  const initialValue = {
    auth: auth,
    setAuth: (e) => { setAuth(e) }
  }
  console.log("Props:"+ JSON.stringify(props))

  useEffect(()=>{
    dispatch(setToken("ciao")) //usando questa hook funziona correttamente
  },[])

  return (
    <div style={{ height: "100%" }}>
      <h1>{props.state.user.appTitle}</h1>
        <AuthContext.Provider value={initialValue}>
          <ThemeProvider theme={theme}>
            <Suspense fallback={<div></div>}>

              <Router>
                {
                  (typeof token !== "undefined") ?
                    // Se ho il token d'accesso sto nell'applicazione 
                    <Navbar >
                      <Suspense fallback={<div></div>}>
                        <Switch>

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
                      </Suspense>

                    </Navbar>

                    :

                    <Switch>
                      <Route path="/" exact component={Home} />
                      <Route path="/login" component={Login} />
                      <Route path="/singup" component={Register} />
                    </ Switch >
                }


              </Router>
            </Suspense>
          </ThemeProvider>
        </AuthContext.Provider>
    </div>
  );
}

//così esegue l'azione ma non vede il parametro
const mapDispatchToProps2 = dispatch => {
  return {
    setToken: dispatch(setToken())
  }
}

//così non esegue l'azione
const mapDispatchToProps1 = dispatch => {
  return {
    // dispatching plain actions
    setToken: (token) => dispatch(setToken(token))
  }
}

function mapStoreToProps (store){
  return{
    state: store
  }
}

export default connect(mapStoreToProps)(App);
export { AuthContext }
