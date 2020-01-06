import React, { useState, useEffect } from "react";
import ClientPersonalData from "./ClientPersonalData"
import ClientContacts from "./ClientContacts"
import ClientMeetings from "./ClientMeetings"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClientReminders from "./ClientReminders";
import MyMeetings from "./MyMeetings";
import WrapperBox from "../WrapperBox"
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

function ClientHome(props) {
    const id = props.match.params.id

    return (
        <Grid container spacing={3}>
        
            <Grid item xs={12} sm={4}>
                <ClientPersonalData id={id} />
                <ClientContacts id={id} />
            </Grid>
            <Grid item xs={12} sm={4}>
                <WrapperBox header="Meetings" minWidth={400}>
                    <MyMeetings id={id}/>
                </WrapperBox>
            </Grid>
            <Grid item xs={12} sm={4}>
            </Grid>
          
           
        </Grid>
       
    )
}

export default ClientHome