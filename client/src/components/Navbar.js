import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import PersonIcon from '@material-ui/icons/Person';
import axios from "axios"

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
        backgroundColor: "#061b3a"
    },
    row: {
      display: "flex",
      alignItems:"center",
      justifyContent:"center"
    },

  }));

function Navbar() {
    const classes = useStyles();

    const [loggedIn, setLogIn] = useState(false);
    const [username, setUsername] = useState("Profilo")

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
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



  return (
    <AppBar position="static" className={classes.navbar}>
        <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link to="/" className={classes.link}>
            Date Reminder
          </Link>
        </Typography>


        {loggedIn?
        <Link to="/user" className={classes.link}>
          <div className={classes.row}>
            <PersonIcon color="#fff" />
            <div style={{marginLeft: 5}}>{username}</div>
          </div>
        </Link>
        :<Link to="/login" className={classes.link}>Accedi</Link>}


        </Toolbar>
    </AppBar>
  );
}

export default Navbar;
