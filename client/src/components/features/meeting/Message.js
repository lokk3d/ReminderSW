import React, { useState, useEffect } from "react";
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EnvVariables from "../../shared/EnvVariables";
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import MenuItem from '@material-ui/core/MenuItem';
import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import EmailIcon from '@material-ui/icons/Email';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    col: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));


function Message(props) {
    /*
    Può avere prop -> message -> Contiene un messaggio, se esiste modifica un messaggio preesistente
    -> onDelete [fa qualcosa]
    -> onUpdate [ogni volta che modifico il messaggio lo manda]
    -> templates (dati dei template)
    Descrizione
    Cazzinculi variabili
    Data
    [Checkbox contatti]
    X di chiusura
    */

    const classes = useStyles();

    const [description, setDescription] = useState("")
    const [contacts, setContacts] = useState({whatsapp:false, sms:false, email:false})
    const [date, setDate] = useState(new Date())

    let templates = props.templates || [];
    const [selectedTemplate, setSelectedTemplate] = useState("")
    const [templateList, setTemplateList] = useState()



    useEffect(()=>{
        templates = props.templates || []
    
        setTemplateList(
            templates.map(item=>{
           
                return(
                <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                )
            })
        )
       
    },[props])

    useEffect(()=>{
        for(let i = 0; i < templates.length; i++){
           
            if(templates[i]._id === selectedTemplate.toString()){
                setDescription(templates[i].description)
            }
        }
    },[selectedTemplate])

    function addVar(e) {
        setDescription(prev => (prev || "") + e.variable + " ")
    }

    const update = () => {
        if (typeof props.onChange !== "undefined") {
            props.onChange({
                description: description,
                contacts: contacts,
                date: date,
            })
        }
    }

    useEffect(() => {
        update()
    }, [description, contacts, date])

    const handleChange = event => {
        setSelectedTemplate(event.target.value);
      };

    

    return (
        <div>
            <div className={classes.row} style={{ justifyContent: "space-between" }}>
                <div>
                    Inviare in data:
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker
                            value={date}
                            onChange={(e) => setDate(e)}
                            style={{ marginLeft: 20 }} />

                    </MuiPickersUtilsProvider>
                </div>
                <IconButton onClick={() => {
                    if (typeof props.onDelete !== "undefined")
                        props.onDelete()
                }}>
                    <CloseIcon
                        fontSize="small" />
                </IconButton>

            </div>

            <div className={classes.row}>
                <div style={{marginRight:10}}>
                Template da utilizzare:

                </div>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedTemplate}
                    onChange={handleChange}
                >
                    {templateList}
                </Select>

            </div>

            <TextField
                id="standard-multiline-static"
                label="Messaggio da inviare"
                multiline
                rowsMax="5"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", marginTop: 10 }}
            />

            <EnvVariables
                onClick={(e) => addVar(e)}
            />

            <div className={classes.row} style={{ justifyContent: "space-between" }}>
                <div>Inviare messaggio ai seguenti contatti: </div>

                <div className={classes.row}>
                    <FormControlLabel
                        style={{ margin: 5 }}
                        control={
                            <Checkbox
                                style={{ padding: 0 }}
                                checked={contacts.whatsapp}
                                onChange={(e) => setContacts({ ...contacts, whatsapp: e.target.checked })}
                                color="primary"
                                value={true}
                            />
                        }
                    />
                    <WhatsAppIcon />
                </div>

                <div className={classes.row}>
                    <FormControlLabel
                        style={{ margin: 5 }}
                        control={
                            <Checkbox
                                style={{ padding: 0 }}
                                checked={contacts.email}
                                onChange={(e) => setContacts({ ...contacts, email: e.target.checked })}
                                color="primary"
                                value={true}
                            />
                        }
                    />
                    <EmailIcon />
                </div>

                <div className={classes.row}>
                    <FormControlLabel
                        style={{ margin: 5 }}
                        control={
                            <Checkbox
                                style={{ padding: 0 }}
                                checked={contacts.sms}
                                onChange={(e) => setContacts({ ...contacts, sms: e.target.checked })}
                                color="primary"
                                value={true}
                            />
                        }
                    />
                    <SmsIcon />
                </div>


            </div>
        </div>

    )
}

export default Message