import React, {useState, useEffect} from "react"; 
import WrapperBox from "../WrapperBox";
import FaceIcon from '@material-ui/icons/Face';
import { ListItem, ListItemIcon, ListItemText, List,Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import axios from "axios"
import Cookies from 'universal-cookie';

require("dotenv").config()

function ClientList(props){

    const [clientsID, setClientsID] = useState()
    const [clientList, setClientList] = useState([])
    const [render, setRender] = useState(0)

    const [notif, setNotif] = React.useState(false);
    const [notifText, setNotifText] = React.useState("Attenzione,compila tutti i campi");

    //aggiunta di un nuovo cliente
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [fiscalCode, setFiscalCode] = useState("")    

    const [open, setOpen] = React.useState(false);

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    useEffect(()=>{
        console.log("Renderizzo...")
        axios.get("/api/user/getClients",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
          
            setClientsID(response.data)
        })
        .catch((err) => {

        })

    }, [render])

    useEffect(()=>{
        if(clientsID !== undefined){
            clientsID.forEach(item =>{
                axios.post(process.env.REACT_APP_HOST + "/api/client/getbyid",
                {id:item},
                { headers: { authorization: "Bearer " + token } })
                .then((response) => {
                    console.log(response.data)
                    response.data.id = item
                    setClientList(arr =>[...arr,response.data])
                 
                })
                .catch((err) => {
        
                })
               
            })
        }
    }, [clientsID])
    

    const details = (id) =>{
        console.log("Chiamata la modifica di: " + id)
        window.location ="/client/" + id
    }

    const save = () => {
        if(firstName === "" || lastName === "" || fiscalCode === ""){
            setNotifText("Compila tutti i campi!")
            setNotif(true)
        }else{
            axios.post(process.env.REACT_APP_HOST + "/api/client/add",
            {firstName: firstName, lastName: lastName, fiscalCode: fiscalCode},
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setNotifText("Cliente aggiunto")
                setNotif(true)
                window.location ="/user"
            })
            .catch((err) => {
                setNotifText("Errore nell'aggiunta del cliente...")
                setNotif(true)
            })
        }
    }

    return (
        <WrapperBox header="Lista clienti" minWidth={props.minWidth}>
            <List>
                {clientList.map(item =>{
                    return(
                        <ListItem button key={item.id} onClick={() => details(item.id)}>
                            <ListItemIcon>
                            <FaceIcon />
                            </ListItemIcon>
                            <ListItemText 
                            primary={item.firstName + " "+ item.lastName} 
                            secondary={item.fiscalCode}/>
                        </ListItem>
                    )
                })}
            </List>

            <Button variant="contained" color="primary" style={{width:'100%', marginTop:20}}
            onClick={()=>setOpen(true)}>Aggiungi cliente</Button>


            <Dialog
                open={open}
                keepMounted
                onClose={() => setOpen(false)}>
                <DialogTitle >{"Aggiungi nuovo cliente"}</DialogTitle>
                <DialogContent>

                    <TextField id="standard-basic" label="Nome" value={firstName} style={{width:'100%'}} 
                    onChange={(e)=>setFirstName(e.target.value)}/>
                     <TextField id="standard-basic" label="Cognome" value={lastName}   style={{width:'100%'}} 
                    onChange={(e)=>setLastName(e.target.value)}/>
                     <TextField id="standard-basic" label="Codice Fiscale" value={fiscalCode}  style={{width:'100%'}} 
                    onChange={(e)=>setFiscalCode(e.target.value)}/>

                </DialogContent>
                <DialogActions>
                <Button onClick={() => setOpen(false)} >
                    Cancella
                </Button>
                <Button onClick={save} color="primary" variant="contained">
                    Salva
                </Button>
                </DialogActions>
            </Dialog>


            <Snackbar
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                open={notif}
                autoHideDuration={6000}
                onClose={()=>{setNotif(false)}}
                ContentProps={{
                'aria-describedby': 'message-id',
                }}
                message={<span id="message-id">{notifText}</span>}
                action={[
                <IconButton
                    key="close"
                    aria-label="close"
                    color="inherit"
                    onClick={()=>setNotif(false)}
                >
                    <CloseIcon />
                </IconButton>,
                ]}
            />


        </WrapperBox>
    )
}


export default ClientList