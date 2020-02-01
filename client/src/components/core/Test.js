import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button
} from '@material-ui/core';
import axios from "axios";

import Cookies from 'universal-cookie';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));

function Test(props) {
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')


    useEffect(() => {
        
    }, [])

    return (
        <div>
            {/* Modulo pronto per nuovi test */}
        </div>
    )
}

export default Test