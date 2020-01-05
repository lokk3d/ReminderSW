import React, {useState, useEffect} from "react";
import SearchableClientList from "./SeachableClientsList"
import Grid from '@material-ui/core/Grid';


function UserHome(props){

    const selectClient = (client) => {
        console.log(client)
    }

    return (
        
        <Grid container spacing={1}>
        <Grid item sm={4}>
            <div style={{margin:20, width:"100%"}}>
                <SearchableClientList onSelectedClient={(e) => selectClient(e)} />
            </div>
        </Grid>

        <Grid item  sm={4} >
           
        </Grid>

        <Grid item  sm={4}>
          
        </Grid>
       
    </Grid>
    )
}

export default UserHome