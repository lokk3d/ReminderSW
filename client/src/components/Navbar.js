import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import PersonIcon from '@material-ui/icons/Person';
import axios from "axios"
import Drawer from '@material-ui/core/Drawer';
import UserCard from "./drawer/UserCard"
import createHistory from 'history/createBrowserHistory';
import Footer from "./Footer"

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      textAlign: "left"
    },
    link:{
        color: "white",
        textDecoration: "none"
    },
    navbar:{
        backgroundColor: theme.palette.primary.dark,
        width:"100%"
    },
    row: {
      display: "flex",
      alignItems:"center",
      justifyContent:"center"
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },

  }));


  
function Navbar() {
    const classes = useStyles();

    const [drawer, setDrawer] = useState();

    const [loggedIn, setLogIn] = useState(false);
    const [username, setUsername] = useState("Profilo")

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    console.log(token)
    useEffect(()=>{
      if(token !== undefined){
        setLogIn(true)

        axios.get("/api/user/getName",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            setUsername(response.data.firstName + " " + response.data.lastName)
        })
        .catch((err) => {

        })

      }
    });

    //Your initialization

  // Create history object.
    const history = createHistory();

    // Listen to history changes.
    // You can unlisten by calling the constant (`unlisten()`).
    const unlisten = history.listen((location, action) => {
      setDrawer(false);
    });



  return (
    <AppBar position="static" className={classes.navbar}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
          onClick={()=> setDrawer(true)}>
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>
            Redeo (beta)
          </Link>
        </Typography>


        {loggedIn?
        <Link to="/home" className={classes.link}>
          <div className={classes.row}>
            <PersonIcon htmlColor="#fff" />
            <div style={{marginLeft: 5}}>{username}</div>
          </div>
        </Link>
        :<Link to="/login" className={classes.link}>Accedi</Link>}


        </Toolbar>

        <Drawer 
          open={drawer} 
          onClose={() => setDrawer(false)}
          keepMounted={true}
          >
          <div style={{margin:20, minWidth:270}}>
            <UserCard />
            <Footer />

          </div>
        </Drawer>
    </AppBar>
  );
}

export default Navbar;
