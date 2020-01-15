import React, { useState, useEffect } from "react";
import SearchableClientList from "./SeachableClientsList"
import Grid from '@material-ui/core/Grid';
import Iframe from 'react-iframe'

function UserHome(props) {

    const selectClient = (client) => {
        console.log(client)
    }

    return (

        <Grid container spacing={3}>
            <Grid item sm={4}>
                <div style={{ margin: 20, width: "100%" }}>
                    <SearchableClientList onSelectedClient={(e) => selectClient(e)} />
                </div>
            </Grid>

            <Grid item sm={8} >
                <div style={{ margin: 20, width:"100%", height:"100%" }}>
                    <Iframe url="https://calendar.google.com/calendar/embed?src=69bmadou0na9n1oopvq0d9ebm4%40group.calendar.google.com&ctz=Europe%2FRome"
                        width="80%"
                        height="100%"
                        id="myId"
                        className="myClassname"
                        display="initial"
                        position="relative" />
                </div>
            </Grid>
        </Grid>
    )
}

export default UserHome