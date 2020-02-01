import React, { useState, useEffect } from "react";
import Cookies from 'universal-cookie';
import axios from "axios"
import { Paper } from "@material-ui/core";

function Log(props) {

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [logFile, setLogFile] = useState("")
    let finishedData = ""

    const setupLog = (data) => {
        const bgColor = ["#f0f0f0", "#f8f8f8"]
        let newData = data.split("\n")
        finishedData = ""

        for (let i = 0; i < newData.length; i++) {
            let string = "<div style='padding:5px;background-color:" + bgColor[i % 2] + ";'>"
            string += newData[i]
            string += "</div>"
            finishedData += string + ""
        }
        setLogFile(finishedData)
    }

    const getLogFile = () => {
        axios.get("/api/user/logFile",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setupLog(response.data)
            })
            .catch((err) => {

            })
    }

    useEffect(() => { getLogFile() }, [])

    setInterval(getLogFile, 5000)


    return (
        <div style={{ margin: 20 }}>
            <h3>Log di sistema</h3>
            <Paper style={{ padding: 10 }}>
                <div dangerouslySetInnerHTML={{ __html: logFile }} ></div>
            </Paper>
        </div>
    )
}

export default Log