import React, { useState, useEffect } from "react";
import { List, ListItem } from "@material-ui/core";
import axios from "axios";
import Cookies from 'universal-cookie';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Button, Paper, FormControlLabel, ListItemText } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import EnvVariables from "../../shared/EnvVariables";
import IconButton from '@material-ui/core/IconButton';


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


function Template(props) {
    const classes = useStyles();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const [templateList, setTemplateList] = useState([]);
    const [templates, setTemplates] = useState();

    const [open, setOpen] = React.useState(false);
    const [newTemplateName, setNewTemplateName] = useState();
    const [newTemplateDescription, setNewTemplateDescription] = useState();


    const [render, setRender] = useState(0);

    useEffect(() => {
        axios.get('/api/template',
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

    useEffect(() => {

        if (typeof templateList !== "undefined") {

            setTemplates(templateList.map(template => {

                return (
                    <ListItem key={template._id}>
                        <div className={classes.row} style={{ width: "100%", justifyContent: "space-between" }}>
                            <ListItemText primary={template.name} secondary={template.description} />

                            <IconButton onClick={() => deleteTemplate(template._id)}>
                                <CloseIcon />
                            </IconButton>

                        </div>
                    </ListItem>
                )
            }))
        }

    }, [templateList])

    const deleteTemplate = (_id) => {
        //deleteMethod
        axios.delete('/api/template/delete', {
            data: { _id: _id },
            headers: { authorization: "Bearer " + token }
        })
            .then((res) => {
                setRender(prev => prev + 1)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const saveTemplate = () => {

        axios.post('/api/template/add',
            { name: newTemplateName, description: newTemplateDescription },
            { headers: { authorization: "Bearer " + token } })
            .then((res) => {
                setOpen(false)
                setNewTemplateName("")
                setNewTemplateDescription("")
                setRender(prev => prev + 1)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    function addVarToTemplate(e) {
        setNewTemplateDescription(prev => (prev || "") + e.variable + " ")

    }

    return (
        <div>
            {(templateList.length === 0) ?
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <AddCircleOutlineIcon style={{ margin: 10 }} />
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
                style={{ width: "100%" }}
                onClick={() => { setOpen(true) }}
            >Aggiungi nuovo template</Button>

            <Dialog
                open={open}
                onClose={() => { setOpen(false) }}
            >
                <DialogTitle id="alert-dialog-title">{"Aggiungi nuovo template"}</DialogTitle>
                <DialogContent>

                    <TextField label="Titolo"
                        value={newTemplateName}
                        onChange={(e) => setNewTemplateName(e.target.value)}
                        style={{ width: "100%" }} />

                    <TextField
                        id="standard-multiline-static"
                        label="Testo"
                        multiline
                        rowsMax="5"
                        rows="3"
                        value={newTemplateDescription}
                        onChange={(e) => setNewTemplateDescription(e.target.value)}
                        style={{ width: "100%", marginTop: 10 }}
                    />

                    <EnvVariables
                        onClick={(e) => addVarToTemplate(e)}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setOpen(false) }} color="primary">
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