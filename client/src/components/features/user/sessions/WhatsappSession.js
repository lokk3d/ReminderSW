import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Cookies from 'universal-cookie';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


import WrapperBox from '../../../shared/WrapperBox';

require("dotenv").config();


const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    box: {
        minWidth: 200,
        padding: 10,
        boxShadow: "0px 0px 5px #dbdbdb",
        maxWidth: 400,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15
    },
    spacing: {
        padding: 10,
        margin: 10
    },
    text: {
        marginLeft: 10,
        color: "#6e6e6e"
    },
    sessionButton: {
        width: '80%',
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
    }
}));


function WhatsappSession(props) {
    const classes = useStyles();
    const theme = useTheme();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [open, setOpen] = React.useState(false);
    const [whatsappSession, setWhatsappSession] = useState({})
    const [newSession, setNewSession] = useState("")

    const [render, setRender] = useState(0)

    useEffect(() => {
        axios.get('/api/user/session/getWhatsappSession',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setWhatsappSession(res.data)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [render])


    const configWhatsapp = () => {
        setOpen(true);
    }

    const setWhatsapp = () => {
        if(typeof newSession.sessionId === "undefined" || newSession.sessionId.trim() === ""){

            alert("Errore, compila tutti i campi");
        }else{

            axios.post('/api/user/session/setWhatsappSession',
            {sessionId: newSession.sessionId},
            { headers: { authorization: "Bearer " + token } })
                .then((res) => {
                alert("Whatsapp collegato")
                setRender(prev => prev+1)
                })
                .catch((err) => {
                console.log(err)
                }) 
        }

        
        setOpen(false);
    };

    const removeWhatsapp = () => {
        axios.post('/api/user/session/removeWhatsappSession',
        {},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setWhatsappSession({})
            setRender(prev => prev+1)
          })
          .catch((err) => {
            console.log(err)
          })
        setOpen(false);
    };


    const whatsappSessionBox = () => {
        return (<div className={classes.box} >
            <p style={{ margin: 0 }}>Sessione Whatsapp</p>

            {(typeof whatsappSession.sessionId !== "undefined") ?
                <div>
                    <div className={[classes.row, classes.spacing].join(" ")}>
                        <CheckCircleOutlineIcon color="action" />
                        <div className={classes.text}>Id di sessione: {whatsappSession.sessionId}</div>
                    </div>
                    <Button variant="contained" color="primary" className={classes.sessionButton} onClick={removeWhatsapp}>
                        Scollega
                </Button>
                </div>
                :
                <div>
                    <div className={[classes.row, classes.spacing].join(" ")}>
                        <WarningIcon color="action" />
                        <div className={classes.text}>Attenzione, non hai collegato Whatsapp</div>
                    </div>
                    <Button variant="contained" color="primary" className={classes.sessionButton} onClick={configWhatsapp}>
                        Configura
                    </Button>
                </div>
            }

        </div>)
    }



    return (
        <div>
        {whatsappSessionBox()}
           
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{"Imposta l'id di sessione"}</DialogTitle>
                <DialogContent>
                    <div style={{marginBottom:20}}>Puoi trovare il tuo id sessione cliccando  &emsp;
                        <a href="https://mercury.chat/"  target='_blank'>qui</a>
                    </div>
                    <TextField
                        style={{marginRight:20}}
                        label="Id di sessione"
                        value={newSession.sessionId || ""}
                        onChange={(e) => setNewSession({ ...newSession, sessionId: e.target.value })}
                        autoComplete="" />
                  
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} >
                        Annulla
                </Button>
                    <Button onClick={setWhatsapp} color="primary" autoFocus>
                        Conferma
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WhatsappSession;
