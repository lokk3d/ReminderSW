import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Typography, List, ListItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import PersonIcon from '@material-ui/icons/Person';
import axios from "axios"
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import UserCard from "./drawer/UserCard"
import createHistory from 'history/createBrowserHistory';
import Footer from "./Footer"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import { useHistory } from 'react-router-dom';

import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import DescriptionIcon from '@material-ui/icons/Description';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
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
    col: {
      display: "flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"col"
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
    let history = useHistory();

    const [drawer, setDrawer] = useState();

    const [loggedIn, setLogIn] = useState(false);
    const [username, setUsername] = useState("Profilo")

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    console.log(token)
    useEffect(()=>{
      if(token !== undefined){
        setLogIn(true)

        axios.get("/api/user/",
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
        null
        :<Link to="/login" className={classes.link}>Accedi</Link>}


        </Toolbar>

        <Drawer 
          open={drawer} 
          onClose={() => setDrawer(false)}
          keepMounted={true}
          >
          <div style={{margin:20, minWidth:270}}>
            <UserCard />

              <List>
              <ListItem button onClick={()=>{setDrawer(false); history.push("/home");}}>
                <ListItemIcon>
                  <HomeIcon htmlColor="#7764E4" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/home");}}>
                <ListItemIcon>
                  <MailIcon htmlColor="#F53C56" />
                </ListItemIcon>
                <ListItemText primary="Inbox" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/home");}}>
                <ListItemIcon>
                  <DescriptionIcon htmlColor="#11CDEF" />
                </ListItemIcon>
                <ListItemText primary="Invoices" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/messages");}}>
                <ListItemIcon>
                  <ChatBubbleOutlineIcon htmlColor="#FEB969" />
                </ListItemIcon>
                <ListItemText primary="Messages" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/calendar");}}>
                <ListItemIcon>
                  <EventIcon htmlColor="#FB6340" />
                </ListItemIcon>
                <ListItemText primary="Calendar" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/home");}}>
                <ListItemIcon>
                  <PersonIcon htmlColor="#7764E4" />
                </ListItemIcon>
                <ListItemText primary="Customers" />
              </ListItem>

              <ListItem button onClick={()=>{setDrawer(false); history.push("/user");}}>
                <ListItemIcon>
                  <SettingsIcon htmlColor="#F53C56" />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              </List>

              <div 
              style={{
                position:"absolute",
                bottom:50,
                width:"80%",
                display:"flex", 
                justifyContent:"space-between"}}>
                <div className={classes.row}>
                <Button  className={classes.margin}>
                  <HelpOutlineIcon className={classes.extendedIcon} />
                  Guida e FAQ
                </Button>
                 
                </div>
                <Fab color="primary" aria-label="add">
                  <AddIcon />
                </Fab>
              </div>
            <Footer />
          </div>
        </Drawer>
    </AppBar>
  );
}

export default Navbar;
