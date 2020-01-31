import React, { useState, useEffect } from "react";
import Calendar from "./user/Calendar"

function FullCalendar(props) {
    return (
        <div style={{
            padding: 20,
            height: "auto",
            display: "flex",
            width: "auto",
            justifyContent: "center"
        }}>

            < Calendar />

        </div>
    )
}

export default FullCalendar