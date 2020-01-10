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
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (day.length < 2) 
        day = '0' + day;

    var monthNames = [
        "January", "February", "March",
        "April", "May", "June", "July",
        "August", "September", "October",
        "November", "December"
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
    const date = formatDate(props.item.meetingDate.toString())
    const reminders = props.item.reminder;
    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const [reminderList, setReminderList] = useState();


    const deleteMeeting = (id) => {
        axios.post('/api/meeting/delete',
        {id: id, client: props.clientId},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            history.push("/client/"+props.clientId);
          })
          .catch((err) => {
            console.log(err)
          })
    }

    useEffect(()=>{
        setReminderList(reminders.map(item=>{
            const contacts = item.contacts

            let myitem = "false"
            if(typeof item.executed !== "undefined"){
                myitem = item.executed.toString() 
            }
            return(
                <div>
                    <ListItem style={{margin:0, padding:0}}>
                        <div className={classes.col}>
                            <div >{"Invia il: " + formatDate(item.date) + " alle " + formatTime(item.date)}</div>
                            <div style={{padding:10}}>{item.text}</div>
                            <div>{"Inviato:"}<b>{myitem}</b></div>
                            <div style={{paddingTop:10}}>
                                { contacts.whatsapp? <WhatsAppIcon /> : <div/> }
                                { contacts.email? <EmailIcon /> : <div/> }
                                { contacts.sms? <SmsIcon /> : <div/> }
                                { contacts.Instagram? <InstagramIcon /> : <div/> }
                                { contacts.facebook? <FacebookIcon /> : <div/> }

                            </div>
                        </div>          
                    </ListItem>
                    <Divider />
                </div>     
            )
        }))
    },[])
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
                    {reminderList}
                </List>
            </ExpansionPanelDetails>
        </ExpansionPanel>
    )

}

export default ShowMeeting