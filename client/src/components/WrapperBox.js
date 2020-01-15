import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

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

    text:{
        color:"#fff", 
        marginLeft:20
    },

    box:{
        height:40, 
        backgroundColor:theme.palette.primary.darker, 
        display:"flex", 
        alignItems:"center"}
  }));


function WrapperBox(props) {
    const classes = useStyles();

    return (
        <div className={classes.col} style={{ margin: 20 }}>
            <Paper style={{width:"100%"}}>
                <div className={classes.box}>
                    <h3 className={classes.text}>{props.header}</h3>
                </div>

                {props.children}

                </Paper>
        </div>
    );
}

export default WrapperBox;
