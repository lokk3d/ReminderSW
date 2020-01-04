import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: "#eceff1",
    position: 'fixed',
    left: 0,
    bottom: 0,
    height: 30,
    width: '100%',

  }
}));


function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <div style={{ margin: 5 }}>Date Reminder v0.0.1 -  Copyright 2019 <a href="https://alfonsograziano.it" target="_blank" rel="noopener noreferrer" >AG</a></div>
    </footer>
  );
}

export default Footer;
