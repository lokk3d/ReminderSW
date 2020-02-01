import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

import Cookies from 'universal-cookie';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import WrapperBox from "../../shared/WrapperBox"
import CustomEditText from "../../shared/CustomEditText"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
    },
    marginText: {
        marginRight: 10
    },
    buttonDiv: {
        marginTop: 20
    },
    fixedWidth:{
        width:80
    }
}));


function ClientPersonalData(props) {

    const classes = useStyles();
    let history = useHistory();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const [info, setInfo] = useState({ firstName: "Caricamento", lastName: "in corso..." })
    const [render, setRender] = useState(0)
    const [open, setOpen] = React.useState(false);

    /*
    useEffect(()=>{
     if(typeof currentClient !== "undefined"){
         setInfo(currentClient.client)
     }
    },[currentClient])
   */

    useEffect(() => {
        axios.get("/api/client/"+props.id,
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setInfo(response.data)
            })
            .catch((err) => {
                history.push("/home");
            })
    }, [render])

    const deleteClient = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false);
    };


    const sureDelete = () => {
        axios.delete('/api/client/delete', {
            data: { _id: info._id },
            headers: { authorization: "Bearer " + token }
        })
            .then((res) => {
                console.log(res)
                history.push("/home");

            })
            .catch((err) => {
                console.log(err)
            })
    }

    const saveData = (e) => {
        console.log("Salvo i dati del cliente: ")
        console.log(e)

        axios.post("/api/client/update",
            { _id: e._id, firstName: e.firstName, lastName: e.lastName, fiscalCode: e.fiscalCode },
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                alert("Utente aggiornato");
                setRender(prev => prev + 1)
            })
            .catch((err) => {
                alert("Utente non aggiornato");
            })
    }


    return (

        <WrapperBox header={info.firstName + " " + info.lastName}  >
            <div style={{ padding: 10 }}>
                <div><b>Anagrafica</b></div>

                <div className={classes.row}>
                    <div className={[classes.marginText, classes.fixedWidth].join(" ")}>Nome:</div>
                    <CustomEditText
                        type="text"
                        value={info.firstName}
                        onSave={e => saveData({ ...info, firstName: e })}
                    />

                </div>

                <div className={classes.row}>
                    <div className={[classes.marginText, classes.fixedWidth].join(" ")}>Cognome:</div>
                    <CustomEditText
                        type="text"
                        value={info.lastName}
                        onSave={e => saveData({ ...info, lastName: e })}
                    />
                </div>

                <div className={classes.row}>
                    <div className={[classes.marginText, classes.fixedWidth].join(" ")}>C. fiscale:</div>
                    <CustomEditText
                        type="text"
                        value={info.fiscalCode}
                        onSave={e => saveData({ ...info, fiscalCode: e })}
                    />
                </div>
                <div className={classes.buttonDiv}>
                    <Button onClick={deleteClient} variant="outlined" color="secondary">Elimina Cliente</Button>
                </div>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Eliminare il cliente? "}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Attenzione, l'eliminazione è permanente, i dati non potranno essere ripristinati
            </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Annulla
            </Button>
                    <Button onClick={sureDelete} color="secondary" autoFocus>
                        Cancella cliente
            </Button>
                </DialogActions>
            </Dialog>


        </WrapperBox>
    )
}

export default ClientPersonalData