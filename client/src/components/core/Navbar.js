import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import Cookies from 'universal-cookie';
import PersonIcon from '@material-ui/icons/Person';
import axios from "axios"
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import UserCard from "./UserCard"
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import HomeIcon from '@material-ui/icons/Home';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import EventIcon from '@material-ui/icons/Event';
import AddIcon from '@material-ui/icons/Add';
import SettingsIcon from '@material-ui/icons/Settings';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { useHistory } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import CreateIcon from '@material-ui/icons/Create';
const drawerWidth = 240;

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles(theme => ({
  margin: {
    marginRight: 30,
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    height: "100%"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  link: {
    color: "white",
    textDecoration: "none"
  },
  navbar: {
    backgroundColor: theme.palette.primary.dark,
    width: "100%"
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  col: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "col"
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  }
}));



function Navbar(props) {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();

  const [drawer, setDrawer] = useState();
  const [open, setOpen] = React.useState(false);

  const [loggedIn, setLogIn] = useState(false);
  const [username, setUsername] = useState("Profilo")

  const [background, setBackground] = useState({})

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const drawerData = [
    {
      title: "Home",
      icon: <HomeIcon />,
      onClick: () => renderPage("/home")
    },
    {
      title: "Calendar",
      icon: <EventIcon />,
      onClick: () => renderPage("/calendar")
    },
    {
      title: "Customers",
      icon: <PersonIcon />,
      onClick: () => renderPage("/clients")
    },
    {
      title: "Messages",
      icon: <ChatBubbleOutlineIcon />,
      onClick: () => renderPage("/messages")
    },
    {
      title: "Settings",
      icon: <SettingsIcon />,
      onClick: () => renderPage("/settings")
    },
  ]

  const renderPage = (pageUrl) => {
    setDrawer(false)
    history.push(pageUrl)
  }

  const cookies = new Cookies();
  const token = cookies.get('dateReminder-AuthToken')
  console.log(token)
  useEffect(() => {

    if (token !== undefined) {

      setLogIn(true)
      axios.get("/api/user/",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
          setUsername(response.data.firstName + " " + response.data.lastName)
        })
        .catch((err) => {

        })

        axios.get("/api/background/",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {

          const data = response.data
          if(data.type === "color"){
            setBackground({backgroundColor:data.hexColor})
          }
          if(data.type === "image"){
            setBackground({
              backgroundImage      : "url("+data.url+")",
              backgroundAttachment : "fixed",
              backgroundPosition   : "center center",    
              backgroundSize       : "cover",
            })
          }

        })
        .catch((err) => {

        })



    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} style={{ height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Redeo (beta)
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <UserCard />
        <List>
        
          {
            drawerData.map(item=>{
              return(
                <ListItem button onClick={item.onClick}>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
              )
            })
          }
         

        </List>
        <Divider />
        <List>
          
            <ListItem button
            aria-controls="customized-menu"
            aria-haspopup="true"
            variant="contained"
            color="primary"
            onClick={handleClick}>
              <ListItemIcon><AddIcon /></ListItemIcon>
              <ListItemText primary={"Add"} />
            </ListItem>

        </List>

        <div
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            display: "flex",
            justifyContent: "space-between"
          }}>

          <List style={{ width: "100%" }}>

            <ListItem button onClick={() => { setDrawer(false); history.push("/user"); }}>
              <ListItemIcon>
                <HelpOutlineIcon htmlColor="#666" />
              </ListItemIcon>
              <ListItemText primary="Guida e Faq" />
            </ListItem>
          </List>


        </div>
      </Drawer>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem 
          onClick={()=>{alert("Porca troia aspe che sta roba non è ancora pronta"); handleClose();}}>
          <ListItemIcon >
            <CreateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Nuova prenotazione" />
        </StyledMenuItem>
        
        <StyledMenuItem
          onClick={()=>{alert("Porca troia aspe che sta roba non è ancora pronta"); handleClose();}}>
          <ListItemIcon>
            <PersonAddIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Nuovo contatto" />
        </StyledMenuItem>
      </StyledMenu>


      <main className={classes.content} style={background}>
        <div className={classes.toolbar} />
        {props.children}
      </main>


    </div>


  );
}

export default Navbar;
