import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import {
    Button, List, ListItem
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import WrapperBox from "../WrapperBox";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Cookies from 'universal-cookie';
import axios from "axios"

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    box: {
        padding: 10,
        width: "100%"
    }
}));


function CustomField(props) {
    const classes = useStyles();

    const [fields, setFields] = useState([])
    const [fieldList, setFieldList] = useState()
    const [render, setRender] = useState(0)

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    useEffect(()=>{
        axios.get('/api/user/customFields',
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setFields(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[render])

    const defaultCustomFieldInfoText = "Testo da definire..."

    //TODO: Crea i custom field!

    useEffect(() => {
        setFieldList(
            fields.map(item => {
                return (
                    <ListItem key={item._id} style={{ padding: 2 }}>
                        <div
                            style={{ paddingLeft: 10, backgroundColor: "#f0f0f0", borderRadius: 5 }}>
                            
                        </div>
                        <div style={{ marginLeft: 10 }}></div>

                       
                        <div style={{ marginLeft: 0 }}></div>
                        <IconButton onClick={() => deleteField(item._id)} style={{ padding: 0 }}>
                            <DeleteForeverIcon />
                        </IconButton>
                    </ListItem >
                )
            })
        )
    }, [fields])


    const addField = () => {
      
        setFields([...fields, { key: "", value: "", id: Date.now() }])
    }

    const deleteField = (id) => {
        axios.delete('/api/user/customFields/delete', {_id:id},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setFields(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return (
        <WrapperBox header="Campi personalizzati di default" info={defaultCustomFieldInfoText}>
            <div style={{ padding: 10 }}>
            {(fields.length === 0) ?
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <AddCircleOutlineIcon style={{ margin: 10 }} />
                    <p>Aggiungi i campi personalizzati</p>
                </div>
                :
                <List>
                    {fieldList}
                </List>
            }
                
                <Button color="primary" variant="contained"
                    onClick={() => { addField() }}
                    style={{ width: "80%", display: "block", marginLeft: "auto", marginRight: "auto" }}>Aggiungi campo personalizzato</Button>

            </div>
        </WrapperBox>
    )

}

export default CustomField