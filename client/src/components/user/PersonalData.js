import React, { useState, useEffect } from "react";
import WrapperBox from "../WrapperBox";
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';
import axios from "axios"
import EditableInput from "../EditableInput";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import CustomEditText from "../CustomEditText"


const useStyles = makeStyles(theme => ({
    row: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent :"center",
        flexDirection: "column"
      }
  }));

function PersonalData(props) {
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [personalData, setPersonalData] = useState({ firstName: "", lastName: "", email: "", fiscalCode:"" })
    const [render, setRender] = useState(0)

    useEffect(() => {
        axios.get("/api/user/",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setPersonalData(response.data)
            })
            .catch((err) => {

            })

    }, [render])

    useEffect(()=>{
        console.log("Dati personali: ")
        console.log(personalData)
    }, [personalData])


    const logout = () => {
        cookies.remove("dateReminder-AuthToken")
        window.location = "/";
    }

    const save = () => {
        console.log("Update...")
        axios.post("/api/user/update",
            {firstName: personalData.firstName, lastName: personalData.lastName, fiscalCode: personalData.fiscalCode},
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                //window.location="/user"
                alert("Dati personali salvati...")
                setRender(prev => prev+1)
            })
            .catch((err) => {
                alert("Errore nel salvataggio dei dati")

            })
    }

    return (
        <WrapperBox header="Dati personali" minWidth={props.minWidth}>
            <div style={{ padding: 10 }}>
                <div><b>Anagrafica</b></div>

                <div className={classes.row}>
                    <div style={{marginRight:10}}>Nome:</div>
                    <CustomEditText
                    type="text"
                    value={personalData.firstName}
                    onSave={e => { setPersonalData({...personalData, firstName:e});}}
                    />
                   
                </div>

                <div className={classes.row}>
                    <div style={{marginRight:10}}>Cognome:</div>
                    <CustomEditText
                    type="text"
                    value={personalData.lastName}
                    onSave={e => { setPersonalData({...personalData, lastName:e}); }}
                    />
                </div>

                <div className={classes.row}>
                    <div style={{marginRight:10}}>CF:</div>
                    <CustomEditText
                    type="text"
                    value={personalData.fiscalCode}
                    onSave={e => { setPersonalData({...personalData, fiscalCode:e}); }}
                    />
                </div>
     
                <p>Email: {personalData.email}</p>
                <Button onClick={save}  variant="contained" color="primary">Salva</Button>
                <Button onClick={logout} style={{marginLeft:30}}>Logout...</Button>
            </div>
        </WrapperBox>
    )
}


export default PersonalData