import React, { useState, useEffect } from "react";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

function formatDate(current_datetime) {
    return (
        current_datetime.getFullYear() + "/" +
        (current_datetime.getMonth() + 1) + "/" +
        current_datetime.getDate() + " " +

        current_datetime.getHours() + ":" +
        current_datetime.getMinutes()
    )
}

function formatContact(contactName, data) {
    return (contactName +
        "  -> [ stato: " + (data.sent ? "Inviato" : "Non inviato") +
        "  |  codice: " + data.statusCode + " ]\n"
    )

}

function MessageBox(props) {
    const classes = useStyles();

    const pendingMessage = { client: {}, contacts: {} }

    const [message, setMessage] = useState(pendingMessage)
    const [formattedDate, setFormattedDate] = useState("")

    const [contacts, setContacts] = useState()

    useEffect(() => {
        setMessage(props.message || pendingMessage)
        console.log(message);
    }, [props])

    useEffect(() => {
        if (typeof message !== "undefined") {
            console.log(message.client);
            if (typeof message.contacts.whatsapp !== "undefined") {

                let newC = "" //newContacts
                if (message.contacts.whatsapp.active)
                    newC += formatContact("Whatsapp", message.contacts.whatsapp)
                if (message.contacts.email.active)
                    newC += formatContact("Email", message.contacts.email)
                if (message.contacts.sms.active)
                    newC += formatContact("SMS", message.contacts.sms)


                setContacts(newC)
            }
        }
        setFormattedDate(formatDate(new Date(message.date)))
    }, [message])

    return (

        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography className={classes.heading}>
                    {"  " + message.client.firstName + " " + message.client.lastName}
                </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails >
                <div style={{width:"100%"}}>
                Testo: {" " + message.description}<br/>
                Data: &nbsp;{" " + formattedDate}<br/>
                <div style={{whiteSpace:"pre"}}>
                    {contacts}
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button style={{ margin: 10, marginBottom:0  }} color="primary" variant="outlined">Rischedula</Button>
                    <Button color="secondary" style={{ margin: 10, marginBottom:0 }}>Cancella</Button>

                </div>
                </div>
               
            </ExpansionPanelDetails>
        </ExpansionPanel>

    )
}

export default MessageBox