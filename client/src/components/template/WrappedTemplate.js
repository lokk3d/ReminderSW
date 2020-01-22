import React, { useState, useEffect } from "react";
import WrapperBox from "../WrapperBox"
import Template from "./Template";


function WrappedTemplate(props) {

    const templateInfoText= "Gestisci quì i template per i messaggi. Tutti i template che salvi, potrai utilizzarli quando dovrai inviare un messaggio.\n"+
    "Potrai inoltre utilizzarli per inserire velocemente le descrizioni degli incontri con i clienti!"

    return (
        <WrapperBox header="I miei template" info={templateInfoText} >
            <Template />
        </WrapperBox >
    )
}

export default WrappedTemplate