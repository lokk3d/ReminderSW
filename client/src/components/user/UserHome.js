import React from "react";
import SearchableClientList from "../client/SeachableClientsList"
import Grid from '@material-ui/core/Grid';
import ReminderList from './ReminderList';
import Calendar from "./Calendar"
import WrapperBox from "../WrapperBox"
import UserCard from "../drawer/UserCard"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import axios from "axios"
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { TextField } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const useStyles = makeStyles(theme => ({
    col: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    box: {
        width: "90%",
        maxWidth: 500,
        marginTop: 30,
        padding: 10,
        boxShadow: "2px 2px 5px #000",
        borderRadius: "5px"
    }

}));
function UserHome(props) {
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const [focus, setFocus] = React.useState(false);

    const handleClickOpen = () => {
        setFocus(true)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.col}>


            <div className={classes.box} style={{ backgroundColor: "#fff" }}>
                <SearchableClientList />
            </div>

            <div className={classes.box} style={{ backgroundColor: "#fff" }}>
                <Calendar minimal={true} />
            </div>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <div >
                        <SearchableClientList focus={focus} />
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default UserHome