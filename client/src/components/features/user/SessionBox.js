import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import Cookies from 'universal-cookie';
import { useTheme } from '@material-ui/core/styles';
import EmailSession from "./sessions/EmailSession";
import WhatsappSession from "./sessions/WhatsappSession";

import WrapperBox from '../../shared/WrapperBox';

require("dotenv").config();


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


function SessionBox(props) {
    const classes = useStyles();
    const theme = useTheme();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')


    return (
        <WrapperBox header="Sessioni" minWidth={props.minWidth}>
            <EmailSession />
            <WhatsappSession />
            <p style={{ padding: 20 }}>A breve verranno implementate anche le sessioni per:
                <ul>
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>SMS</li>

                </ul>
            </p>


        </WrapperBox>
    );
}

export default SessionBox;
