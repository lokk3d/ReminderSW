import React, { useState, useEffect } from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PanoramaIcon from '@material-ui/icons/Panorama';
import IconButton from '@material-ui/core/IconButton';
import axios from "axios"
import Cookies from 'universal-cookie';
import { CompactPicker } from 'react-color'


const useStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));


function BackgroundPicker(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [bgList, setBgList] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    useEffect(() => {
        axios.get("/api/background/default",
            { headers: { authorization: "Bearer " + token } })
            .then((response) => {
                setBgList(response.data)
            })
            .catch((err) => {

            })

    }, [])

    const saveBg = (url) => {
        axios.post('/api/background/update',
        {type:"image", url:url.replace('.min',"")},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            window.location = window.location.href
          })
          .catch((err) => {
            console.log(err)
          })
    }

    const saveColorBg = (color) => {
        axios.post('/api/background/update',
        {type:"color", hexColor:color},
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
            window.location = window.location.href
          })
          .catch((err) => {
            console.log(err)
          })
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <PanoramaIcon />
            </IconButton>



            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Seleziona lo sfondo"}</DialogTitle>

                <DialogContent style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

                    <div style={{ display: "flex", flexWrap: "wrap", marginBottom: 30 }}>
                        {
                            bgList.map(item => {
                                return (
                                    <img
                                        src={item}
                                        key={item}
                                        style={{
                                            width: 50, height: 50,
                                            margin: 20, boxShadow: "1px 1px 3px #555",
                                            borderRadius: "5px", cursor: "pointer"
                                        }}
                                        onClick={() => { saveBg(item) }}
                                    />
                                )
                            })
                        }

                    </div>

                    <div style={{ display: "flex", flexDirection: "column" }}>
                        Tinta unita:
                        <CompactPicker
                            onChange={(e) => { saveColorBg(e.hex) }}
                        />
                    </div>

                    <div style={{ margin: 20 }}>
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span">
                                Carica sfondo
                            </Button>
                        </label>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default BackgroundPicker