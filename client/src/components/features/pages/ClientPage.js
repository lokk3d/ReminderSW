import React, { useState, useEffect } from "react";
import ClientPersonalData from "../client/ClientPersonalData"
import ClientContacts from "../client/ClientContacts"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import WrapperBox from "../../shared/WrapperBox"
import Cookies from 'universal-cookie';
import axios from "axios";
import ClientMeetings from "../client/ClientMeetings";

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


function ClientPage(props) {
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
                    <ClientContacts  id={id}/>

                </Grid>
                <Grid item xs={12} sm={6}>
                    <WrapperBox header="Appuntamenti">
                        <ClientMeetings  id={id}/>
                    </WrapperBox>
                </Grid>

            </ClientContext.Provider>

        </Grid>
    )
}

export default ClientPage
export { ClientContext }
