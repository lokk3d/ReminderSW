import React, { useState, useEffect } from "react";
import Reminder from "./Reminder"
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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

function AddMeeting(props) {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = useState(new Date())
   /*
    Se alla addMeeting viene passato il parametro currentClient {fiscalCode, _id}
    la select contiene solo il nome del cliente
    altrimenti viene passato il prop clientList con fiscalCode e _id dei clienti

    */

    //const [clientId, setClientId] = useState("")
    const [meeting, setMeeting] = useState({clientId:"", date: new Date(), description:"", reminder:{}})
    const [menuItems, setMenuItems] = useState()

    const [render, setRender] = useState(0)

    useEffect(()=>{
        if (props.currentClient !== undefined) {
            console.log("Client found: ")
            console.log(props.currentClient);
            setMenuItems(()=> {
                return(
                    <MenuItem value={props.currentClient.id}>
                        {props.currentClient.fiscalCode}
                    </MenuItem>
                )
            })    
        }
        if(props.clientList !== undefined){

            let items = props.clientList.map((item) =>{
                return (
                    <MenuItem value={item.id}>
                        {item.fiscalCode}
                    </MenuItem>
                )
            })
            setMenuItems(items)    
        }
    },[render])
    
    useEffect(()=>{
        if (props.currentClient !== undefined) {
            setMeeting({...meeting, clientId:props.currentClient.id})
        }
    },[menuItems])
    
    useEffect(()=> {
        if(props.onChange !== undefined){
            props.onChange(meeting)
        }
    },[meeting])
 

    return (
        <div>
            <div className={classes.row} style={{ margin: 10 }}>
                    <InputLabel>Cliente: </InputLabel>
                    <Select
                        style={{ minWidth: 150, marginLeft:10 }}
                        value={meeting.clientId}
                        onChange={(e) => setMeeting({...meeting, clientId:e.target.value})}
                    >
                    {menuItems}
                    </Select>
            </div>
            <div className={classes.row} style={{ margin: 10 }}>
                <div>Incontro effettuato il:</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker value={meeting.date}
                        style={{ marginLeft: 20 }}
                        onChange={(e) => setMeeting({...meeting, clientId:e})}
                    />
                </MuiPickersUtilsProvider>
            </div>

            <div className={classes.row} style={{ margin: 10 }}>
                <div>Descrizione incontro:</div>
                <textarea style={{ width: '100%' }}
                    rows="3"
                    value={meeting.description}
                    onChange={(e) => setMeeting({...meeting, description:e.target.value})} />
            </div>

            <Reminder onChange={(e) => setMeeting({...meeting, reminder:e})}/>
        </div>
    )

}

export default AddMeeting