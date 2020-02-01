import React, {useState, useEffect} from "react";

function formatDate(date){
    return(
        current_datetime.getFullYear() + "/" +
        (current_datetime.getMonth() + 1) + "/" + 
        current_datetime.getDate() + " " + 
        
        current_datetime.getHours() + ":" + 
        current_datetime.getMinutes()
    )
}

function MessageBox(props){

    let message = props.message || {client:{}, contacts:{}}
    let formattedDate = formatDate(message.date)

    useEffect(()=>{
        message = props.message || {client:{}, contacts:{}}
        formattedDate = formatDate(message.date)
    },[props])

    return(
        <div>
            <h3>Destinatario:{message.client.firstName + " " + message.client.lastName }</h3>
            <p>{message.description}</p>
            <p>Inviare il:{formattedDate}</p>
            <hr />
            <div>
                {
                    (message.contacts.whatsapp) ?
                    <div>
                        {"Whatsapp:" + message.contacts.whatsapp.active }<br/>
                        {"\tInviare:" + message.contacts.whatsapp.sent }<br/>
                        {"\tCodice:" + message.contacts.whatsapp.statusCode }

                    </div>
                    : null
                }
            </div>
        </div>
    )
}

export default MessageBox