import React, { useState, useEffect } from "react";
import SearchableClientList from "../client/SeachableClientsList"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import ClientPersonalData from "../client/ClientPersonalData"
import ClientContacts from "../client/ClientContacts"
import WrapperBox from "../../shared/WrapperBox"
import ClientMeetings from "../client/ClientMeetings"

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


function CustomersPage(props) {
    const classes = useStyles();

    const [id, setId] = useState()


    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={3}>
                <Grid item md={4} >

                    <Paper className={classes.paper}>
                        <SearchableClientList addClient={true}
                            onSelectedClient={(e) => setId(e)} />
                    </Paper>

                </Grid>

                {
                    (id) ?
                        <Grid item md={8} >

                            <Grid container spacing={1} >

                                <Grid item xs={12} sm={6} >
                                    <ClientPersonalData id={id} />
                                    <ClientContacts id={id} />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <WrapperBox header="Appuntamenti">
                                        <ClientMeetings  id={id}/>
                                    </WrapperBox>
                                </Grid>


                            </Grid>

                        </Grid>
                        : null
                }

            </Grid>
        </div>
    )
}

export default CustomersPage