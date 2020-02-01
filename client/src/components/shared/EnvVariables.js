import React, {useState, useEffect} from "react";
import { ListItem } from "@material-ui/core";
import axios from "axios"
import {
    Chip
} from '@material-ui/core';

function EnvVariables(props){

    const [env, setEnv] = useState([])
    const [envList, setEnvList] = useState()

    useEffect(()=>{
        axios.get('/api/envTag/')
          .then((res) => {
            setEnv(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[])

    useEffect(()=>{
        setEnvList(
            env.map(item => {
                return (
                    <Chip
                        key={item._id}
                        style={{margin:3, padding:2}}
                        label={item.name}
                        clickable
                        size="small"
                        color="secondary"
                        onClick={(e)=>{
                            if(typeof props.onClick !== "undefined"){
                                props.onClick(item)
                            }
                        }}
                    />
                )
            })
        )
    },[env])

    return(
        <div style={{padding:10}}>
            {envList}
        </div>
    )
}

export default EnvVariables