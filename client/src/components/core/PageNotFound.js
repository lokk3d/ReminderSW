import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  }
});

function PageNotFound() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.row}>
        <h1>404 Page not fount</h1>
      </div>
    </div>
  );
}

export default PageNotFound;
