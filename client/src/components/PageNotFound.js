import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MusicOffIcon from '@material-ui/icons/MusicOff';
import bg404 from "../img/404_bg_image.png";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#102027",
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent:"center", 
    padding:10
  },
  row: {
    display: "flex",
    alignItems:"center",
    justifyContent:"center", 
    padding:10
  },
  musicIcon: {
    color: 'white'  
  },
  text:{
    margin:10,
    color:"#f5f5f5"
  },
  image:{
    position: 'relative',
    left: 0,
    bottom: 0,
    width: '100%',
    backgroundColor: "#102027",

  }
});

function PageNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <MusicOffIcon className={classes.musicIcon} fontSize="large"/>
        <h1 className={classes.text}>404 - Page not found</h1>

      </div>
        <img src={bg404} className={classes.image} alt =""/>
    </div>
  );
}

export default PageNotFound;
