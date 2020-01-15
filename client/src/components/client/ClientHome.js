import React, { useState, useEffect } from "react";
import ClientPersonalData from "./ClientPersonalData"
import ClientContacts from "./ClientContacts"
import ClientMeetings from "./ClientMeetings"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import ClientReminders from "./ClientReminders";
import MyMeetings from "./MyMeetings";
import WrapperBox from "../WrapperBox"
import Cookies from 'universal-cookie';
import axios from "axios";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const ClientContext = React.createContext();


function ClientHome(props) {
    const id = props.match.params.id

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [currentClient, setCurrentClient] = useState()
    const [render, setRender] = useState(0)

    const updateClient = () =>{
        setRender(prev => prev+1)
    }
    
    useEffect(()=>{
        if(typeof id !== "undefined"){
            axios.get("/api/client/"+id,
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setCurrentClient({ client: response.data, updateClient: updateClient })
            })
            .catch((err) => {
        
            })
        
        }
       
    },[render])

    useEffect(()=>{
        console.log(currentClient)
    },[currentClient])

    return (
        <Grid container spacing={3}>

            <ClientContext.Provider value={currentClient}>

                <Grid item xs={12} sm={4}>
                    <ClientPersonalData />
                    <ClientContacts />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <WrapperBox header="Meetings">
                        <MyMeetings />
                    </WrapperBox>
                </Grid>
                <Grid item xs={12} sm={4}>
                </Grid>

            </ClientContext.Provider>

        </Grid>

    )
}

export default ClientHome
export {  ClientContext }
