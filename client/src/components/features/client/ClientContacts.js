import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import WrapperBox from "../../shared/WrapperBox"
import CustomEditText from "../../shared/CustomEditText"
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));


function ClientContacts(props) {
    const classes = useStyles();

    const [error, setError] = React.useState(false);
    const [errorMSG, setErrorMSG] = React.useState("");
    const clientId = props.id

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [contacts, setContacts] = useState({});

    useEffect(()=>{
    axios.post('/api/client/contacts',
    {_id:clientId},
    { headers: { authorization: "Bearer " + token } })
      .then((res) => {
        console.log(res)
        setContacts(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
    },[props])

    const updateContacts = (target, value) => {
        let newContacts = contacts
        if (target === "facebook")
            newContacts = { ...contacts, facebook: value }
        if (target === "instagram")
            newContacts = { ...contacts, instagram: value }
        if (target === "whatsapp")
            newContacts = { ...contacts, whatsapp: value }
        if (target === "sms")
            newContacts = { ...contacts, sms: value }
        if (target === "email")
            newContacts = { ...contacts, email: value }

        setContacts(newContacts)
        console.log(newContacts);
        
        axios.post('/api/client/contacts/update',
        {_id:clientId, contacts: newContacts},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            console.log(res)
            setErrorMSG("Salvataggio effettuato...")
            setError(true)
          })
          .catch((err) => {
            console.log(err)
            setErrorMSG("Errore nel salvataggio...")
            setError(true)
          })
          
    }

    useEffect(()=> {
        console.log("Contatti caricati...");
        console.log(contacts);
    },[contacts])

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false)
    };


    return (
        <WrapperBox header="Contatti">
            <div style={{ padding: 10 }}>

                <div style={{ padding: 5 }} className={classes.row}>
                    <EmailIcon style={{ marginRight: 10 }} />
                    
                    <CustomEditText
                        type="text"
                        value={contacts.email }
                        onSave={e => updateContacts('email', e)}
                    />
                </div>


                <div style={{ padding: 5 }} className={classes.row}>
                    <WhatsAppIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.whatsapp }
                        onSave={e => updateContacts('whatsapp', e)}
                    />
                </div>


                <div style={{ padding: 5 }} className={classes.row}>
                    <SmsIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.sms }
                        onSave={e => updateContacts('sms', e)}
                    />
                </div>


                <div style={{ padding: 5 }} className={classes.row}>
                    <FacebookIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        value={contacts.facebook}
                        onSave={e => updateContacts('facebook', e)}
                    />
                </div>

                <div style={{ padding: 5 }} className={classes.row}>
                    <InstagramIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.instagram }
                        onSave={e => updateContacts('instagram', e)}
                    />
                </div>

            </div>

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={error}
                autoHideDuration={6000}
                onClose={handleClose}
                ContentProps={{
                    'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{errorMSG}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="close"
                        color="inherit"
                        className={classes.close}
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </WrapperBox>
    )
}

export default ClientContacts