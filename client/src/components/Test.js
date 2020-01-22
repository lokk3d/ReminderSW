import React, { useState, useEffect } from "react";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
    Button, List, ListItem,
    ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails,
    Typography
} from '@material-ui/core';
import axios from "axios";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditableTextField from "./EditableTextField"
import EnvVariables from "./EnvVariables";

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

    const [text, setText] = useState("")
   
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 100,
            maxWidth: "40%",
            padding:20
        }}>
          

          <textarea style={{margin:20}}
          value={text}
          onChange={(e)=>{setText(e.target.value)}}
          />
          <EnvVariables onClick={(e) =>{
              console.log(e)
              setText(prev => prev + e.variable + " " )}}/>

        </div>
    )
}

export default Test