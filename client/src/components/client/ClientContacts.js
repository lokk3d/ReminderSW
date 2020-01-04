import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from 'universal-cookie';
import WrapperBox from "../WrapperBox"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomEditText from "../CustomEditText"
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

/* 
 Aggiungere/Modificare i contatti:
 - Facebook
 - Instagram
 - Whatsapp
 - SMS
 - Email 
 */

function ClientContacts(props) {
    const classes = useStyles();
    const id = props.id

    const [error, setError] = React.useState(false);
    const [errorMSG, setErrorMSG] = React.useState("");

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [contacts, setContacts] = useState(
        { facebook: "*", whatsapp: "*", instagram: "*", sms: "*", email: "*" });
        
    const [render, setRender] = useState(0);


    useEffect(() => {
        axios.post('/api/client/contacts',
            { id, id },
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                console.log(res.data)
                setContacts(res.data)     

            })
            .catch((err) => {
                console.log(err)
            })

    }, [render])


    const save = () => {
        axios.post('/api/client/saveContacts',
        {id:id, contacts: contacts},
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

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setError(false)
    };


    return (
        <WrapperBox header="Contatti" minWidth={400}>
            <div style={{ padding: 10 }}>
                <div style={{ padding: 5 }} className={classes.row}>
                    <FacebookIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.facebook}
                        onSave={e => setContacts({ ...contacts, facebook: e })}
                    />
                </div>

                <div style={{ padding: 5 }} className={classes.row}>
                    <InstagramIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.instagram}
                        onSave={e => setContacts({ ...contacts, instagram: e })}
                    />
                </div>

                <div style={{ padding: 5 }} className={classes.row}>
                    <WhatsAppIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.whatsapp}
                        onSave={e => setContacts({ ...contacts, whatsapp: e })}
                    />
                </div>

                <div style={{ padding: 5 }} className={classes.row}>
                    <SmsIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.sms}
                        onSave={e => setContacts({ ...contacts, sms: e })}
                    />
                </div>

                <div style={{ padding: 5 }} className={classes.row}>
                    <EmailIcon style={{ marginRight: 10 }} />
                    <CustomEditText
                        type="text"
                        value={contacts.email}
                        onSave={e => setContacts({ ...contacts, email: e })}
                    />
                </div>

                <Button onClick={save} variant="contained" color="primary">Salva</Button>
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