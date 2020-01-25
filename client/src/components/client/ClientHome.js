import React, { useState, useEffect } from "react";
import ClientPersonalData from "./ClientPersonalData"
import ClientContacts from "./ClientContacts"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

    const updateClient = () => {
        setRender(prev => prev + 1)
    }

    useEffect(() => {
        if (typeof id !== "undefined") {
            axios.get("/api/client/" + id,
                { headers: { authorization: "Bearer " + token } })
                .then((response) => {
                    setCurrentClient({ client: response.data, updateClient: updateClient })
                })
                .catch((err) => {

                })

        }

    }, [render])

    useEffect(() => {
        console.log(currentClient)
    }, [currentClient])

    return (
        <Grid container spacing={10} >

            <ClientContext.Provider value={currentClient}>

                <Grid item xs={12} sm={6} >
                    <ClientPersonalData id={id}/>
                    <ClientContacts />

                </Grid>
                <Grid item xs={12} sm={6}>
                    <WrapperBox header="Appuntamenti">
                        <MyMeetings />
                    </WrapperBox>
                </Grid>

            </ClientContext.Provider>

        </Grid>
    )
}

export default ClientHome
export { ClientContext }
