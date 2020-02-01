import React, { useState, useEffect, useContext } from "react";
import { Button, List, ListItem } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomAddMeeting from "../meeting/CustomAddMeeting";
import axios from "axios";
import Cookies from 'universal-cookie';
import ShowMeeting from "../meeting/ShowMeeting";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { ClientContext } from "../pages/ClientPage"
import { useHistory } from 'react-router-dom';

function MyMeetings(props) {
    const currentClient = useContext(ClientContext)
    let history = useHistory();

    const [dialog, setDialog] = useState(false);
    const [clientData, setClientData] = useState();
    const [newMeeting, setNewMeeting] = useState()

    const [meetings, setMeetings] = useState([])
    const [meetingList, setMeetingList] = useState()

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')
    const [render, setRender] = useState(0)

    useEffect(()=>{
        if(typeof currentClient !== "undefined" ){
            console.log(currentClient);
            setClientData({ id: currentClient.client._id, fiscalCode: currentClient.client.fiscalCode })
            
            if(typeof currentClient.meetings !== "undefined"){
                setMeetings(currentClient.client.meetings)
            }
        }
       },[currentClient])


       useEffect(()=>{
           console.log(clientData);
       },[clientData])


    const addNewMeeting = ()=>{
        const id = currentClient.client._id || ""
        history.push("/addMeeting/"+ id);
    }


    useEffect(()=>{
        
        if(typeof meetings !== "undefined"){

            setMeetingList(meetings.map(item=>{
                console.log(item)
                return (
                    <ListItem key={item._id}>
                        <ShowMeeting item={item} clientId={clientData.id}></ShowMeeting>
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
            {
                (meetings.length === 0) ?
                <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <AddCircleOutlineIcon style={{margin:10}}/>
                    <p>Aggiungi il tuo primo appuntamento</p>
                </div>
                :
                <List>
                    {meetingList}
                </List>
            }
            
            <Button
                variant="contained"
                color="primary"
                style={{ width: "100%" }}
                onClick={() => {addNewMeeting()}}>Aggiungi nuovo appuntamento</Button>

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