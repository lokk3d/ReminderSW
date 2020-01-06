import React, {useState, useEffect} from "react";
import axios from "axios";
import { Button } from '@material-ui/core';

import Cookies from 'universal-cookie';
import WrapperBox from "../WrapperBox"
import { makeStyles,useTheme } from '@material-ui/core/styles';
import CustomEditText from "../CustomEditText"
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
        justifyContent :"center",
        flexDirection: "column"
      },
    marginText: {
        marginRight:10
    },
    buttonDiv:{
        marginTop:20
    }
  }));


function ClientPersonalData(props){
    const classes = useStyles();

    const id = props.id

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const [info, setInfo] = useState({firstName:"Caricamento", lastName:"in corso..."})
    const [render, setRender] = useState(0)
    const [open, setOpen] = React.useState(false);


    useEffect(()=>{
        axios.post("/api/client/allinfo",
        {id:id},
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            setInfo(response.data)
        })
        .catch((err) => {
    
        })
    
    }, [render])
   
    const save = () =>{
        axios.post("/api/client/update",
        {id:id,firstName: info.firstName, lastName: info.lastName, fiscalCode: info.fiscalCode},
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            alert("Utente aggiornato");
            setRender(prev => prev+1)
        })
        .catch((err) => {
            alert("Utente non aggiornato");
        })
    }

    const deleteClient = () =>{
        setOpen(true)
    }   

    const handleClose = () => {
        setOpen(false);
      };
    

    const sureDelete = () =>{
        axios.post('/api/client/deleteClient',
        {id:id},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            console.log(res)
            window.location="/user"
          })
          .catch((err) => {
            console.log(err)
          })
    }

    
    return (
 
    <WrapperBox header={info.firstName + " " + info.lastName} minWidth={400}>
    <div style={{ padding: 10 }}>
            <div><b>Anagrafica</b></div>

            <div className={classes.row}>
                <div className={classes.marginText}>Nome:</div>
                <CustomEditText
                type="text"
                value={info.firstName}
                onSave={e => {setInfo({...info, firstName:e})}}
                />
                
            </div>

            <div className={classes.row}>
                <div className={classes.marginText}>Cognome:</div>
                <CustomEditText
                type="text"
                value={info.lastName}
                onSave={e =>  {setInfo({...info, lastName:e})}}
                />
            </div>

            <div className={classes.row}>
                <div className={classes.marginText}>CF:</div>
                <CustomEditText
                type="text"
                value={info.fiscalCode}
                onSave={e =>  {setInfo({...info, fiscalCode:e})}}
                />
            </div>
            <div className={classes.buttonDiv}>
                <Button onClick={save} variant="contained" color="primary" style={{marginRight:20}}>Salva</Button>
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