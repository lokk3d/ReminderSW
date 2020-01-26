import React, {useState, useEffect} from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import Cookies from 'universal-cookie';
import axios from "axios"

const useStyles = makeStyles(theme => ({
    row:{
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
    }

  }));

function UserCard(props){
    const classes = useStyles();
    let history = useHistory();
    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken');

    const [username, setUsername] = useState("");
    const [render, setRender] = useState(0);

    useEffect(()=> {
        axios.get("/api/user/",
        { headers: { authorization: "Bearer " + token } })
        .then((response) => {
            setUsername(response.data.firstName + " " + response.data.lastName)
        })
        .catch((err) => {

        })
    }, [render])


    return(
        <div className={classes.row}
        style={{padding:10}}>
            <AccountCircleIcon fontSize={"large"}/>
            <h3>
                {username}
            </h3>
                <Button color={"primary"}
                onClick={()=>{
                    history.push("/user");

                }}
                >Edit profile</Button>
        </div>
    )
}

export default UserCard