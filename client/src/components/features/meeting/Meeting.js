import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button, List, ListItem,
    Paper,
    Select,
    MenuItem
} from '@material-ui/core';
import axios from "axios";
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
    DateTimePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import Message from "./Message";
import Cookies from 'universal-cookie';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        flexDirection: "column"
    },
    clientCF:{
        fontSize:12
    }
}));
function Meeting(props) {
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [client, setClient] = useState({_id:123})
    
    const [templateList, setTemplateList] = useState([]);

    const [date, setDate] = useState(new Date())
    const [description, setDescription] = useState("")

    const [messages, setMessages] = useState([])

    const [clients, setClients] = useState([])
    const [clientsList, setClientsList] = useState()

    useEffect(() => {
        axios.get('/api/template',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setTemplateList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })


        axios.get("/api/client",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setClients(response.data)
            })
            .catch((err) => {

            })

    }, [])




    useEffect(() => {
        setClientsList(
            clients.map(item => {
                return (
                    <MenuItem key={item._id} value={item._id}>
                        <div className={classes.col}>

                        <div >{item.firstName + " " + item.lastName }</div>
                        <div className={classes.clientCF}>{item.fiscalCode}</div>
                        </div>
                    </MenuItem>
                )
            })
        )
    }, [clients])

    useEffect(() => {
        let clientName = ""
        for(let i = 0; i < clients.length; i++){
            if(client._id == clients[i]._id){
                clientName = clients[i].firstName + " "+ clients[i].lastName
            }
        }


        if (typeof props.onChange !== "undefined") {
            props.onChange({ messages: messages, date: date, 
                description: description, client: client._id, 
                clientName: clientName
            })
        }

    }, [messages, date, description, client])


    useEffect(() => {
  
        if(typeof props.client !== "undefined" && typeof client.firstName === "undefined"){    
            console.log("Imposto sti cazzo di props");
            setClient(props.client)
        }
    }, [props])


    const updateMessage = (id, e) => {
        const newMessages = []
        for (let i = 0; i < messages.length; i++) {
            if (messages[i].id === id) {
                newMessages.push({ id: id, message: e })
            }
            else {
                newMessages.push(messages[i])
            }
        }
        setMessages(newMessages)
    }

    return (
        <div className={classes.col}>

            <div className={classes.row} >
                {
                  
                        <div style={{ marginRight: 10 }}>
                            <b style={{marginRight:10}}>Cliente:</b>
                            <Select
                            value={client._id}
                            onChange={(e)=>{setClient({...client, _id:e.target.value})}}>
                                {clientsList}
                            </Select>
                        </div>
                }

            </div>

            <div className={classes.row}>
                <div>Data appuntamento</div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        value={date}
                        onChange={(e) => setDate(e)}
                        style={{ marginLeft: 20 }} />

                </MuiPickersUtilsProvider>
            </div>
            <TextField
                id="standard-multiline-static"
                label="Descrizione appuntamento"
                multiline
                rowsMax="5"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "100%", marginTop: 10 }}
            />


            <div style={{ pading: 10 }}>
                <List>
                    {
                        messages.map(item => {
                            return (
                                <ListItem key={item.id}>
                                    <Paper style={{ padding: 20 }}>
                                        <Message
                                            onChange={e => updateMessage(item.id, e)} //salva su item.message
                                            templates={templateList}
                                            onDelete={() => setMessages(messages.filter(e => e.id !== item.id))}
                                        />
                                    </Paper>
                                </ListItem>
                            )
                        })
                    }
                </List>

            </div>
            <Button
                onClick={() => setMessages([...messages, { id: Date.now(), message: {} }])}
                variant="outlined"
                color="primary"
                style={{ display: "block", marginLeft: "auto", marginRight: "auto", size: "60%" }}
            >Aggiungi messaggio</Button>
        </div>
    )
}

export default Meeting