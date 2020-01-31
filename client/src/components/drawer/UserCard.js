import React, { useState, useEffect } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { deepOrange, deepPurple } from '@material-ui/core/colors';

import Cookies from 'universal-cookie';
import axios from "axios"

const useStyles = makeStyles(theme => ({
    row: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
    },
    large: {
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
      },
      
  text:{
    textShadow: "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
  }

}));

function UserCard(props) {
    const classes = useStyles();
    let history = useHistory();
    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken');

    const [username, setUsername] = useState("");
    const [min, setMin] = useState("");
    const [email, setEmail] = useState("");

    const [render, setRender] = useState(0);

    useEffect(() => {
        axios.get("/api/user/",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setUsername(response.data.firstName )
                setEmail(response.data.email)

                setMin(response.data.firstName[0]+response.data.lastName[0])
            })
            .catch((err) => {

            })
    }, [render])


    return (
        <div className={classes.row}
            style={{ padding: 10 }}>
            <Avatar alt={username}
                className={[classes.large, classes.orange].join(" ")} >
                {min}
            </Avatar>

            <div style={{marginLeft:20}}>
                <h3 style={{margin:0}}  >
                    {username}
                </h3>
                <div  >{email}</div>
            </div>
           
        </div>
    )
}

export default UserCard