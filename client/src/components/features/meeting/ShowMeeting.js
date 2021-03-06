import React, { useState, useEffect } from "react";
import CheckBoxReminder from "./CheckBoxReminder";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { useHistory } from 'react-router-dom';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import ClearIcon from '@material-ui/icons/Clear';
import axios from "axios";
import Cookies from 'universal-cookie';

function formatDate(date) {
    var d = new Date(date),
        month = '' + d.getMonth(),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (day.length < 2) 
        day = '0' + day;

    var monthNames = [
        "Gennaio", "Febbraio", "Marzo",
        "Aprile", "Maggio", "Giugno", "Luglio",
        "Agosto", "Settembre", "Ottobre",
        "Novembre", "Dicembre"
        ];

    return [day, monthNames[month], year].join(' ');
}


function formatTime(date) {
    var d = new Date(date),
        hour = d.getHours(),
        minute = d.getMinutes()

    return [hour, minute].join(':');
}


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    col: {
        display: "flex",
        flexDirection: "column",
        margin: 0
    },
    row: {
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
        margin: 0,
        justifyContent: "space-between"
    }
}));

function ShowMeeting(props) {
    const classes = useStyles();
    let history = useHistory();

    const id = props.item._id;
    const item = props.item;
    const date = formatDate(props.item.date.toString())
    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')


    const deleteMeeting = (id) => {
        axios.delete('/api/meeting/delete', {
            data: {id: id},
            headers: { authorization: "Bearer " + token }
        })
          .then((res) => {
              if(typeof props.onDeleteItem !== "undefined")
                props.onDeleteItem(item)
          })
          .catch((err) => {
            console.log(err)
          })
    }

    //console.log(state)
    return (
        <ExpansionPanel style={{width:'100%'}}>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <div className={classes.row} style={{width:'100%'}}>
                    <div className={classes.col}>
                        <h4 style={{margin:0}}>{item.description}</h4>
                        <p style={{margin:0}}>{date}</p>
                    </div>
                    <ClearIcon fontSize="small"  onClick={()=>{
                    deleteMeeting(id)
                }}/>
                </div>
               
            </ExpansionPanelSummary>
            <ExpansionPanelDetails style={{paddingBottom:10}}>
                <List style={{padding:0}}
                >
                    {/* {messageList} */}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

}

export default ShowMeeting