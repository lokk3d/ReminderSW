import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button, List, ListItem,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Typography,
    Paper
} from '@material-ui/core';
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditableTextField from "./EditableTextField"
import EnvVariables from "./EnvVariables";
import Message from "./meeting/Message";
import Cookies from 'universal-cookie';
import Meeting from "./meeting/Meeting";
import WrapperBox from "./WrapperBox";

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

function Test(props) {
    const classes = useStyles();


    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [templateList, setTemplateList] = useState([]);

    useEffect(() => {
        axios.get('/api/user/templates',
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setTemplateList(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
            maxWidth: "40%",
            padding: 20
        }}>

            <WrapperBox header="Aggiungi appuntamento">
                <div style={{margin:10}}>
                <Meeting
                    client={{ firstName: "Alf", lastName: "Gra", id: 122352516 }}
                />
                </div>
                <div style={{display:"flex", justifyContent:"flex-end"}}>
                <Button style={{margin:10}}>Annulla</Button>
                <Button color="primary" variant="contained" style={{margin:10}}>Salva</Button>

                </div>
            </WrapperBox>


        </div>
    )
}

export default Test