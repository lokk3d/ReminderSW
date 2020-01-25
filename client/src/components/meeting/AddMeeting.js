import Meeting from "./Meeting";
import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button, List, ListItem,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Typography,
    Paper
} from '@material-ui/core';
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'universal-cookie';
import WrapperBox from "../WrapperBox";
import Grid from '@material-ui/core/Grid';

function AddMeeting(props) {

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const id = props.match.params.id || ""
    const [client, setClient] = useState()

    const [meeting, setMeeting] = useState()
    //  onChange={e => {setMeeting(e)}}
    useEffect(()=>{
        axios.post("/api/client/getbyid",
        { id: id },
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            setClient(response.data)
        })
        .catch((err) => {
        }) 
    },[])

    useEffect(()=>{
        console.log(client);
    },[client])


    const saveMeeting = ()=> {
        if(typeof meeting.clientId !== "undefined"){
            console.log("Meeting aggiunto. Dati meeting:");
            console.log(meeting);
        }else{
            alert("Attenzione, aggiungi il cliente con il quale prendere appuntamento")
        }
    }

    return (
        <Grid container spacing={1} >
        <Grid item sm={5} style={{ width: "100%" }}>
            <WrapperBox header="Aggiungi appuntamento">
                <div style={{margin:10}}>
                <Meeting
                    client={client}
                    onChange={e => {setMeeting(e)}}
                />
                </div>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button style={{margin:10}}>Annulla</Button>
                <Button color="primary" variant="contained" style={{margin:10}}
                onClick={saveMeeting}>Salva</Button>

                </div>
            </WrapperBox>
        </Grid>

        <Grid item sm={7} style={{ width: "100%" }}>

            <WrapperBox header="Calendario...">
                <div>Aggiungere calendario qui</div>
            </WrapperBox>

        </Grid>
    </Grid>
     
    )
}

export default AddMeeting