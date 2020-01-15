import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import WrapperBox from "../WrapperBox"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Paper, FormControlLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddMeeting from "../meeting/AddMeeting"
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        margin: 0
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
  

function ClientReminders(props) {
    const classes = useStyles();
    const id = props.id

    const [reminderList, setReminderList] = useState()
    const [meetingList, setMeetingList] = useState()

   
    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [render, setRender] = useState(0);

    useEffect(() => {

        axios.post('/api/meeting/getMeetingsByClient',
            { client: id },
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                console.log(res.data)
                setReminderList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [render])

    useEffect(()=>{
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        if(typeof reminderList !== "undefined"){
            setMeetingList(reminderList.map((item)=>{
                if(item.reminder){
                    return(
                    <ListItem button>
                        <ListItemText primary={item.reminderText} 
                        secondary={item.reminderDate} />
                    </ListItem>
                    )
                }
            }))
        }
    }, [reminderList])


    return (
        <WrapperBox header="I miei Reminders"  >
            <List>
                {meetingList}
            </List>

        </WrapperBox>
    )
}

export default ClientReminders