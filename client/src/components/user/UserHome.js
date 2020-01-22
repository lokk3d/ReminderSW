import React from "react";
import SearchableClientList from "./SeachableClientsList"
import Grid from '@material-ui/core/Grid';
import ReminderList from './ReminderList';
import Iframe from 'react-iframe'

function UserHome(props) {

    const selectClient = (client) => {
        console.log(client)
    }

    return (

        <Grid container spacing={3} >
            <Grid item sm={6} style={{ width: "100%" }}>
                <div style={{ margin: 20 }}>
                    <SearchableClientList onSelectedClient={(e) => selectClient(e)} />
                </div>
            </Grid>

            <Grid item sm={6} style={{ width: "100%" }}>
                <Iframe url="https://calendar.google.com/calendar/embed?src=or3867gn2smtupqjuatdd7r030%40group.calendar.google.com&ctz=Europe%2FRome"
                    width="450px"
                    height="450px"
                    id="myId"
                    className="myClassname"
                    display="initial"
                    position="relative" />
               
                <ReminderList />

            </Grid>
        </Grid>
    )
}

export default UserHome