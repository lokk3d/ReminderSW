import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Paper';

import HelpIcon from '@material-ui/icons/Help';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

require("dotenv").config();


const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },

    text: {
        color: "#fff",
        marginLeft: 20
    },

    box: {
        height: 40,
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    },

    icon: {
        marginRight: 20
    },

}));


function WrapperBox(props) {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleClick = () => {
        setOpen(prev => !prev);
    };

    const handleClickAway = () => {
        setOpen(false);
    };


    return (
        <div className={classes.col} style={{ margin: 20 }}>
            <Paper style={{ width: "100%" }}>
                <div className={classes.box}>
                    <h3 className={classes.text}>{props.header}</h3>
                    {
                        (props.info) ?

                            <ClickAwayListener onClickAway={handleClickAway}>
                                <div className={classes.wrapper}>
                                    <HelpIcon className={classes.icon} htmlColor="#e1e3e1" fontSize="small" onClick={handleClick} />

                                </div>
                            </ClickAwayListener>
                            : null
                    }


                </div>

                {props.children}

            </Paper>


            <Dialog
                open={open}
                onClose={handleClickAway}
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {props.info}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button onClick={handleClickAway} color="primary" autoFocus>
                        Tutto chiaro!
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default WrapperBox;
