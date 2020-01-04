import React, { useState, useEffect } from "react";

import {  Paper, FormControlLabel } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Checkbox from '@material-ui/core/Checkbox';
import CheckboxReminder from "../meeting/CheckBoxReminder"
import { makeStyles, useTheme } from '@material-ui/core/styles';


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
        state: false,
        date: new Date(),
        contacts: {},
        description: ""
    })
    
    const handleChange = name => event => {
        setReminder({ ...reminder, [name]: event.target.checked });
    };

    useEffect(()=>{
        if(props.onChange !== undefined ){
            props.onChange(reminder)
        }
        
    },[reminder])

    return (
    <Paper style={{ padding: 10, marginTop: 20 }}>
        <FormControlLabel
            control={
                <Checkbox
                    checked={reminder.state}
                    onChange={handleChange('state')}
                    color="primary"
                    value={true}
                />
            }
            label="Usa reminder"
        />

        {
            reminder.state ?
                <div>
                    <div className={classes.row}>
                        <div>Invia il reminder il:</div>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker 
                        value={reminder.date} onChange={
                            (e) => {
                                setReminder({...reminder, date:e})
                            }
                        }
                        style={{marginLeft:20}}/>

                        </MuiPickersUtilsProvider>
                    </div>

                    <div style={{marginBottom:5}}>Testo da inviare:</div>
                    <textarea style={{ width: '100%' }}
                        rows="3" 
                        value={reminder.description}
                        onChange={(e) => setReminder({...reminder, description:e.target.value})}/>

                
                    <CheckboxReminder 
                    onChange={(e) => setReminder({...reminder, contacts:e})}/>
                </div>
                :
                <div></div>
        }

    </Paper>
    )
}

export default Reminder