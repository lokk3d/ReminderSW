import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import Cookies from 'universal-cookie';
import '../../App.css'
import listPlugin from '@fullcalendar/list';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Calendar(props) {

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const minimal = props.minimal || false
    
    const [client, setClient] = useState({})
    const [detailedMeeting, setDetailedMeeting] = useState({})
    const [events, setEvents] = useState([])
    const [formattedEvents, setFormattedEvents] = useState([])

    useEffect(() => {
        axios.get("/api/meeting/",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setEvents(response.data)
            })
            .catch((err) => {
            })
    }, [])


    useEffect(() => {
        console.log(events);
        events.forEach(event => {
            setFormattedEvents(prev => [...prev, {
                id: event._id,
                title: event.clientName,
                start: event.date,
                description: event.description
            }])
        })
    }, [events])


    const eventClickHandler = (e) => {
        setClient({...client, name: e.event._def.title})

        axios.get('/api/meeting/'+ e.event._def.publicId,
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            console.log(res)
            setDetailedMeeting(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
        handleClickOpen()
    }

    useEffect(()=>{
        console.log(client);
    },[client])


    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //TODO: Aggiungi il populate al meeting, così non devo fare un'altra chiamata inutile
    return (
        <div style={{ padding: 10, width:"100%" }}>

            <FullCalendar
                defaultView={minimal?"listDay":"dayGridMonth"}
                plugins={[dayGridPlugin, listPlugin]}
                events={formattedEvents}

                header={(minimal)?{
                    left: 'prev,next',
                    center: 'title',
                    right:""
                }:
                {
                    left: 'prev,next',
                    center: 'title',
                    right: 'dayGridDay,dayGridWeek,dayGridMonth,listWeek'
                }}
                height={
                    (minimal)?"auto":"parent"
                }

                eventClick={eventClickHandler}
            />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{
                "Appuntamento con " + client.name }</DialogTitle>
                <DialogContent>
                <p>Data: {
                    detailedMeeting.date
                }</p>
                <p>{"Dettagli: " + detailedMeeting.description || ""}</p>

                </DialogContent>
                <DialogActions>
                    
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Modifica
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Calendar