import React, { useState, useEffect } from "react";
import WrapperBox from "../WrapperBox";
import { Button } from '@material-ui/core';
import Cookies from 'universal-cookie';
import axios from "axios"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CustomEditText from "../CustomEditText"
import { useHistory } from 'react-router-dom';


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
    ,
    fixedWidth: {
        width: 80
    },
    marginText: {
        marginRight: 10
    },
}));

function PersonalData(props) {
    const classes = useStyles();
    let history = useHistory();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [personalData, setPersonalData] = useState({ firstName: "", lastName: "", email: "", fiscalCode: "" })
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

    useEffect(() => {
        console.log("Dati personali: ")
        console.log(personalData)
    }, [personalData])


    const logout = () => {
        cookies.remove("dateReminder-AuthToken")
        window.location = "/"
    }


    const log = () => {
        history.push("/log")
    }

    const saveData = (e) => {
        console.log("Update...")
        axios.post("/api/user/update",
            { firstName: e.firstName, lastName: e.lastName, fiscalCode: e.fiscalCode },
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                alert("Dati personali salvati...")
                setRender(prev => prev + 1)
            })
            .catch((err) => {
                alert("Errore nel salvataggio dei dati")

            })
    }


    return (
        <WrapperBox header="Dati personali" >
            <div style={{ padding: 10 }}>
                <div><b>Anagrafica</b></div>

                <div className={classes.row}>
                    <div className={[classes.marginText, classes.fixedWidth].join(" ")}>Nome:</div>
                    <CustomEditText
                        type="text"
                        value={personalData.firstName}
                        onSave={e => saveData({ ...personalData, firstName: e })}
                    />

                </div>

                <div className={classes.row}>
                    <div className={[classes.marginText, classes.fixedWidth].join(" ")}>Cognome:</div>
                    <CustomEditText
                        type="text"
                        value={personalData.lastName}
                        onSave={e => saveData({ ...personalData, lastName: e })}
                    />
                </div>

                <div className={classes.row}>
                    <div  className={[classes.marginText, classes.fixedWidth].join(" ")}>C. Fiscale:</div>
                    <CustomEditText
                        type="text"
                        value={personalData.fiscalCode}
                        onSave={e => saveData({ ...personalData, fiscalCode: e })}
                    />
                </div>
                
                <div className={classes.row} style={{marginTop:20, marginBottom:20}}>
                    <div  className={[classes.marginText, classes.fixedWidth].join(" ")}>Email:</div>
                    <div>{personalData.email}</div>
                </div>

                <Button onClick={log} variant="outlined" color="secondary" style={{ marginLeft: 30 }} >LOG di sistema</Button>

                <Button onClick={logout} style={{ marginLeft: 30 }}>Logout...</Button>
            </div>
        </WrapperBox>
    )
}


export default PersonalData