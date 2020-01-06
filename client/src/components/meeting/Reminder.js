import React, { useState, useEffect } from "react";

import {  Paper, FormControlLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import CheckboxReminder from "../meeting/CheckBoxReminder"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

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

function Reminder(props){
    const classes = useStyles();

    const [reminder, setReminder] = useState({
        date: new Date(),
        contacts: {},
        description: ""
    })
    
    const handleChange = name => event => {
        setReminder({ ...reminder, [name]: event.target.checked });
    };

    useEffect(()=>{
        if(props.onChange !== undefined ){
            console.log("Reminder updated...");
            props.onChange(reminder)
        }
        
    },[reminder])


    const removeReminder = ()=> {
        if(typeof props.onRemove !== "undefined"){
            props.onRemove()
        }
    }

    return (
    <Paper style={{ padding: 10, marginTop: 20 }}>
       <div>
            <div className={classes.row}>
                <div>Invia reminder il:</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker 
                value={reminder.date} onChange={
                    (e) => {
                        setReminder({...reminder, date:e})
                    }
                }
                style={{marginLeft:20}}/>

                </MuiPickersUtilsProvider>
                <CloseIcon 
                fontSize="small"
                onClick={removeReminder}/>
            </div>

            <div style={{marginBottom:5}}>Testo da inviare:</div>
            <textarea style={{ width: '100%' }}
                rows="3" 
                value={reminder.text}
                onChange={(e) => setReminder({...reminder, text:e.target.value})}/>

        
            <CheckboxReminder 
            onChange={(e) => {
                setReminder({...reminder, contacts:e})
                }}/>
        </div>
    </Paper>
    )
}

export default Reminder