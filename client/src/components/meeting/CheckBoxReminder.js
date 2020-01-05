import React, {useState, useEffect} from "react";
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckboxReminder from "../meeting/CheckBoxReminder"
import SmsIcon from '@material-ui/icons/Sms';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Paper, FormControlLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));


function CheckBoxReminder(props){
    const classes = useStyles();

    const [contact, setContact] =useState({
        email: false,
        facebook: false,
        whatsapp: false,
        instagram: false,
        sms: false
    })

    if(typeof props.status !== "undefined"){
        setContact(props.status)
    }

    const handleContacts = name => event => {
        setContact({ ...contact, [name]: event.target.checked });
    };

    useEffect(()=> {
        console.log("Contacts triggered");
        props.onChange(contact)
    }, [contact])


    return(
        <div className={classes.row}>

            <div className={classes.row}  >
                <FormControlLabel
                style={{margin:5}}
                control={
                    <Checkbox
                        style={{padding:0}}
                        checked={contact.whatsapp}
                        onChange={handleContacts('whatsapp')}
                        color="primary"
                        value={true}
                    />
                }
                />
                <WhatsAppIcon />
            </div>

            <div className={classes.row} >
                <FormControlLabel
                style={{margin:5}}
                control={
                    <Checkbox
                        style={{padding:0}}
                        checked={contact.email}
                        onChange={handleContacts('email')}
                        color="primary"
                        value={true}
                    />
                }
                />
                <EmailIcon />
            </div>

            <div className={classes.row} >
                <FormControlLabel
                style={{margin:5}}
                control={
                    <Checkbox
                        style={{padding:0}}
                        checked={contact.facebook}
                        onChange={handleContacts('facebook')}
                        color="primary"
                        value={true}
                        disabled={true}
                    />
                }
                />
                <FacebookIcon />
            </div>

            <div className={classes.row}>
                <FormControlLabel
                style={{margin:5}}
                control={
                    <Checkbox
                        style={{padding:0}}
                        checked={contact.instagram}
                        onChange={handleContacts('instagram')}
                        color="primary"
                        value={true}
                        disabled={true}
                    />
                }
                />
                <InstagramIcon />
            </div>

            <div className={classes.row} >
                <FormControlLabel
                style={{margin:5}}
                control={
                    <Checkbox
                        style={{padding:0}}
                        checked={contact.sms}
                        onChange={handleContacts('sms')}
                        color="primary"
                        value={true}
                        disabled={true}
                    />
                }
                />
                <SmsIcon />
            </div>

        </div >
        

    )


}

export default CheckBoxReminder