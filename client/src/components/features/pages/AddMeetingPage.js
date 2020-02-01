import Meeting from "../meeting/Meeting";
import React, { useState, useEffect } from "react";
import {
    Button
} from '@material-ui/core';
import axios from "axios";
import Cookies from 'universal-cookie';
import WrapperBox from "../../shared/WrapperBox";
import Grid from '@material-ui/core/Grid';
import Calendar from "../user/Calendar";

function AddMeetingPage(props) {

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const id = props.match.params.id || ""
    const [client, setClient] = useState()

    const [meeting, setMeeting] = useState()
    //  onChange={e => {setMeeting(e)}}
    useEffect(()=>{
        axios.get("/api/client/"+id,
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
        if(typeof meeting.client !== "undefined"){
            console.log("Meeting aggiunto. Dati meeting:");
            console.log(meeting);
            axios.post("/api/meeting/add",
            {   client: meeting.client,
                clientName: meeting.clientName, 
                date: meeting.date, 
                description: meeting.description, 
                messages: meeting.messages},
            
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                alert("Appuntamento salvato!")
            })
            .catch((err) => {
                alert("Impossibile salvare l'appuntamento")
            }) 
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

            <WrapperBox header="Calendario">
                <Calendar />
            </WrapperBox>

        </Grid>
    </Grid>
     
    )
}

export default AddMeetingPage