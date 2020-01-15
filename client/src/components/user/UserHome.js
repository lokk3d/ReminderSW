import React from "react";
import SearchableClientList from "./SeachableClientsList"
import Grid from '@material-ui/core/Grid';
import ReminderList from './ReminderList';

function UserHome(props) {

    const selectClient = (client) => {
        console.log(client)
    }

    return (

        <Grid container spacing={3} >
            <Grid item  sm={6} style={{width:"100%"}}>
                <div style={{ margin: 20 }}>
                    <SearchableClientList onSelectedClient={(e) => selectClient(e)} />
                </div>
            </Grid>

            <Grid item  sm={6} style={{width:"100%"}}>
            <ReminderList />

            </Grid>
        </Grid>
    )
}

export default UserHome