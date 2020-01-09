import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { makeStyles,useTheme } from '@material-ui/core/styles';
import axios from "axios";
import Cookies from 'universal-cookie';
import Grid from '@material-ui/core/Grid';

import WrapperBox from '../WrapperBox';
import SessionBox from './SessionBox';
import SearchableClientList from './SeachableClientsList';
import PersonalData from './PersonalData';
import ReminderList from './ReminderList';
import Template from '../template/Template';
import WrappedTemplate from '../template/WrappedTemplate';

require("dotenv").config();

const useStyles = makeStyles(theme => ({
    row: {
      display: "flex",
      alignItems: "center",
      justifyContent :"center",
      flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent :"center",
        flexDirection: "column"
      },
    box: {minWidth:200, 
        padding: 10, 
        boxShadow: "0px 0px 5px #dbdbdb", 
        maxWidth: 400, 
        display: "block",
        marginLeft: "auto", 
        marginRight: "auto",
        marginBottom:15
    },
    spacing:{
        padding: 10,
        margin: 10
    },
    text:{
        marginLeft: 10,
        color: "#6e6e6e"
    },
    sessionButton:{
        width: '80%',
        marginLeft:"auto", 
        marginRight:"auto", 
        display:"block" 
    }
  }));


function User(props) {
    const classes = useStyles();
    const theme = useTheme();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    
    if (token === undefined) {
        window.location = "/";
    }
    
    return (
        <div style={{marginBottom:30}}>
            <Grid container spacing={1}>
                <Grid item sm={4}>
                    <PersonalData minWidth={400}/>
                </Grid>

                <Grid item  sm={4} >
                    <SessionBox minWidth={400} />
                </Grid>

                <Grid item  sm={4}>
                    <WrappedTemplate />
                    <ReminderList  minWidth={400}></ReminderList>
                </Grid>
               
            </Grid>
        </div>
    );
}

export default User;
