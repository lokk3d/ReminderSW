import React, { useState, useEffect } from "react";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

function MessageList(props) {
    let messages = props.messages || []
    let variant = props.variant || "all"

    let emptyMessageList = []
    emptyMessageList["all"] = "Non hai messaggi"
    emptyMessageList["sent"] = "Non hai messaggi inviati"
    emptyMessageList["error"] = "Non ci sono errori nell'invio dei messaggi"
    emptyMessageList["pending"] = "Non hai messaggi in attesa di essere inviati"

    const [filteredMessages, setFilteredMessages] = useState([])

    useEffect(() => {
        messages = props.messages || []
        variant = props.variant || "all"

        console.log(messages);
        console.log(variant);

        filterMessages()
    }, [props])


    const filterMessages = () => {
        switch (variant) {
            case "all":
                setFilteredMessages(messages)
                break;

            case "sent":
                setFilteredMessages(messages)
                break;

            case "error":
                setFilteredMessages(messages)
                break;

            case "pending":
                setFilteredMessages(messages)
                break;


            default:
                setFilteredMessages(messages)
                break;
        }
    }

    useEffect(()=>{
       console.log(filteredMessages); 
    },[filteredMessages])

    return (
        <div>
            <div>{"Debug:  " + variant}</div>
            <div>{JSON.stringify(messages)}</div>
            {
                (filteredMessages.length === 0) ?
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AddCircleOutlineIcon style={{ margin: 10 }} />
                        <p>{emptyMessageList[props.variant]}</p>
                    </div> : null
               
            }
        </div>
    )
}

export default MessageList