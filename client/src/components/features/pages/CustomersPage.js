import React, { useState, useEffect } from "react";
import SearchableClientList from "../client/SeachableClientsList"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function CustomersPage(props) {
    const classes = useStyles();


    return (
        <div style={{padding:20}}>
            <Grid container spacing={3}>
                <Grid item md={4} >

                    <Paper className={classes.paper}>
                        <SearchableClientList addClient={true}/>
                    </Paper>

                </Grid>

                <Grid item md={8} >

                    <Paper className={classes.paper}>
                        xs=6 sm=3
                    </Paper>

                </Grid>
            </Grid>
        </div>
    )
}

export default CustomersPage