import React, {useState, useEffect} from "react"; 
import WrapperBox from "../shared/WrapperBox";
import { ListItem, ListItemIcon, ListItemText, List, Button } from '@material-ui/core';

import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';


function ReminderList(props){

    const [reminder, setReminder] = useState()
    const [reminderList, setReminderList] = useState()
    const [render, setRender] = useState(0)

    useEffect(()=>{
        console.log("Renderizzo...")
        //fake api
        const reminder = [
            {id:"1234", clientName:"Giangiacomo Poretti", date:"12/12/2020_10:15", reminders:{whatsapp:true, instagram:true, facebook:true, sms:true,email:true}},
            {id:"1234", clientName:"Guglielmo DeTuNonna", date:"12/6/2020_11:35", reminders:{whatsapp:false, instagram:true, facebook:true, sms:true,email:true}},
            {id:"1234", clientName:"Giangiacomo Poretti", date:"22/3/2020_15:50", reminders:{whatsapp:true, instagram:false, facebook:false, sms:true,email:true}},
            {id:"1234", clientName:"5m646m4g54", date:"11/17/2020_20:10", reminders:{whatsapp:false, instagram:true, facebook:false, sms:false,email:false}},
        ]

        setReminderList(reminder.map(item =>{
            return(
                <ListItem button>
                    <ListItemText primary={item.clientName} secondary={item.date}/>
                    
                    <ListItemIcon>
                    {item.reminders.whatsapp?<WhatsAppIcon/>:<div/>}
                    {item.reminders.instagram?<InstagramIcon/>:<div/>}
                    {item.reminders.facebook?<FacebookIcon/>:<div/>}
                    {item.reminders.email?<EmailIcon/>:<div/>}
                    {item.reminders.sms?<SmsIcon/>:<div/>}
                    </ListItemIcon>
              </ListItem>
            )
        }))
    }, [render])

    return (
        <WrapperBox header="I miei reminder [Demo]" minWidth={props.minWidth}>
            <List>
                {reminderList}
            </List>
            <Button variant="contained" color="primary" style={{width:'100%', marginTop:20}}>Aggiungi reminder</Button>

        </WrapperBox>
    )
}


export default ReminderList