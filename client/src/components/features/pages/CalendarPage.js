import React, { useState, useEffect } from "react";
import Calendar from "../user/Calendar"

function CalendarPage(props) {
    return (
        <div style={{
            padding: 5,
            height: "auto",
            display: "flex",
            width: "auto",
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