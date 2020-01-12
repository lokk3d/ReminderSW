import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button, List, ListItem,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Cookies from 'universal-cookie';


const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));

function Codes(props) {
    const classes = useStyles();

    const [responseCodes, setResponseCodes] = useState([]);
    const [responseCodesList, setResponseCodesList] = useState();


    const [errorCodes, setErrorCodes] = useState([]);
    const [errorCodesList, setErrorCodesList] = useState();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    useEffect(() => {
        axios.get('/api/codes/success',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setResponseCodes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get('/api/codes/errors',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setErrorCodes(res.data)
            })
            .catch((err) => {
                console.log(err)
            })

    }, [])

    useEffect(() => {
        setResponseCodesList(
            responseCodes.map(item => {
                return (
                    <ListItem key={item._id}  >
                        <ExpansionPanel style={{ width: "100%" }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    className={classes.heading}>
                                    {"(#" + item.code + ") " + item.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {item.message}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </ListItem >
                )
            })
        )
    }, [responseCodes])


    useEffect(() => {
        setErrorCodesList(
            errorCodes.map(item => {
                return (
                    <ListItem key={item._id}  >
                        <ExpansionPanel style={{ width: "100%" }}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography
                                    className={classes.heading}>
                                    {"(#" + item.code + ") " + item.name}
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {item.message}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>

                    </ListItem >
                )
            })
        )
    }, [errorCodes])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100
        }}>
            <h2 style={{ margin: 20 }}>Codici di risposta</h2>

            <ExpansionPanel style={{width:"40%"}}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        className={classes.heading}>
                        {"Codici d'errore"}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                    {errorCodesList}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel style={{width:"40%"}}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography
                        className={classes.heading}>
                        {"Codici di conferma"}
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {responseCodesList}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </div>
    )
}

export default Codes