import React from "react";
import SearchableClientList from "../client/SeachableClientsList"
import Calendar from "../user/Calendar"
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router-dom';
import BackgroundPicker from "../../core/BackgroundPicker"

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
function UserPage(props) {
    const classes = useStyles()
    let history = useHistory();

    return (
        <div className={classes.col}>

            <div className={classes.box} style={{ backgroundColor: "#fff" }}>
                <SearchableClientList
                    onSelectedClient={(id) => { history.push("/client/" + id) }}

                />
            </div>

            <div className={classes.box} style={{ backgroundColor: "#fff" }}>
                <Calendar minimal={true} />
            </div>

            <div style={{
                position: "fixed",
                right: 20,
                bottom: 20
            }}>
                <BackgroundPicker />

            </div>

        </div>
    )
}

export default UserPage