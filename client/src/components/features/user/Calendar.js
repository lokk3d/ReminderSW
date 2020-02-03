import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import axios from "axios";
import Cookies from 'universal-cookie';
import '../../../App.css'
import listPlugin from '@fullcalendar/list';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


function dateToYYYYMMDDhhmm(date) {
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + '/' +
        pad(date.getMonth() + 1) + '/' +
        pad(date.getDate()) + ' ' +
        pad(date.getHours()) + ':' +
        pad(date.getMinutes())
}

function Calendar(props) {

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const minimal = props.minimal || false
    
    const [client, setClient] = useState({})
    const [detailedMeeting, setDetailedMeeting] = useState({})
    const [events, setEvents] = useState([])
    const [formattedEvents, setFormattedEvents] = useState([])

    const [formattedDate, setFormattedDate] = useState("")

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
            setDetailedMeeting(res.data)

            let date = new Date(res.data.date)
            setFormattedDate(dateToYYYYMMDDhhmm(date))
          })
          .catch((err) => {
            console.log(err)
          })
        handleClickOpen()
    }

 

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //TODO: Aggiungi il populate al meeting, così non devo fare un'altra chiamata inutile
    return (
        <div style={{  height:"auto"}}>

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
                <p>Data: { formattedDate }</p>
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