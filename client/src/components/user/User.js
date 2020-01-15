import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import SessionBox from './SessionBox';
import PersonalData from './PersonalData';
import WrappedTemplate from '../template/WrappedTemplate';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    box: {
        minWidth: 200,
        padding: 10,
        boxShadow: "0px 0px 5px #dbdbdb",
        maxWidth: 400,
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15
    },
    spacing: {
        padding: 10,
        margin: 10
    },
    text: {
        marginLeft: 10,
        color: "#6e6e6e"
    },
    sessionButton: {
        width: '80%',
        marginLeft: "auto",
        marginRight: "auto",
        display: "block"
    }
}));


function User(props) {
    const classes = useStyles();
    const theme = useTheme();
    let history = useHistory();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    if (token === undefined) {
        history.push("/");

    }

    return (
        <div style={{ marginBottom: 30 }}>
            <Grid container spacing={5}>
                <Grid item lg={4} style={{ width: "100%" }}>
                    <PersonalData />
                </Grid>

                <Grid item lg={4} style={{ width: "100%" }}>
                    <WrappedTemplate />
                </Grid>

                <Grid item lg={4} style={{ width: "100%" }}>
                    <SessionBox />
                </Grid>

            </Grid>
        </div>
    );
}

export default User;
