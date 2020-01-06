import React, { useState, useEffect } from "react";
import { Button, List, ListItem } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomAddMeeting from "../meeting/CustomAddMeeting";
import axios from "axios";
import Cookies from 'universal-cookie';
import ShowMeeting from "../meeting/ShowMeeting";

function MyMeetings(props) {

    const [dialog, setDialog] = useState(false);
    const [clientData, setClientData] = useState();
    const [newMeeting, setNewMeeting] = useState()

    const [meetings, setMeetings] = useState()
    const [meetingList, setMeetingList] = useState()

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const [render, setRender] = useState(0)

    useEffect(() => {
        if (typeof props.id !== "undefined") {
            axios.post('/api/client/getbyid',
            { id: props.id },
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setClientData({ id: props.id, fiscalCode: res.data.fiscalCode })
            })
            .catch((err) => {
                console.log(err)
            })


            axios.post('/api/meeting/getMeetingsByClient',
            {client: props.id},
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                //console.log("Meetings: ")
                //console.log(res.data)
                setMeetings(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }


     
    }, [render])


    useEffect(()=>{
        if(typeof meetings !== "undefined"){
            setMeetingList(meetings.map(item=>{
                console.log(item)
                return (
                    <ListItem key={item._id}>
                        <ShowMeeting item={item} clientId={props.id}></ShowMeeting>
                    </ListItem>
                )
            }))
        }
       
    },[meetings])

    const saveMeeting = () => {
        console.log(newMeeting)
        axios.post('/api/meeting/add',
            newMeeting,
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                alert(res.data)
                //console.log(res)
                setDialog(false)
                setRender(prev => prev+1)
            })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <div style={{
            boxShadow: "2px 2px 5px #d4d4d4"
        }}>
            <List>
                {meetingList}
            </List>
            <Button
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
                onClick={() => setDialog(true)}>Aggiungi nuovo meeting</Button>

            <Dialog
                open={dialog}
                onClose={() => setDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Add new meeting"}</DialogTitle>
                <DialogContent>
                    <CustomAddMeeting
                        currentClient={clientData}
                        onChange={(e) => setNewMeeting(e)}
                    ></CustomAddMeeting>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={saveMeeting} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    )
}

export default MyMeetings