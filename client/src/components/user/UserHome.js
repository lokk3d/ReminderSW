import React from "react";
import SearchableClientList from "./SeachableClientsList"
import Grid from '@material-ui/core/Grid';
import ReminderList from './ReminderList';
import Iframe from 'react-iframe'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
//import '../..//main.scss' // webpack must be configured to do this


function UserHome(props) {

    const selectClient = (client) => {
        console.log(client)
    }

    return (

        <Grid container spacing={3} >
            <Grid item sm={4} style={{ width: "100%" }}>
                <div style={{ margin: 20 }}>
                    <SearchableClientList onSelectedClient={(e) => selectClient(e)} />
                </div>
            </Grid>

            <Grid item sm={8} style={{ width: "100%" }}>
            <FullCalendar defaultView="dayGridMonth" plugins={[ dayGridPlugin ]} />

                <ReminderList />

            </Grid>
        </Grid>
    )
}

export default UserHome