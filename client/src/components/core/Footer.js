import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#eee",
    position: 'absolute',
    left: 0,
    bottom: 0,
    width:"100%"
  }
}));


function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div style={{ margin: 5 }}>Redeo v0.0.3 -  Copyright 2019 <a href="https://alfonsograziano.it" target="_blank" rel="noopener noreferrer" >AG</a></div>
    </footer>
  );
}

export default Footer;
