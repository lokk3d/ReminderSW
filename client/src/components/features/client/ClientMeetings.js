import React, {useState, useEffect} from "react";
import Cookies from 'universal-cookie';
import axios from "axios";
import ShowMeeting from "../meeting/ShowMeeting"
import Paper from '@material-ui/core/Paper';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

function ClientMeetings(props){
    let id = props.id;
    const [meetings, setMeetings] = useState([])
    const [render, setRender] = useState(0)
    let history = useHistory();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    useEffect(()=>{
        id = props.id
        if(typeof id !== "undefined"){
            axios.post('/api/meeting/getMeetingsByClient',
            {client:id},
            { headers: { authorization: "Bearer " + token } })
              .then((res) => {
                console.log(res.data);
                setMeetings(res.data)
              })
              .catch((err) => {
                console.log(err)
              })
        } 
    },[props, render])

    return(
        <div>
            <div style={{maxHeight:400}}>
            {
                (meetings.length === 0) ? 
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                        <AddCircleOutlineIcon style={{ margin: 10 }} />
                        <p>Non hai appuntamenti con questo cliente...</p>
                    </div> 
                : 
                meetings.map((item)=>{
                    return(
                        <ShowMeeting key={item._id} item={item} onDeleteItem={(item) => setRender(prev => prev+1)}/>
                    )
                })
            }
            </div>
                <Button onClick={()=>{history.push("/addMeeting/"+id)}}
                variant="contained"
                color="primary"
                style={{display:"block",margin:10, marginLeft:"auto", marginRight:"auto"}}
                >Aggiungi appuntamento</Button>

        </div>
    )
}

export default ClientMeetings