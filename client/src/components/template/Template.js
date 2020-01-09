import React, {useState, useEffect} from "react";
import { List, ListItem } from "@material-ui/core";
import axios from "axios";
import Cookies from 'universal-cookie';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Paper, FormControlLabel } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
    },
    col: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));


function Template(props){
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [templateList, setTemplateList] = useState([]);
    const [templates, setTemplates] = useState(); 

    const [open, setOpen] = React.useState(false);
    const [newTemplate, setNewTemplate] = useState("");

    const [render, setRender] = useState(0);
    
    useEffect(()=>{
        axios.get('/api/user/templates',
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
              console.log("Cose");
              console.log(res.data);
            setTemplateList(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    }, [render])

    useEffect(()=>{
       
        if(typeof templateList !== "undefined"){
            let myTemplates = []
            for(let i = 0; i < templateList.length; i++){
                myTemplates[i] = {index: i, text: templateList[i]}
            }
            console.log(myTemplates)

            setTemplates(myTemplates.map(template=>{
                
                console.log(template.index + " " + template.text);
                return(
                    <ListItem key={template.index}>
                        <div className={classes.row} style={{width:"100%",justifyContent:"space-between"}}>
                            <div>{template.text}</div>
                            <CloseIcon 
                            onClick={()=>deleteTemplate(template.index)}/>
                        </div>
                    </ListItem>
                )
            }))
        }
       
    },[templateList])

    const deleteTemplate = (index) => {
        axios.post('/api/user/templates/delete',
        {index: index},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setRender(prev => prev+1)
          })
          .catch((err) => {
            console.log(err)
          })
    }

    const saveTemplate = () => {
        axios.post('/api/user/templates/add',
        {template: newTemplate},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            setOpen(false)
            setNewTemplate("")
            setRender(prev => prev+1)
          })
          .catch((err) => {
            console.log(err)
          })
    }

 

    return(
        <div>
            { (templateList.length === 0) ?
                <div style={{display: "flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
                    <AddCircleOutlineIcon style={{margin:10}}/>
                    <p>Aggiungi il tuo primo template</p>
                </div>
                :
            <List>
                {templates}
            </List>
            }

            <Button 
            color="primary"                 
            variant="contained"
            style={{width:"100%"}}
            onClick={()=>{setOpen(true)}}
            >Aggiungi nuovo template</Button>

            <Dialog
                open={open}
                onClose={()=>{setOpen(false)}}
            >
                <DialogTitle id="alert-dialog-title">{"Aggiungi nuovo template"}</DialogTitle>
                <DialogContent>

                <TextField label="Testo del template"
                value={newTemplate}
                onChange={(e)=>setNewTemplate(e.target.value)}
                style={{width:"100%"}} />

                </DialogContent>
                <DialogActions>
                <Button onClick={()=>{setOpen(false)}} color="primary">
                    Annulla
                </Button>
                <Button onClick={saveTemplate} color="primary" autoFocus>
                    Salva
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Template