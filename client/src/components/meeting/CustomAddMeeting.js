import React, { useState, useEffect } from "react";
import Reminder from "./Reminder"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Cookies from 'universal-cookie';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';


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

function CustomAddMeeting(props) {
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [meeting, setMeeting] = useState({ client: "", meetingDate: new Date(), reminder: [] })
    const [remindersValue, setRemindersValue] = useState([])

    const [reminders, setReminders] = useState([0])
    const [remindersList, setRemindersList] = useState();

    const [menuItems, setMenuItems] = useState()

    const [render, setRender] = useState(0)


    const saveMeeting = (obj) => {
        axios.post('/api/meeting/add',
        {obj},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            console.log(res)
          })
          .catch((err) => {
            console.log(err)
          })
    }

    useEffect(() => {

        if (typeof props.meeting !== "undefined") {
            setMeeting(props.meeting)
        }

        if (typeof props.currentClient !== "undefined") {
            //console.log("Client found: ")
            //console.log(props.currentClient);
            setMenuItems(() => {
                return (
                    <MenuItem value={props.currentClient.id}>
                        {props.currentClient.fiscalCode}
                    </MenuItem>
                )
            })
        }
        if (typeof props.clientList !== "undefined") {

            let items = props.clientList.map((item) => {
                return (
                    <MenuItem value={item.id}>
                        {item.fiscalCode}
                    </MenuItem>
                )
            })
            setMenuItems(items)
        }
    }, [render])


    useEffect(() => {
        if (props.onChange !== undefined) {
            console.log("Total reminder event triggered...")
            let obj = meeting;
            obj.reminder = remindersValue 
            console.log(obj)
            props.onChange(obj)
        }
    }, [meeting,remindersValue])


    useEffect(() => {
        setRemindersList(
            reminders.map((item) => {
                return (
                    <ListItem key={item} style={{paddingTop:0}}>

                        <Reminder
                            onChange={(e) => updateReminder(item, e)}
                            onRemove={() => removeReminder(item)}
                        />
                    </ListItem>
                )
            })
        )
    }, [reminders])

    const updateReminder = (item, value) => {
        console.log("AddMeeting reminder triggered")
        let newArr = [...remindersValue]
        console.log("AddMeeting reminder triggered #1")

        newArr[item] = value;
        console.log("AddMeeting reminder triggered #2")
        console.log(newArr)
        setRemindersValue(newArr)
        console.log("AddMeeting reminder triggered #3")

    }

    const removeReminder = (value) => {
        console.log("Chiamata la removeReminder di " + value)
        var index = reminders.indexOf(value);
        console.log(index)
        if (index > -1) {
            setReminders(reminders.filter(item => item !== value));
        }
    }


    useEffect(() => {
        if (props.currentClient !== undefined) {
            setMeeting({ ...meeting, client: props.currentClient.id })
        }
    }, [menuItems])

    //TODO: Fixa l'animazione di rimozione! (non ricaricare la pagina)

    return (
        <div>
            <div className={classes.row} style={{ margin: 10 }}>
                <InputLabel>Cliente: </InputLabel>
                <Select
                    style={{ minWidth: 150, marginLeft: 10 }}
                    value={meeting.client}
                    onChange={(e) => setMeeting({ ...meeting, client: e.target.value })}
                >
                    {menuItems}
                </Select>
            </div>
            <div className={classes.row} style={{ margin: 10 }}>
                <div>Incontro effettuato il:</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker value={meeting.meetingDate}
                        style={{ marginLeft: 20 }}
                        onChange={(e) => setMeeting({ ...meeting, meetingDate: e })}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div className={classes.row} style={{ margin: 10, marginBottom:0 }}>
                <div>Descrizione incontro:</div>
                <textarea style={{ width: '100%' }}
                    rows="3"
                    value={meeting.description || ""}
                    onChange={(e) => setMeeting({ ...meeting, description: e.target.value })} />
            </div>

            <List>
                {remindersList}
            </List>

            <Button
            style={{width:"100%"}}
            onClick={() => {
                setReminders([...reminders, reminders.length])
            }}>Aggiungi reminder</Button>

        </div>
    )

}

export default CustomAddMeeting