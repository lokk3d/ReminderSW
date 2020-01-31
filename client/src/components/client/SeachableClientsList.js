import React, {useState, useEffect} from "react"; 
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
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useHistory } from 'react-router-dom';

require("dotenv").config()

function ClientList(props){
    let history = useHistory();

    const [clientList, setClientList] = useState([])
    const [filteredClientList, setFilteredClientList] = useState([])
    const [render, setRender] = useState(0)

    //ricerca cliente
    const [startText, setStartText] = useState("")

    const [notif, setNotif] = React.useState(false);
    const [notifText, setNotifText] = React.useState("Attenzione,compila tutti i campi");

    //aggiunta di un nuovo cliente
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [fiscalCode, setFiscalCode] = useState("")    
    const [focus, setFocus] = useState(false)
    const [open, setOpen] = React.useState(false);

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')


    useEffect(()=>{
        setFocus(props.focus || false)
    },[props])

    useEffect(()=>{
        console.log(focus);
    },[focus])


    useEffect(()=>{
        console.log("Renderizzo...")
        axios.get("/api/client/",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            setClientList(response.data)
        })
        .catch((err) => {

        })

    }, [render])

    
    useEffect(()=>{
        console.log(startText)
        console.log(clientList)
        if(startText === ""){
            setFilteredClientList(clientList)
        }else{
            setFilteredClientList(clientList.filter(item =>{
                return (item.firstName.toLowerCase().startsWith(startText) ||
                item.lastName.toLowerCase().startsWith(startText) 
                || item.fiscalCode.toLowerCase().startsWith(startText))
            }))
        }
       
    },[startText, clientList])

    const details = (id) =>{
        //console.log("Chiamata la modifica di: " + id)
        if(typeof props.onSelectedClient !== "undefined"){
            props.onSelectedClient(id)
        }
        history.push("/client/" + id);

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
                setOpen(false)
                setRender(prev => prev+1)

            })
            .catch((err) => {
                setNotifText("Errore nell'aggiunta del cliente...")
                setNotif(true)
            })
        }
    }



    return (
        <div>
            
            <div style={{ width:"100%", display:"block", marginLeft:"auto", marginRight:"auto"}}>
                <TextField
                    fullWidth={true}
                    focused={focus}
                    label="Cerca cliente"
                    value={startText}
                    onChange={e => setStartText(e.target.value)}
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchIcon />
                        </InputAdornment>
                    ),
                    }}
                />
            </div>
            <List>
                { 
                (clientList.length !== 0)?
                filteredClientList.map(item =>{
                    return(
                        <ListItem button key={item._id} onClick={() => details(item._id)}>
                            <ListItemIcon>
                            <FaceIcon />
                            </ListItemIcon>
                            <ListItemText 
                            primary={item.firstName + " "+ item.lastName} 
                            secondary={item.fiscalCode}/>
                        </ListItem>
                    )
                }):
                <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <AddCircleOutlineIcon style={{margin:10}}/>
                    <p>Aggiungi il tuo primo cliente!</p>
                </div>
                }
            </List>
            {props.addClient ?
                <Button variant="contained" color="primary" style={{width:'100%', marginTop:20}}
                onClick={()=>setOpen(true)}>Aggiungi cliente</Button>
                :
                null
            }
            

            <Dialog
                open={open}
                keepMounted
                onClose={() => setOpen(false)}>
                <DialogTitle >{"Aggiungi nuovo cliente"}</DialogTitle>
                <DialogContent>

                    <div style={{display:"flex", flexDirection:"row"}}>
                        <TextField id="standard-basic" label="Nome" value={firstName} style={{width:'100%', margin:10}} 
                        onChange={(e)=>setFirstName(e.target.value)}/>
                        <TextField id="standard-basic" label="Cognome" value={lastName}   style={{width:'100%', margin:10}} 
                        onChange={(e)=>setLastName(e.target.value)}/>
                    </div>
                   
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

        </div>
    )
}


export default ClientList