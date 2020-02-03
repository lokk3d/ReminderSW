import React, { useState, useEffect } from "react";
import Calendar from "../user/Calendar"

function CalendarPage(props) {
    return (
        <div style={{
            padding: 5,
            display: "flex",
            height:"80%",
            justifyContent: "center",
            backgroundColor:"#fff",
            borderRadius:"5px",
            margin:20
        }}>

            < Calendar />

        </div>
    )
}

export default CalendarPage