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


import WrapperBox from '../WrapperBox';

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


function SessionBox(props) {
    const classes = useStyles();
    const theme = useTheme();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [open, setOpen] = React.useState(false);
    const [emailSession, setEmailSession] = useState({ username: "*", password: "*" })
    const [newEmail, setNewEmail] = useState({ email: "", password: "" })

    const [render, setRender] = useState(0)

    useEffect(() => {
        axios.get('/api/user/getEmailSession',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setEmailSession(res.data)
                console.log(res)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [render])


    const configEmail = () => {
        setOpen(true);
    }

    const setEmail = () => {
        axios.post('/api/user/setEmailSession',
        {username:newEmail.email, password: newEmail.password},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            console.log(res)
            setRender(prev => prev+1)
          })
          .catch((err) => {
            console.log(err)
          })
        setOpen(false);
    };

    const removeEmail = () => {
        axios.post('/api/user/setEmailSession',
        {username:"*", password: "*"},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setNewEmail({username:"*", password:"*"})
            setRender(prev => prev+1)
          })
          .catch((err) => {
            console.log(err)
          })
        setOpen(false);
    };


    const emailSessionBox = () => {
        return (<div className={classes.box} >
            <p style={{ margin: 0 }}>Sessione Email</p>

            {(emailSession.username !== "*") ?
                <div>
                    <h5 className={classes.text}>Email collegata</h5>
                    <div className={[classes.row, classes.spacing].join(" ")}>
                        <CheckCircleOutlineIcon color="action" />
                        <div className={classes.text}>Email di sessione: {emailSession.username}</div>
                    </div>
                    <Button variant="contained" color="primary" className={classes.sessionButton} onClick={removeEmail}>
                        Scollega
                </Button>
                </div>
                :
                <div>
                    <div className={[classes.row, classes.spacing].join(" ")}>
                        <WarningIcon color="action" />
                        <div className={classes.text}>Attenzione, non hai collegato l'Email</div>
                    </div>
                    <Button variant="contained" color="primary" className={classes.sessionButton} onClick={configEmail}>
                        Configura
                    </Button>
                </div>
            }

        </div>)
    }



    return (
        <WrapperBox header="Sessioni" minWidth={props.minWidth}>
            {emailSessionBox()}
            <p style={{ padding: 20 }}>A breve verranno implementate anche le sessioni per:
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Whatsapp</li>
                    <li>SMS</li>

                </ul>
            </p>


            <Dialog
                open={open}
                onClose={() => setOpen(false)}
            >
                <DialogTitle id="alert-dialog-title">{"Imposta l'email"}</DialogTitle>
                <DialogContent>
                        <TextField
                            style={{marginRight:20}}
                            label="Email"
                            value={newEmail.email}
                            onChange={(e) => setNewEmail({ ...newEmail, email: e.target.value })}
                            autoComplete="" />
                        <TextField
                            label="Password"
                            autoComplete=""
                            value={newEmail.password}
                            type="password"
                            onChange={(e) => setNewEmail({ ...newEmail, password: e.target.value })} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} >
                        Annulla
                </Button>
                    <Button onClick={setEmail} color="primary" autoFocus>
                        Conferma
                </Button>
                </DialogActions>
            </Dialog>
        </WrapperBox>
    );
}

export default SessionBox;
